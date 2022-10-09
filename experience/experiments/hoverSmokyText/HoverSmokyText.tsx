import { useEffect, useRef } from 'react'

import {
  PerspectiveCamera,
  Plane,
  shaderMaterial,
  useTexture,
} from '@react-three/drei'
import {
  extend,
  Object3DNode,
  ThreeEvent,
  useFrame,
  useThree,
} from '@react-three/fiber'
import {
  LinearFilter,
  Mesh,
  PerspectiveCamera as ThreePerspectiveCamera,
  RepeatWrapping,
  ShaderMaterial,
  Texture,
  Vector2,
  Vector3,
} from 'three'

import fragmentShader from './smokyTextFragment.glsl'
import vertexShader from './smokyTextVertex.glsl'

// material
const SmokyTextShaderMaterial = shaderMaterial(
  {
    uTexture: null,
    uNoiseTexture: null,
    uTime: 0,
    uMouse: new Vector2(),
    uDensity: 0.7,
    uSamples: 4,
    uWeight: 0.38,
    uDecay: 0.8,
    uSpotlightDiameter: 0.4,
    uSpotlightColourRadius: 0.4,
    uExposure: 0.5,
    uSpotlightColor: new Vector3(0.639, 0.051, 1.0),
    uTextColor: new Vector3(0.114, 0.682, 1.0),
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

type Props = {
  textImageURL: string
  density: number
  samples: number
  weight: number
  decay: number
  spotlightDiameter: number
  spotlightColourRadius: number
  exposure: number
  spotlightColor: Vector3
  textColor: Vector3
}

const HoverSmokyText = (props: Props) => {
  // refs
  const shaderRef = useRef<ShaderMaterial>(null!)
  const cameraRef = useRef<ThreePerspectiveCamera>(null!)
  const objectRef = useRef<Mesh>(null!)

  const [textImage, noiseImage] = useTexture(
    [props.textImageURL, './noise.png'],
    (texs) => {
      const noiseImage = (texs as Texture[])[1]
      noiseImage.wrapS = RepeatWrapping
      noiseImage.wrapT = RepeatWrapping
      noiseImage.minFilter = LinearFilter
    }
  )

  const { viewport } = useThree()

  // tick
  useFrame(({ clock }) => {
    shaderRef.current.uniforms.uTime.value = clock.elapsedTime
  })

  useEffect(() => {
    shaderRef.current.uniforms.uTexture.value = textImage
    shaderRef.current.uniforms.uNoiseTexture.value = noiseImage
  }, [textImage, noiseImage])

  useEffect(() => {
    shaderRef.current.uniforms.uDensity.value = props.density
    shaderRef.current.uniforms.uSamples.value = props.samples
    shaderRef.current.uniforms.uWeight.value = props.weight
    shaderRef.current.uniforms.uDecay.value = props.decay
    shaderRef.current.uniforms.uSpotlightDiameter.value =
      props.spotlightDiameter
    shaderRef.current.uniforms.uSpotlightColourRadius.value =
      props.spotlightColourRadius
    shaderRef.current.uniforms.uExposure.value = props.exposure
    shaderRef.current.uniforms.uSpotlightColor.value = props.spotlightColor
    shaderRef.current.uniforms.uTextColor.value = props.textColor
  }, [])

  function handleMouseMove(ev: ThreeEvent<PointerEvent>) {
    shaderRef.current.uniforms.uMouse.value = ev.uv
  }

  return (
    <group>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        args={[70, 1, 0.1, 10000]}
        position={[0, 0, 0.71]}
      />
      <Plane
        args={[viewport.aspect, 1]}
        onPointerMove={handleMouseMove}
        ref={objectRef}
      >
        <smokyTextShaderMaterial ref={shaderRef} />
      </Plane>
    </group>
  )
}

HoverSmokyText.defaultProps = {
  textImageURL: './blackmatter.png',
  density: 0.7,
  samples: 4,
  weight: 0.38,
  decay: 0.8,
  spotlightDiameter: 0.4,
  spotlightColourRadius: 0.4,
  exposure: 0.5,
  spotlightColor: new Vector3(0.639, 0.051, 1.0),
  textColor: new Vector3(0.114, 0.682, 1.0),
}

export default HoverSmokyText
