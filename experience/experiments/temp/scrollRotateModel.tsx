import { useEffect, useRef } from 'react'

import {
  shaderMaterial,
  useGLTF,
  useTexture,
  useVideoTexture,
} from '@react-three/drei'
import { extend, Object3DNode } from '@react-three/fiber'
import { Mesh, ShaderMaterial } from 'three'

const vertexShader = `
varying vec2 vUv;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  
  vUv = uv;  
}
`

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uAlpha;

varying vec2 vUv;

void main() {
  float alpha = 0.0;
  vec3 colour = vec3(1.0);

  colour = texture2D(uTexture, vec2(vUv.x, 0.5 + vUv.y / 2.0)).rgb;
  alpha = texture2D(uTexture, vec2(vUv.x, vUv.y / 2.0)).r;
  alpha *= uAlpha;

  gl_FragColor = vec4(colour, alpha);
}
`

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

const ScrollRotateModel = () => {
  const videoTextureTop = useVideoTexture('./flip-0.webm', {})
  const videoTextureBottom = useVideoTexture('./flip-1.webm', {})

  const holeRef = useRef<Mesh>(null!)
  const meshRefTop = useRef<Mesh>(null!)
  const meshRefBottom = useRef<Mesh>(null!)

  const shaderRefTop = useRef<ShaderMaterial>(null!)
  const shaderRefBottom = useRef<ShaderMaterial>(null!)

  const holeModel = useGLTF('./holeModel.glb')
  const bakedHoleTexture = useTexture('./baked.jpg')

  // hooks
  useEffect(() => {
    holeRef.current.geometry.center()

    meshRefTop.current.position.set(0, -0.76, 0.24)
    meshRefTop.current.rotation.z = Math.PI

    meshRefBottom.current.position.set(0, 0.76, 0.24)

    shaderRefTop.current.uniforms.uAlpha.value = 1
    shaderRefBottom.current.uniforms.uAlpha.value = 0
  }, [])

  useEffect(() => {
    shaderRefTop.current.uniforms.uTexture.value = videoTextureTop
  }, [videoTextureTop])

  useEffect(() => {
    shaderRefBottom.current.uniforms.uTexture.value = videoTextureBottom
  }, [videoTextureBottom])

  return (
    <group
      position={[0, -8.4, -8.65]}
      rotation={[-0.235, 0, -Math.PI]}
      scale={[8, 8, 8]}
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
        <meshBasicMaterial map={bakedHoleTexture} map-flipY={false} />
      </mesh>
    </group>
  )
}

export default ScrollRotateModel

useGLTF.preload('./holeModel.glb')
