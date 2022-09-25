import { css } from '@emotion/react'

import { Suspense } from 'react'

import { Canvas } from '@react-three/fiber'

import CameraControls from './CameraControls'

import HoverDistortion from './experiments/hoverDistortion/HoverDistortion'
import Effect from './experiments/hoverDistortion/Effect'

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

        <Suspense fallback={null}>
          <HoverDistortion />
        </Suspense>

        <Effect />
      </Canvas>
    </div>
  )
}

export default ExperienceCanvas
