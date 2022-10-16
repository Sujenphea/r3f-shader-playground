import { useEffect, useRef } from 'react'
import { MeshStandardMaterial, SphereGeometry } from 'three'
import data from './data'

const ScrollSpheres = () => {
  const geometry = useRef(new SphereGeometry(1, 50, 50))
  const material = useRef(
    new MeshStandardMaterial({ metalness: 0, roughness: 1 })
  )

  return (
    <group>
      {data[0].spheresData.map((data, i) => {
        return (
          <mesh
            key={'sphere' + i}
            position={data.positions[0]}
            geometry={geometry.current}
            material={material.current}
          />
        )
      })}
      <mesh position={[0, 0, 0]} geometry={geometry.current}>
        {/* <sphereGeometry args={[1, 50, 50]} /> */}
        <meshStandardMaterial metalness={0} roughness={1} />
      </mesh>
    </group>
  )
}

export default ScrollSpheres
