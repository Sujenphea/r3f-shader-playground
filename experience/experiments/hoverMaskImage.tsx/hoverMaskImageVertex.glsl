#define PI 3.1415926535897932384626433832795

precision highp float;
precision highp int;
#define GLSLIFY 1


uniform float uStrength;
uniform vec2 uViewportSizes;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  vUv = uv;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  vec4 newPosition = modelPosition;
  newPosition.z += sin(newPosition.y / uViewportSizes.y * PI + PI / 2.0) * abs(uStrength);
  
  vec4 viewPosition = viewMatrix * newPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
