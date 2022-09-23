const Poster = () => {
  return (
    <mesh>
      <planeGeometry args={[1, 1, 32, 32]} />
      <projectShaderMaterial />
    </mesh>
  )
}

export default Poster
