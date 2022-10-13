/**
 * initial: shows a mask image filled with shapes
 * on hover: mask transitions to have more 'shapes'
 * on hover: mask shapes transition from color to an image/video
 */

import { useEffect, useRef } from 'react'

import { shaderMaterial, useTexture } from '@react-three/drei'
import { extend, Object3DNode, useThree } from '@react-three/fiber'
import { ShaderMaterial, Texture } from 'three'

import gsap from 'gsap'

import fragmentShader from './hoverMaskImageFragment.glsl'
import vertexShader from './hoverMaskImageVertex.glsl'

// material
const MaskImageShaderMaterial = shaderMaterial(
  {
    uBackgroundColor: [
      0.9333333333333333, 0.9137254901960784, 0.8745098039215686,
    ],
    uBackgroundShapeColor: [
      0.984313725490196, 0.9686274509803922, 0.9294117647058824,
    ],
    tMask: null,
    tVideo: null,

    uTransitionHover: 0,
  },
  vertexShader,
  fragmentShader
)

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

  const [maskImage, image] = useTexture(
    ['./mask.png', './testimage.png'],
    (images) => {
      const imageTextures = images as Texture[]
      shaderRef.current.uniforms.tMask.value = imageTextures[0]
      shaderRef.current.uniforms.tVideo.value = imageTextures[1]
    }
  )

  return (
    <group>
      <mesh
        onPointerOver={() => {
          gsap.timeline({}).to(
            shaderRef.current.uniforms.uTransitionHover,
            {
              value: 1,
            },
            'start'
          )
        }}
        onPointerOut={() => {
          gsap.timeline({}).to(
            shaderRef.current.uniforms.uTransitionHover,
            {
              value: 0,
            },
            'start'
          )
        }}
      >
        <planeGeometry args={[2, 2]} />
        <maskImageShaderMaterial ref={shaderRef} />
      </mesh>
    </group>
  )
}

export default HoverMaskImage
