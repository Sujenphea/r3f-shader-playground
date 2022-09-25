uniform sampler2D uTexture;
uniform vec2 uMouse;

varying vec2 vUv;

void main() {
  float dist = distance(vUv, uMouse) * 10.0;
  
  vec4 texture = texture2D(uTexture, vUv);
  vec3 color = texture.xyz;
  
  float opacity = clamp(dist, 0.5, 1.0);

  gl_FragColor = vec4(color, opacity);
}