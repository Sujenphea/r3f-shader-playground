import { useEffect, useRef } from 'react'

import { Color, ShaderMaterial, TextureLoader, Vector2 } from 'three'
import {
  extend,
  Object3DNode,
  useFrame,
  useLoader,
  useThree,
} from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

import fragmentShader from '../shaders/posterFragment.glsl'
import vertexShader from '../shaders/posterVertex.glsl'

// material
const ProjectShaderMaterial = shaderMaterial(
  {
    uTime: 0,

    uBigWavesElevation: 0.2,
    uBigWavesFrequency: new Vector2(4, 1.5),
    uBigWavesSpeed: 0.75,

    uSmallWavesElevation: 0,
    uSmallWavesFrequency: 3,
    uSmallWavesSpeed: 0.2,
    uSmallIterations: 4,

    uDepthColor: new Color('#186691'),
    uSurfaceColor: new Color('#9bd8ff'),
    uColorOffset: 0.08,
    uColorMultiplier: 5,
  },
  vertexShader,
  fragmentShader
)

extend({ ProjectShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      projectShaderMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial>
    }
  }
}

const Poster = () => {
  // refs
  const shaderRef = useRef<ShaderMaterial>(null!)

  // hooks
  const { viewport } = useThree()
  const image = useLoader(TextureLoader, './testImage.png')

  // tick
  useFrame(({ clock }) => {
    shaderRef.current.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[2, 2, 512, 512]} />
      <projectShaderMaterial ref={shaderRef} transparent />
    </mesh>
  )
}

export default Poster
