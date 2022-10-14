import { useEffect, useRef } from 'react'

import { shaderMaterial, useVideoTexture } from '@react-three/drei'
import { extend, Object3DNode } from '@react-three/fiber'
import { ShaderMaterial } from 'three'

const vertexShader = `
varying vec2 vUv;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  
  vUv = uv;  
}
`

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uAlpha;

varying vec2 vUv;

void main() {
  vec3 color = vec3(1.0, 0.5, 1.0);
  float alpha = 1.0;

  vec3 texture = texture2D(uTexture, vec2(vUv.x,  0.5 + vUv.y / 2.0)).rgb;
  color = texture;

  gl_FragColor = vec4(color, alpha);
}
`

// material
const ScrollRotateShaderMaterial = shaderMaterial(
  {
    uTexture: null,
    uAlpha: 1,
  },
  vertexShader,
  fragmentShader
)

extend({ ScrollRotateShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      scrollRotateShaderMaterial: Object3DNode<
        ShaderMaterial,
        typeof ShaderMaterial
      >
    }
  }
}

const ScrollRotateModel = () => {
  const videoTextureTop = useVideoTexture('./flip-0.webm', {})
  const videoTextureBottom = useVideoTexture('./flip-1.webm', {})

  const shaderRefTop = useRef<ShaderMaterial>(null!)
  const shaderRefBottom = useRef<ShaderMaterial>(null!)

  useEffect(() => {
    shaderRefTop.current.uniforms.uTexture.value = videoTextureTop
  }, [videoTextureTop])

  useEffect(() => {
    shaderRefBottom.current.uniforms.uTexture.value = videoTextureBottom
  }, [videoTextureBottom])

  return (
    <group>
      <mesh position={[0, 2, 0]}>
        <planeGeometry args={[3, 3, 1, 20]} />
        <scrollRotateShaderMaterial ref={shaderRefTop} />
      </mesh>

      <mesh position={[0, -2, 0]}>
        <planeGeometry args={[3, 3, 1, 20]} />
        <scrollRotateShaderMaterial ref={shaderRefBottom} />
      </mesh>
    </group>
  )
}

export default ScrollRotateModel
