import { Shader } from 'three'

import rippleFragmentShader from './rippleFragmentShader.glsl'
import rippleVertexShader from './rippleVertexShader.glsl'

const RippleShader: Shader = {
  uniforms: {
    tDiffuse: { value: null },
    uDisplacement: { value: null },
  },
  vertexShader: rippleVertexShader,
  fragmentShader: rippleFragmentShader,
}

export default RippleShader
