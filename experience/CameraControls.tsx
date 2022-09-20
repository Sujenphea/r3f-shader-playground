import { useEffect, useRef } from 'react'

import { extend, ReactThreeFiber, useThree } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

extend({ OrbitControls })

// https://github.com/pmndrs/react-three-fiber/issues/130
declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >
    }
  }
}

const CameraControls = () => {
  // refs
  const controls = useRef<OrbitControls | null>(null)

  // hooks
  const { camera, gl } = useThree()

  useEffect(() => {
    camera.zoom = 3
    camera.position.setY(2)
    camera.rotation.set(-0.3, 0, 0)
  })

  return (
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enabled={true}
      enablePan={true}
      enableZoom={true}
      enableDamping
      enableRotate={true}
      dampingFactor={0.1}
      rotateSpeed={0.5}
      zoomSpeed={0.3}
      maxPolarAngle={Math.PI * 0.75}
      minPolarAngle={Math.PI * 0.25}
    />
  )
}

export default CameraControls
