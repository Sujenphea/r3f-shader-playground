/**
 * initial: masked video / image shown with plane at bottom
 * click button: rotates to show another video / image with distorting plane effect
 * ref: https://uplinq.non-linear.studio
 */

import { useEffect, useRef } from 'react'

import {
  Html,
  PerspectiveCamera,
  shaderMaterial,
  useGLTF,
  useTexture,
  useVideoTexture,
} from '@react-three/drei'
import { extend, Object3DNode, useThree } from '@react-three/fiber'
import { Group, Mesh, ShaderMaterial } from 'three'

import gsap from 'gsap'

import fragmentShader from './clickFlipObjectFragment.glsl'
import vertexShader from './clickFlipObjectVertex.glsl'

// material
const ScrollRotateShaderMaterial = shaderMaterial(
  {
    uTexture: null,
    uAlpha: 1,
  },
  vertexShader,
  fragmentShader
)

extend({ ScrollRotateShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      scrollRotateShaderMaterial: Object3DNode<
        ShaderMaterial,
        typeof ShaderMaterial
      >
    }
  }
}

/**
 * video: top half for actual video, top bottom for mask
 */
type Props = {
  videoTopURL: string
  videoBottomURL: string
}

const ClickFlipObject = (props: Props) => {
  // refs
  const floorRef = useRef<Mesh>(null!)
  const holeRef = useRef<Mesh>(null!)
  const holeGroupRef = useRef<Group>(null!)

  const meshRefTop = useRef<Mesh>(null!)
  const meshRefBottom = useRef<Mesh>(null!)

  const shaderRefTop = useRef<ShaderMaterial>(null!)
  const shaderRefBottom = useRef<ShaderMaterial>(null!)

  // videos
  const videoTextureTop = useVideoTexture(props.videoTopURL, {})
  const videoTextureBottom = useVideoTexture(props.videoBottomURL, {})

  // models
  const floorModel = useGLTF('./floorModel.glb')
  const holeModel = useGLTF('./holeModel.glb')
  const bakedTexture = useTexture('./bakedClickFlip.jpg')

  // hooks
  const { viewport } = useThree()

  useEffect(() => {
    holeRef.current.geometry.center()
    floorRef.current.geometry.center()

    meshRefTop.current.position.set(0, -0.76, 0.24)
    meshRefTop.current.rotation.z = Math.PI

    meshRefBottom.current.position.set(0, 0.76, 0.24)

    shaderRefTop.current.uniforms.uAlpha.value = 1
    shaderRefBottom.current.uniforms.uAlpha.value = 1
  }, [])

  useEffect(() => {
    shaderRefTop.current.uniforms.uTexture.value = videoTextureTop
  }, [videoTextureTop])

  useEffect(() => {
    shaderRefBottom.current.uniforms.uTexture.value = videoTextureBottom
  }, [videoTextureBottom])

  return (
    <group>
      <Html occlude={false} fullscreen style={{ color: 'white' }}>
        <button
          onClick={() => {
            gsap.to(holeGroupRef.current.rotation, {
              duration: 1.1,
              z: holeGroupRef.current.rotation.z - Math.PI,
              ease: 'power3.inOut',
            })
          }}
          style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
          }}
        >
          rotate
        </button>
      </Html>

      {/* camera */}
      <PerspectiveCamera
        makeDefault
        args={[70, viewport.width / viewport.height, 0.1, 100]}
        position={[0, 1, 4]}
      />

      {/* hole + video */}
      <group
        position={[0, -8.4, -8.65]}
        rotation={[-0.235, 0, -Math.PI]}
        scale={[8, 8, 8]}
        ref={holeGroupRef}
      >
        <mesh ref={meshRefTop}>
          <planeGeometry args={[2.949, 1.529]} />
          <scrollRotateShaderMaterial ref={shaderRefTop} transparent />
        </mesh>

        <mesh ref={meshRefBottom}>
          <planeGeometry args={[2.949, 1.529]} />
          <scrollRotateShaderMaterial ref={shaderRefBottom} transparent />
        </mesh>

        <mesh
          geometry={(holeModel.scene.children[0] as Mesh).geometry}
          ref={holeRef}
        >
          <meshBasicMaterial map={bakedTexture} map-flipY={false} />
        </mesh>
      </group>

      {/* floor */}
      <group position={[0, -7, 0.6]} rotation={[-0.24, 0, 0]} scale={[8, 8, 8]}>
        <mesh
          geometry={(floorModel.scene.children[0] as Mesh).geometry}
          ref={floorRef}
        >
          <meshBasicMaterial map={bakedTexture} map-flipY={false} />
        </mesh>
      </group>
    </group>
  )
}

export default ClickFlipObject

ClickFlipObject.defaultProps = {
  videoTopURL: './flip-0.webm',
  videoBottomURL: './flip-1.webm',
}

useGLTF.preload(['./holeModel.glb', './floorModel.glb'])
