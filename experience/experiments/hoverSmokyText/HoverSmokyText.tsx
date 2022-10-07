import { useEffect, useRef } from 'react'

import { shaderMaterial } from '@react-three/drei'
import { extend, Object3DNode, useFrame } from '@react-three/fiber'
import { ShaderMaterial } from 'three'

import fragmentShader from './smokyTextFragment.glsl'
import vertexShader from './smokyTextVertex.glsl'

// material
const SmokyTextShaderMaterial = shaderMaterial({}, vertexShader, fragmentShader)

extend({ SmokyTextShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      smokyTextShaderMaterial: Object3DNode<
        ShaderMaterial,
        typeof ShaderMaterial
      >
    }
  }
}

type Props = {}

const HoverSmokyText = (props: Props) => {
  // refs
  const shaderRef = useRef<ShaderMaterial>(null!)

  return (
    <group>
      <mesh>
        <planeGeometry args={[5, 5]} />
        <smokyTextShaderMaterial ref={shaderRef} />
      </mesh>
    </group>
  )
}

HoverSmokyText.defaultProps = {}

export default HoverSmokyText
