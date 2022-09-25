import { forwardRef, useMemo } from 'react'

import { EffectComposer } from '@react-three/postprocessing'
import { useControls } from 'leva'

import { BadTVEffect } from './postprocessing/BadTvBlur'

export const Effect = () => {
  const { distortion, distortion2, speed, rollSpeed } = useControls('BadTV', {
    distortion: { value: 10.0, min: 0, max: 50.0 },
    distortion2: { value: 30.0, min: 0, max: 50.0 },
    speed: { value: 0.05, min: 0, max: 5.0 },
    rollSpeed: { value: 0, min: 0, max: 5.0 },
  })

  const BadTV = forwardRef<BadTVEffect>(({}, ref) => {
    const effect = useMemo(
      () => new BadTVEffect({ distortion, distortion2, speed, rollSpeed }),
      [distortion, distortion2, speed, rollSpeed]
    )
    return <primitive ref={ref} object={effect} dispose={null} />
  })

  return (
    <EffectComposer>
      <BadTV
        distortion={distortion}
        distortion2={distortion2}
        speed={speed}
        rollSpeed={rollSpeed}
      />
    </EffectComposer>
  )
}
