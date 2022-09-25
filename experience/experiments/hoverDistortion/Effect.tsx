import { Effects as EffectsComposer } from '@react-three/drei'
import { extend, Object3DNode, useThree } from '@react-three/fiber'
import { FilmPass, UnrealBloomPass } from 'three-stdlib'

extend({ UnrealBloomPass, FilmPass })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      filmPass: Object3DNode<FilmPass, typeof FilmPass>
    }
  }
}

const Effect = () => {
  const { size, scene, camera } = useThree()

  return (
    <EffectsComposer
      multisamping={8}
      renderIndex={1}
      disableGamma
      disableRenderPass
    >
      <renderPass scene={scene} camera={camera} />
      <filmPass args={[0.35, 0.025, 648, false]} />
    </EffectsComposer>
  )
}

export default Effect
