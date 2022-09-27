import { useEffect, useMemo, useRef } from 'react'

import { useFrame, useThree } from '@react-three/fiber'
import { Effects as EffectsComposer, useTexture } from '@react-three/drei'
import { ShaderPass } from 'three-stdlib'

import RippleShader from './RippleShader'
import { RippleRenderer } from './ripple'

type Props = {
  rippleBrushTextureURL: string
  maxRipples: number
  minRippleSpeed: number
}

/**
 *
 * @param rippleBrushTextureURL determines the type of ripple produced
 * @param maxRipples no. ripples allowed per frame. Default = 100
 * @param minSpeed speed of mouse required to activate ripple. Default = 5
 */
const Effect = (props: Props) => {
  // refs
  const rippleRef = useRef<ShaderPass>(null)
  const rippleTexture = useTexture(props.rippleBrushTextureURL)
  const effect = useMemo(
    () =>
      new RippleRenderer(rippleTexture, props.maxRipples, props.minRippleSpeed),
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

Effect.defaultProps = {
  rippleBrushTextureURL: './brush.png',
  maxRipples: 100,
  minRippleSpeed: 5,
}

export default Effect
