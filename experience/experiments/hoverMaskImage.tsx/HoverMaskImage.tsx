import { Plane, shaderMaterial, useTexture } from '@react-three/drei'
import { extend, Object3DNode, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { Vector2, ShaderMaterial, Vector3, Texture } from 'three'

import fragmentShader from './hoverMaskImageFragment.glsl'
import vertexShader from './hoverMaskImageVertex.glsl'

// material
const MaskImageShaderMaterial = shaderMaterial(
  {
    uColorProject: new Vector3(1.0, 0.3, 1.0),
    tMask: null,
    tVideo: null,

    uTransitionHover: 1,
    uTransitionState: 0.5,
    uMeshSizes: [0, 0],
    uViewportSizes: [0, 0],
    uGrid: [0, 0],
    uStrength: 0,
  },
  vertexShader,
  fragmentShader
)

extend({ MaskImageShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      maskImageShaderMaterial: Object3DNode<
        ShaderMaterial,
        typeof ShaderMaterial
      >
    }
  }
}

const HoverMaskImage = () => {
  // refs
  const shaderRef = useRef<ShaderMaterial>(null!)

  const [maskImage, image] = useTexture(
    ['./mask.png', './testimage.png'],
    (images) => {
      const imageTextures = images as Texture[]
      shaderRef.current.uniforms.tMask.value = imageTextures[0]
      shaderRef.current.uniforms.tVideo.value = imageTextures[1]
    }
  )

  const { viewport } = useThree()

  useEffect(() => {
    shaderRef.current.uniforms.uViewportSizes.value = [
      viewport.width,
      viewport.height,
    ]

    shaderRef.current.uniforms.uGrid.value = [0, 1]
  }, [])

  return (
    <group>
      <mesh>
        <planeGeometry args={[2, 2]} />
        <maskImageShaderMaterial ref={shaderRef} />
      </mesh>
    </group>
  )
}

export default HoverMaskImage
