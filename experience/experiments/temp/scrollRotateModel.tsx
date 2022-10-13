import { shaderMaterial, useGLTF, useTexture } from '@react-three/drei'
import { extend, Object3DNode, useLoader } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Mesh, ShaderMaterial } from 'three'

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
  const [image] = useTexture(['./testImage.png'])

  const meshRef = useRef<Mesh>(null!)
  const shaderRef = useRef<ShaderMaterial>(null!)

  useEffect(() => {
    shaderRef.current.uniforms.uTexture.value = image
  }, [image])

  return (
    <group>
      <mesh ref={meshRef}>
        <planeGeometry args={[5, 5, 1, 20]} />
        <scrollRotateShaderMaterial ref={shaderRef} />
      </mesh>
    </group>
  )
}

export default ScrollRotateModel
