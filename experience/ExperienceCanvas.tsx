import { css } from '@emotion/react'

import { Canvas } from '@react-three/fiber'
import { Color, Vector2 } from 'three'

import CameraControls from './CameraControls'

import PosterWave from './experiments/posterWave'

const ExperienceCanvas = () => {
  // styles
  const styles = {
    container: css`
      display: flex;
      justify-content: center;
      align-items: center;

      height: 100vh;
      width: 100vw;

      z-index: 0;
    `,
    button: css`
      position: absolute;
      top: 15px;
      left: 15px;

      z-index: 100;
    `,
  }

  return (
    <div css={styles.container}>
      <Canvas dpr={[1, 2]} linear>
        <CameraControls />

        <PosterWave
          uBigWavesElevation={0.02}
          uBigWavesFrequency={new Vector2(10, 0)}
          uBigWavesSpeed={3}
          uSmallWavesElevation={0.08}
          uSmallWavesFrequency={0.5}
          uSmallWavesSpeed={0}
          uSmallIterations={2}
          meshColor={new Color('rgb(237,237,237)')}
          backgroundColor={new Color('white')}
        />
      </Canvas>
    </div>
  )
}

export default ExperienceCanvas
