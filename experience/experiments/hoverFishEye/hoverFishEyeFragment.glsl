uniform sampler2D uTexture;
uniform vec2 uMouse;

varying vec2 vUv;

float linearConvert(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
  float dist = distance(vUv, uMouse);
  float power = 0.08;
  
  float prox = 1.0 - linearConvert(dist, 0.0, 0.5, 0.0,  1.0);
	prox = clamp(prox, 0.0, 1.0);

  vec2 zoomedUV = mix(vUv, uMouse, prox * power);

  vec4 texture = texture2D(uTexture, zoomedUV);
  vec3 color = texture.xyz;

  gl_FragColor = vec4(color, 1.0);
}