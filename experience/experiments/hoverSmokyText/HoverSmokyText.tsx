import { useEffect, useRef } from 'react'

import { Plane, shaderMaterial, useTexture } from '@react-three/drei'
import { extend, Object3DNode, ThreeEvent, useFrame } from '@react-three/fiber'
import {
  LinearFilter,
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
  const [textImage, noiseImage] = useTexture(
    ['./blackmatter.png', './noise.png'],
    (texs) => {
      const noiseImage = (texs as Texture[])[1]
      noiseImage.wrapS = RepeatWrapping
      noiseImage.wrapT = RepeatWrapping
      noiseImage.minFilter = LinearFilter
    }
  )

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
      <Plane args={[5, 5]} onPointerMove={handleMouseMove}>
        <smokyTextShaderMaterial ref={shaderRef} />
      </Plane>
    </group>
  )
}

HoverSmokyText.defaultProps = {}

export default HoverSmokyText
