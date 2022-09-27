import { useEffect, useMemo, useRef } from 'react'

import { useFrame, useThree } from '@react-three/fiber'
import { Effects as EffectsComposer, useTexture } from '@react-three/drei'
import { ShaderPass } from 'three-stdlib'

import RippleShader from './RippleShader'
import { RippleRenderer } from './ripple'

const Effect = () => {
  // refs
  const rippleRef = useRef<ShaderPass>(null)
  const rippleTexture = useTexture('./brush.png')
  const effect = useMemo(
    () => new RippleRenderer(rippleTexture),
    [rippleTexture]
  )

  // hooks
  const { scene, camera } = useThree()

  // tick
  useFrame(({ gl }) => {
    effect.updateTexture(gl, rippleRef.current!.uniforms.uDisplacement)
  })

  useEffect(() => {
    return () => effect.dispose()
  }, [effect])

  return (
    <EffectsComposer
      multisamping={8}
      renderIndex={1}
      disableGamma
      disableRenderPass
    >
      <renderPass scene={scene} camera={camera} />
      <shaderPass args={[RippleShader]} ref={rippleRef} />
    </EffectsComposer>
  )
}

export default Effect
