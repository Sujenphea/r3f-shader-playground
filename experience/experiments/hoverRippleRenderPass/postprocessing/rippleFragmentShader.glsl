uniform sampler2D tDiffuse;
uniform sampler2D uDisplacement;

varying vec2 vUv;

float PI = 3.141592653589;

void main() {
  vec2 uv = vUv;

  vec4 disp = texture2D(uDisplacement, uv);
  float theta = disp.r * 2.0 * PI;
  vec2 dir = vec2(sin(theta), cos(theta));
  uv += dir * disp.r * 0.1;

  vec4 color = texture2D(tDiffuse, uv);

  gl_FragColor = color;
}