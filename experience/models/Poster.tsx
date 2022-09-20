import { useRef } from 'react'

import { ShaderMaterial } from 'three'
import { extend, Object3DNode } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

import fragmentShader from '../shaders/posterFragment.glsl'
import vertexShader from '../shaders/posterVertex.glsl'

// material
const ProjectShaderMaterial = shaderMaterial({}, vertexShader, fragmentShader)

extend({ ProjectShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      projectShaderMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial>
    }
  }
}

const Poster = () => {
  const shaderRef = useRef<ShaderMaterial>(null!)

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <projectShaderMaterial ref={shaderRef} transparent />
    </mesh>
  )
}

export default Poster
