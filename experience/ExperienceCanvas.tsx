import { css } from '@emotion/react'

import { Suspense } from 'react'

import { Canvas } from '@react-three/fiber'

import CameraControls from './CameraControls'

import ClickFlipObject from './experiments/clickFlipObject/clickFlipObject'

const ExperienceCanvas = () => {
  // styles
  const styles = {
    container: css`
      position: fixed;
      top: 0;
      left: 0;

      display: flex;
      justify-content: center;
      align-items: center;

      height: 100vh;
      width: 100vw;

      background-color: pink;

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
        <CameraControls enabled={false} />

        <Suspense fallback={null}>
          <ClickFlipObject />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ExperienceCanvas
