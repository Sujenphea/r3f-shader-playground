import { useEffect, useRef } from 'react'

import {
  Color,
  PlaneGeometry,
  ShaderMaterial,
  Vector2,
  WireframeGeometry,
} from 'three'
import { extend, Object3DNode, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

import fragmentShader from './waveWireframeFragment.glsl'
import vertexShader from './waveWireframeVertex.glsl'

// material
const WaveShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new Color('red'),

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

extend({ WaveShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      waveShaderMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial>
    }
  }
}

type Props = {
  uBigWavesElevation: number
  uBigWavesFrequency: Vector2
  uBigWavesSpeed: number
  uSmallWavesElevation: number
  uSmallWavesFrequency: number
  uSmallWavesSpeed: number
  uSmallIterations: number
  meshColor: Color
  backgroundColor: Color
}

const WaveWireframe = (props: Props) => {
  // refs
  const shaderRef = useRef<ShaderMaterial>(null!)
  const shaderWireframeRef = useRef<ShaderMaterial>(null!)

  // tick
  useFrame(({ clock }) => {
    shaderRef.current.uniforms.uTime.value = clock.elapsedTime

    shaderRef.current.uniforms.uBigWavesElevation.value =
      props.uBigWavesElevation
    shaderRef.current.uniforms.uBigWavesFrequency.value =
      props.uBigWavesFrequency
    shaderRef.current.uniforms.uBigWavesSpeed.value = props.uBigWavesSpeed
    shaderRef.current.uniforms.uSmallWavesElevation.value =
      props.uSmallWavesElevation
    shaderRef.current.uniforms.uSmallWavesFrequency.value =
      props.uSmallWavesFrequency
    shaderRef.current.uniforms.uSmallWavesSpeed.value = props.uSmallWavesSpeed
    shaderRef.current.uniforms.uSmallIterations.value = props.uSmallIterations

    // wireframe
    shaderWireframeRef.current.uniforms.uTime.value = clock.elapsedTime

    shaderWireframeRef.current.uniforms.uBigWavesElevation.value =
      props.uBigWavesElevation
    shaderWireframeRef.current.uniforms.uBigWavesFrequency.value =
      props.uBigWavesFrequency
    shaderWireframeRef.current.uniforms.uBigWavesSpeed.value =
      props.uBigWavesSpeed
    shaderWireframeRef.current.uniforms.uSmallWavesElevation.value =
      props.uSmallWavesElevation
    shaderWireframeRef.current.uniforms.uSmallWavesFrequency.value =
      props.uSmallWavesFrequency
    shaderWireframeRef.current.uniforms.uSmallWavesSpeed.value =
      props.uSmallWavesSpeed
    shaderWireframeRef.current.uniforms.uSmallIterations.value =
      props.uSmallIterations
  })

  useEffect(() => {
    shaderRef.current.uniforms.uColor.value = props.backgroundColor
    shaderWireframeRef.current.uniforms.uColor.value = props.meshColor
  }, [])

  return (
    <group rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -0.2, 3.5]}>
      <mesh position={[0, 0, -0.025]}>
        <planeGeometry args={[10, 4, 32, 32]} />
        <waveShaderMaterial ref={shaderRef} />
      </mesh>
      <lineSegments
        geometry={new WireframeGeometry(new PlaneGeometry(10, 4, 256, 128))}
      >
        <waveShaderMaterial ref={shaderWireframeRef} />
      </lineSegments>
    </group>
  )
}

WaveWireframe.defaultProps = {
  uBigWavesElevation: 0.02,
  uBigWavesFrequency: new Vector2(10, 0),
  uBigWavesSpeed: 3,
  uSmallWavesElevation: 0.08,
  uSmallWavesFrequency: 0.5,
  uSmallWavesSpeed: 0,
  uSmallIterations: 2,
  meshColor: new Color('rgb(237,237,237)'),
  backgroundColor: new Color('white'),
}

export default WaveWireframe
