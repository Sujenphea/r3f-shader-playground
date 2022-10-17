import { useEffect, useRef } from 'react'

import { Group, Mesh, SphereGeometry, Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'

import data, { interpolateValues, interpolateVectors } from './data'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// spheresCount: 13
// sectionsCount: 6
const ScrollSpheres = () => {
  const geometry = useRef(new SphereGeometry(1, 50, 50))

  // refs
  const spheresRef = useRef<Mesh[]>(new Array(13).fill(null))
  const groupRef = useRef<Group>(null!)
  const positionsRef = useRef<Vector3[]>([])
  const scalesRef = useRef<number[]>([])

  // hooks
  useEffect(() => {
    // setup values
    const positionArray = Array(13).fill([])
    data[0].spheresData.forEach((data, i) => {
      positionArray[i] = data.positions[0]
    })
    positionsRef.current = positionArray

    const scaleArray = Array(13).fill([])
    data[0].spheresData.forEach((data, i) => {
      scaleArray[i] = data.scales[0]
    })
    scalesRef.current = scaleArray

    // manage scroll
    gsap.timeline({
      scrollTrigger: {
        trigger: '.scrollDiv',
        start: '20px top', // 'top top' causes glitch
        end: 'bottom bottom',

        onUpdate: (self) => {
          const sectionIndex = Math.min(Math.trunc(self.progress * 6), 5) // which section
          const progress = (self.progress - sectionIndex * (1 / 6)) * 6 //

          // update position
          data[sectionIndex].spheresData.forEach((sphereData, i) => {
            const newPosition = interpolateVectors(
              progress,
              sphereData.positions
            )

            positionsRef.current[i] = newPosition
          })

          // update scale
          data[sectionIndex].spheresData.forEach((sphereData, i) => {
            const newScale = interpolateValues(progress, sphereData.scales)

            scalesRef.current[i] = newScale
          })

          // update group
          const newGroupRotation = interpolateVectors(
            progress,
            data[sectionIndex].groupsData.rotations
          )
          const newGroupPosition = interpolateVectors(
            progress,
            data[sectionIndex].groupsData.positions
          )

          groupRef.current.rotation.x = newGroupRotation.x
          groupRef.current.rotation.y = newGroupRotation.y
          groupRef.current.rotation.z = newGroupRotation.z

          groupRef.current.position.x = newGroupPosition.x
          groupRef.current.position.y = newGroupPosition.y
          groupRef.current.position.z = newGroupPosition.z
        },
      },
    })
  }, [])

  // tick: update sphere position, scale + group
  useFrame(() => {
    positionsRef.current.forEach((position, i) => {
      spheresRef.current[i].position.copy(position)
    })

    scalesRef.current.forEach((scale, i) => {
      spheresRef.current[i].scale.set(scale, scale, scale)
    })
  })

  return (
    <group ref={groupRef}>
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
