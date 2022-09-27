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

type Props = {
  imageURL: string
  rippleBrushTextureURL: string
  maxRipples: number
  minRippleSpeed: number
}

/**
 *
 * @param imageURL image for wave ripple texture
 * @param rippleBrushTextureURL determines the type of ripple produced
 * @param maxRipples no. ripples allowed per frame. Default = 100
 * @param minSpeed speed of mouse required to activate ripple. Default = 5
 */
const HoverRipplePass = (props: Props) => {
  // refs
  const images = useTexture([props.imageURL])

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
      <Effect
        maxRipples={props.maxRipples}
        minRippleSpeed={props.minRippleSpeed}
        rippleBrushTextureURL={props.rippleBrushTextureURL}
      />
    </group>
  )
}

export default HoverRipplePass

HoverRipplePass.defaultProps = {
  imageURL: './testImage.png',
  rippleBrushTextureURL: './brush.png',
  maxRipples: 100,
  minRippleSpeed: 5,
}
