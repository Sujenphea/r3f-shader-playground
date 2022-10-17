import { css } from '@emotion/react'
import ExperienceCanvas from '../experience/ExperienceCanvas'

export default function Home() {
  // styles
  const styles = {
    scrollContainer: css`
      height: 10000px;
    `,
  }

  return (
    <div>
      {/* class name used in scrollCamera */}
      <div className="scrollDiv" css={styles.scrollContainer} />
      <ExperienceCanvas />
    </div>
  )
}
