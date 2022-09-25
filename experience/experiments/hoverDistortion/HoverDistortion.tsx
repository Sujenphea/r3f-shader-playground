import { ShaderMaterial, Texture, Vector2, Vector3 } from 'three'
import { extend, Object3DNode, ThreeEvent } from '@react-three/fiber'
import { Plane, shaderMaterial, useTexture } from '@react-three/drei'

import fragmentShader from './hoverDistortionFragment.glsl'
import vertexShader from './hoverDistortionVertex.glsl'
import { useEffect, useRef } from 'react'

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

const HoverDistortion = () => {
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

export default HoverDistortion
