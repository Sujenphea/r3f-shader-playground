import { ShaderMaterial, Texture } from 'three'
import { extend, Object3DNode } from '@react-three/fiber'
import { Plane, shaderMaterial, useTexture } from '@react-three/drei'

import fragmentShader from './hoverDistortionFragment.glsl'
import vertexShader from './hoverDistortionVertex.glsl'

// material
const ImageShaderMaterial = shaderMaterial(
  {
    uTexture: null,
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
  const images = useTexture(['./testImage.png'])

  const material = (texture: Texture) => {
    return new ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })
  }

  return (
    <group>
      <Plane
        args={[5, 3]}
        material={material(images[0])}
        position={[0, 0, 0]}
      />
    </group>
  )
}

export default HoverDistortion
