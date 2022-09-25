import { useFrame, useThree } from '@react-three/fiber'
import { Effects as EffectsComposer } from '@react-three/drei'
import { ShaderPass } from 'three-stdlib'
import { useControls } from 'leva'

import DistortionShader from './postprocessing/DistortionShader'
import { useRef } from 'react'

const Effect = () => {
  // refs
  const distortionRef = useRef<ShaderPass>(null)

  // hooks
  const { scene, camera } = useThree()

  const { distortionProgress, distortionScale } = useControls({
    distortionProgress: {
      value: 0.2,
      min: 0,
      max: 1,
      step: 0.01,
    },
    distortionScale: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.1,
    },
  })

  // tick
  useFrame(({ clock }) => {
    distortionRef.current!.uniforms.uTime.value = clock.elapsedTime
    distortionRef.current!.uniforms.uProgress.value = distortionProgress
    distortionRef.current!.uniforms.uScale.value = distortionScale
  })

  return (
    <EffectsComposer
      multisamping={8}
      renderIndex={1}
      disableGamma
      disableRenderPass
    >
      <renderPass scene={scene} camera={camera} />
      <shaderPass args={[DistortionShader]} ref={distortionRef} />
    </EffectsComposer>
  )
}

export default Effect
