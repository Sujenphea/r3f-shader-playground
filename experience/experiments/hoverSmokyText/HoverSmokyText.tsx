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

type Props = {}

const HoverSmokyText = () => {
  // refs
  const shaderRef = useRef<ShaderMaterial>(null!)
  const cameraRef = useRef<ThreePerspectiveCamera>(null!)
  const objectRef = useRef<Mesh>(null!)

  const [textImage, noiseImage] = useTexture(
    ['./blackmatter.png', './noise.png'],
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

HoverSmokyText.defaultProps = {}

export default HoverSmokyText
