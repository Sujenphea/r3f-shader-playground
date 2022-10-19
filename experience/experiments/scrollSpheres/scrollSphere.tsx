import { forwardRef, MutableRefObject } from 'react'
import { Mesh, SphereGeometry } from 'three'

type Props = {
  geometry: SphereGeometry
}

const ScrollSphere = forwardRef<Mesh, Props>((props, ref) => {
  return (
    <mesh geometry={props.geometry} ref={ref}>
      <meshBasicMaterial color="green" />
    </mesh>
  )
})

export default ScrollSphere
