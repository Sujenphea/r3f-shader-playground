import { useEffect, useRef } from 'react'

import { ShaderMaterial, TextureLoader } from 'three'
import {
  extend,
  Object3DNode,
  useFrame,
  useLoader,
  useThree,
} from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

import fragmentShader from '../shaders/posterFragment.glsl'
import vertexShader from '../shaders/posterVertex.glsl'

// material
const ProjectShaderMaterial = shaderMaterial(
  {
    uTexture: null,
    uMouse: [1.0, 1.0],
  },
  vertexShader,
  fragmentShader
)

extend({ ProjectShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      projectShaderMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial>
    }
  }
}

const Poster = () => {
  // refs
  const shaderRef = useRef<ShaderMaterial>(null!)

  // hooks
  const { viewport } = useThree()
  const image = useLoader(TextureLoader, './testImage.png')

  // tick
  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 4 + 0.5
    const y = (mouse.y * viewport.height) / 4 + 0.5

    shaderRef.current.uniforms.uMouse = { value: [x, y] }
  })

  // effects
  useEffect(() => {
    shaderRef.current.uniforms.uTexture = { value: image }
  }, [])

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <projectShaderMaterial ref={shaderRef} transparent />
    </mesh>
  )
}

export default Poster
