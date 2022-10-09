import { useEffect, useRef } from 'react'

import { shaderMaterial } from '@react-three/drei'
import { extend, Object3DNode, useThree } from '@react-three/fiber'
import { ShaderMaterial } from 'three'

import fragmentShader from './hoverMaskImageFragment.glsl'
import vertexShader from './hoverMaskImageVertex.glsl'

// material
const MaskImageShaderMaterial = shaderMaterial({}, vertexShader, fragmentShader)

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

  useEffect(() => {}, [])

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
