import { css } from '@emotion/react'

import { Canvas } from '@react-three/fiber'
import { Color, Vector2 } from 'three'

import CameraControls from './CameraControls'

import WaveWireframe from './experiments/waveWireframe/WaveWireframe'

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

        <WaveWireframe />
      </Canvas>
    </div>
  )
}

export default ExperienceCanvas
