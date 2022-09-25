import { Shader } from 'three'

const distortionVertexShader = `
varying vec2 vUv;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  vUv = uv;
}
`
const distortionFragmentShader = `
uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uProgress;
uniform float uScale;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  vec2 p = 2.0 * vUv - 1.0;
  p += 0.1 * cos(uScale * 3.7 * p.yx + 1.4 * uTime + vec2(2.2, 3.4));
  p += 0.1 * cos(uScale * 3.0 * p.yx + 1.0 * uTime + vec2(1.2, 3.4));
  p += 0.3 * cos(uScale * 5.0 * p.yx + 2.6 * uTime + vec2(4.2, 1.4));
  p += 0.3 * cos(uScale * 7.5 * p.yx + 3.6 * uTime + vec2(12.2, 3.4));

	uv.x = mix(vUv.x, length(p), uProgress);
  uv.y = mix(vUv.y, 0.5 * length(p) + 0.15, uProgress);
  
  vec4 color = texture2D(tDiffuse, uv);
  
  gl_FragColor = color;
}
`

const DistortionShader: Shader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uProgress: { value: 0.2 },
    uScale: { value: 1 },
  },
  vertexShader: distortionVertexShader,
  fragmentShader: distortionFragmentShader,
}

export default DistortionShader
