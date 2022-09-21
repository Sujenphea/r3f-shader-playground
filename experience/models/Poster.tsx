import { useEffect, useRef } from 'react'

import {
  Color,
  PlaneGeometry,
  ShaderMaterial,
  TextureLoader,
  Vector2,
} from 'three'
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
import { useControls } from 'leva'

// material
const ProjectShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,

    uBigWavesElevation: 0.1,
    uBigWavesFrequency: new Vector2(4, 1.5),
    uBigWavesSpeed: 0.75,

    uSmallWavesElevation: 0,
    uSmallWavesFrequency: 3,
    uSmallWavesSpeed: 0.2,
    uSmallIterations: 4,
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
  const image = useLoader(TextureLoader, './testImage2.jpg')

  // gui
  const {
    uBigWavesElevation,
    uBigWavesFrequency,
    uBigWavesSpeed,
    uSmallWavesElevation,
    uSmallWavesFrequency,
    uSmallWavesSpeed,
    uSmallIterations,
  } = useControls({
    uBigWavesElevation: {
      value: 0.02,
      min: 0,
      max: 1,
      step: 0.01,
    },
    uBigWavesFrequency: { value: [10, 0.0] },
    uBigWavesSpeed: {
      value: 3.0,
      min: 0,
      max: 10,
      step: 0.01,
    },
    uSmallWavesElevation: {
      value: 0.08,
      min: 0,
      max: 1,
      step: 0.01,
    },
    uSmallWavesFrequency: { value: 0.5, min: 0, max: 1, step: 0.01 },
    uSmallWavesSpeed: {
      value: 0,
      min: 0,
      max: 1.5,
      step: 0.01,
    },
    uSmallIterations: {
      value: 2,
      min: 0,
      max: 10,
      step: 1,
    },
  })

  // tick
  useFrame(({ clock }) => {
    shaderRef.current.uniforms.uTime.value = clock.elapsedTime
    shaderRef.current.uniforms.uTexture.value = image

    shaderRef.current.uniforms.uBigWavesElevation.value = uBigWavesElevation
    shaderRef.current.uniforms.uBigWavesFrequency.value = uBigWavesFrequency
    shaderRef.current.uniforms.uBigWavesSpeed.value = uBigWavesSpeed
    shaderRef.current.uniforms.uSmallWavesElevation.value = uSmallWavesElevation
    shaderRef.current.uniforms.uSmallWavesFrequency.value = uSmallWavesFrequency
    shaderRef.current.uniforms.uSmallWavesSpeed.value = uSmallWavesSpeed
    shaderRef.current.uniforms.uSmallIterations.value = uSmallIterations
  })

  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, 0, 0.5]}>
      <planeGeometry args={[4, 10, 32, 32]} />
      <projectShaderMaterial ref={shaderRef} />
    </mesh>
  )
}

export default Poster
