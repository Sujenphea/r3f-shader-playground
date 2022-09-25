import { ShaderMaterial, Texture } from 'three'
import { extend, Object3DNode } from '@react-three/fiber'
import { Plane, shaderMaterial, useTexture } from '@react-three/drei'

import fragmentShader from './hoverRipplePassFragment.glsl'
import vertexShader from './hoverRipplePassVertex.glsl'
import Effect from './postprocessing/Effect'

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

const HoverRipplePass = () => {
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
      <Effect />
    </group>
  )
}

export default HoverRipplePass
