import { useEffect, useRef } from 'react'

import { Mesh, MeshStandardMaterial, SphereGeometry, Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'

import data, { interpolateVectors } from './data'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// spheresCount: 13
const ScrollSpheres = () => {
  const geometry = useRef(new SphereGeometry(1, 50, 50))

  const spheresRef = useRef<Mesh[]>(
    new Array(data[0].spheresData.length).fill(null)
  )
  const positionsRef = useRef<Vector3[]>([])

  // hooks
  useEffect(() => {
    const positionArray = Array(13).fill([])
    data[0].spheresData.forEach((data, i) => {
      positionArray[i] = data.positions[0]
    })
    positionsRef.current = positionArray

    // manage scroll
    gsap.timeline({
      scrollTrigger: {
        trigger: '.scrollDiv',
        start: '20px top', // 'top top' causes glitch
        end: 'bottom bottom',

        onUpdate: (self) => {
          if (self.progress < 0.5) {
            // hero
            const heroProgress = self.progress * 2

            const newPositionArray = Array(13).fill([])
            data[0].spheresData.forEach((sphereData, i) => {
              const newPosition = interpolateVectors(
                heroProgress,
                sphereData.positions
              )

              newPositionArray[i] = newPosition
            })

            positionsRef.current = newPositionArray
          } else {
            // benefit-0
            const heroProgress = (self.progress - 0.5) * 2
            const newPositionArray = Array(13).fill([])
            data[2].spheresData.forEach((sphereData, i) => {
              const newPosition = interpolateVectors(
                heroProgress,
                sphereData.positions
              )

              newPositionArray[i] = newPosition
            })

            positionsRef.current = newPositionArray
          }
        },
      },
    })
  }, [])

  useFrame(() => {
    positionsRef.current.forEach((position, i) => {
      spheresRef.current[i].position.copy(position)
    })
  })

  return (
    <group>
      {[...Array(13)].map((_, i) => {
        return (
          <mesh
            ref={(ref) => (spheresRef.current[i] = ref!)}
            key={'sphere' + i}
            geometry={geometry.current}
          >
            <meshBasicMaterial color={(Math.random() * 0xffffff) << 0} />
          </mesh>
        )
      })}
    </group>
  )
}

export default ScrollSpheres
