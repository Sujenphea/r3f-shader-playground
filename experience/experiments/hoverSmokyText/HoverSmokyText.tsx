import { useEffect, useRef } from 'react'

import { Plane, shaderMaterial, useTexture } from '@react-three/drei'
import { extend, Object3DNode, ThreeEvent } from '@react-three/fiber'
import { ShaderMaterial, Vector2 } from 'three'

import fragmentShader from './smokyTextFragment.glsl'
import vertexShader from './smokyTextVertex.glsl'

// material
const SmokyTextShaderMaterial = shaderMaterial(
  {
    uTexture: null,
    uMouse: new Vector2(),
  },
  vertexShader,
  fragmentShader
)

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
  const images = useTexture(['./blackmatter.png'])

  useEffect(() => {
    shaderRef.current.uniforms.uTexture.value = images[0]
  }, [images])

  function handleMouseMove(ev: ThreeEvent<PointerEvent>) {
    shaderRef.current.uniforms.uMouse.value = ev.uv
  }

  return (
    <group>
      <Plane args={[5, 5]} onPointerMove={handleMouseMove}>
        <smokyTextShaderMaterial ref={shaderRef} />
      </Plane>
    </group>
  )
}

HoverSmokyText.defaultProps = {}

export default HoverSmokyText
