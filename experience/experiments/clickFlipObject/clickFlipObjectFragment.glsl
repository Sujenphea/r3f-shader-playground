uniform sampler2D uTexture;
uniform float uAlpha;

varying vec2 vUv;

void main() {
  float alpha = 0.0;
  vec3 colour = vec3(1.0);

  // get top half as image
  colour = texture2D(uTexture, vec2(vUv.x, 0.5 + vUv.y / 2.0)).rgb;

  // get bottom half as mask
  alpha = texture2D(uTexture, vec2(vUv.x, vUv.y / 2.0)).r;
  alpha *= uAlpha;

  gl_FragColor = vec4(colour, alpha);
}