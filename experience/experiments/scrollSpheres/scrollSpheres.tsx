import { useEffect, useRef } from 'react'

import {
  Group,
  Mesh,
  PerspectiveCamera as ThreePerspectiveCamera,
  SphereGeometry,
} from 'three'
import { PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

import data, { interpolateValues, interpolateVectors } from './data'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import ScrollSphere from './scrollSphere'

gsap.registerPlugin(ScrollTrigger)

// spheresCount: 13
// sectionsCount: 6
const ScrollSpheres = () => {
  const geometry = useRef(new SphereGeometry(1, 50, 50))

  // refs
  const spheresRef = useRef<(Mesh | null)[]>(new Array(13).fill(null))
  const groupRef = useRef<Group>(null!)
  const cameraRef = useRef<ThreePerspectiveCamera>(null!)

  const { viewport } = useThree()

  // hooks
  useEffect(() => {
    // // setup position
    // data[0].spheresData.forEach((data, i) => {
    //   spheresRef.current[i].position.copy(data.positions[0])
    // })
    // // setup scale
    // data[0].spheresData.forEach((data, i) => {
    //   spheresRef.current[i].scale.set(
    //     data.scales[0],
    //     data.scales[0],
    //     data.scales[0]
    //   )
    // })
    // manage scroll
    // gsap.timeline({
    //   scrollTrigger: {
    //     trigger: '.scrollDiv',
    //     start: '20px top', // 'top top' causes glitch
    //     end: 'bottom bottom',
    //     onUpdate: (self) => {
    //       const sectionIndex = Math.min(Math.trunc(self.progress * 6), 5) // which section
    //       const progress = (self.progress - sectionIndex * (1 / 6)) * 6 //
    //       // update position
    //       data[sectionIndex].spheresData.forEach((sphereData, i) => {
    //         const newPosition = interpolateVectors(
    //           progress,
    //           sphereData.positions
    //         )
    //         spheresRef.current[i].position.copy(newPosition)
    //       })
    //       // update scale
    //       data[sectionIndex].spheresData.forEach((sphereData, i) => {
    //         const newScale = interpolateValues(progress, sphereData.scales)
    //         spheresRef.current[i].scale.set(newScale, newScale, newScale)
    //       })
    //       // update group
    //       const newGroupRotation = interpolateVectors(
    //         progress,
    //         data[sectionIndex].groupsData.rotations
    //       )
    //       const newGroupPosition = interpolateVectors(
    //         progress,
    //         data[sectionIndex].groupsData.positions
    //       )
    //       groupRef.current.rotation.x = newGroupRotation.x
    //       groupRef.current.rotation.y = newGroupRotation.y
    //       groupRef.current.rotation.z = newGroupRotation.z
    //       groupRef.current.position.x = newGroupPosition.x
    //       groupRef.current.position.y = newGroupPosition.y
    //       groupRef.current.position.z = newGroupPosition.z
    //       // update camera
    //       const newCameraPosition = interpolateVectors(
    //         progress,
    //         data[sectionIndex].cameraData.positions
    //       )
    //       cameraRef.current.position.x = newCameraPosition.x
    //       cameraRef.current.position.y = newCameraPosition.y
    //       cameraRef.current.position.z = newCameraPosition.z
    //     },
    //   },
    // })
  }, [])

  useEffect(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.scrollDiv',
        start: '20px top', // 'top top' causes glitch
        end: 'bottom bottom',
        onUpdate: (self) => {
          spheresRef.current[0]!.position.x = 1
        },
      },
    })
  }, [])

  return (
    <group>
      {/* <PerspectiveCamera
        makeDefault
        args={[45, viewport.width / viewport.height, 0.1, 1e4]}
        position={[0, 0, data[0].cameraData.positions[0].z]}
        ref={cameraRef}
      /> */}

      {/* <group ref={groupRef}>
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
      </group> */}

      <ScrollSphere
        geometry={geometry.current}
        ref={(ref) => {
          spheresRef.current[0] = ref
        }}
      />
    </group>
  )
}

export default ScrollSpheres
