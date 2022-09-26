import { useEffect, useRef } from 'react'

import { ShaderMaterial, Vector2 } from 'three'
import { extend, Object3DNode, ThreeEvent } from '@react-three/fiber'
import { Plane, shaderMaterial, useTexture } from '@react-three/drei'

import fragmentShader from './hoverFishEyeFragment.glsl'
import vertexShader from './hoverFishEyeVertex.glsl'

// material
const ImageShaderMaterial = shaderMaterial(
  {
    uTexture: null,
    uMouse: new Vector2(),
  },
  vertexShader,
  fragmentShader
)

extend({ ImageShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      imageShaderMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial>
    }
  }
}

const HoverFishEye = () => {
  // refs
  const shaderRef = useRef<ShaderMaterial>(null!)
  const images = useTexture(['./testImage.png'])

  useEffect(() => {
    shaderRef.current.uniforms.uTexture.value = images[0]
  }, [images])

  function handleMouseMove(ev: ThreeEvent<PointerEvent>) {
    shaderRef.current.uniforms.uMouse.value = ev.uv
  }

  return (
    <group>
      <Plane args={[5, 5]} position={[0, 0, 0]} onPointerMove={handleMouseMove}>
        <imageShaderMaterial ref={shaderRef} />
      </Plane>
    </group>
  )
}

export default HoverFishEye
