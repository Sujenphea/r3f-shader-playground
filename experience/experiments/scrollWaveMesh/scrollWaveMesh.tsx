import { useEffect, useRef } from 'react'

import { shaderMaterial } from '@react-three/drei'
import { extend, Object3DNode, useFrame, useThree } from '@react-three/fiber'
import { Mesh, ShaderMaterial } from 'three'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import fragmentShader from './scrollWaveMeshFragment.glsl'
import vertexShader from './scrollWaveMeshVertex.glsl'

gsap.registerPlugin(ScrollTrigger)

// material
const ScrollWaveShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uStrength: 0,
    uViewportSizes: [0, 0],
  },
  vertexShader,
  fragmentShader
)

extend({ ScrollWaveShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      scrollWaveShaderMaterial: Object3DNode<
        ShaderMaterial,
        typeof ShaderMaterial
      >
    }
  }
}

const ScrollWaveMesh = () => {
  // refs
  const shaderRef = useRef<ShaderMaterial>(null!)
  const speed = useRef(0)
  const scroll = useRef(0)
  const meshRef = useRef<Mesh>(null!)

  const { viewport } = useThree()

  useFrame(({ clock }) => {
    shaderRef.current.uniforms.uTime.value = clock.elapsedTime
    shaderRef.current.uniforms.uViewportSizes.value = [
      viewport.width,
      viewport.height,
    ]
  })

  useEffect(() => {
    meshRef.current.position.y = 7.5

    gsap.timeline({
      scrollTrigger: {
        trigger: '.scrollDiv',
        start: '20px top', // 'top top' causes glitch
        end: 'bottom bottom',
        scrub: 10,

        onUpdate: (self) => {
          speed.current += 0.0002 * (self.getVelocity() - scroll.current)
          speed.current *= 0.9
          shaderRef.current.uniforms.uStrength.value = speed.current

          scroll.current = self.getVelocity()

          meshRef.current.position.y = (self.progress - 0.5) * -15
        },
      },
    })
  }, [])

  return (
    <group>
      <mesh ref={meshRef}>
        <planeGeometry args={[5, 5, 1, 20]} />
        <scrollWaveShaderMaterial ref={shaderRef} />
      </mesh>
    </group>
  )
}

export default ScrollWaveMesh
