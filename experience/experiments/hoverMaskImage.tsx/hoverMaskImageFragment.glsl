precision highp float;
precision highp int;
#define GLSLIFY 1

float linearConvert(float value, float oldMin, float oldMax, float newMin, float newMax) {
  return newMin + (value - oldMin) * (newMax - newMin) / (oldMax - oldMin);
}

vec2 scaleUV(vec2 uv, vec2 scale, vec2 origin) {
  vec3 newUv = vec3(uv, 1.0);

  // matrices
  mat3 moveToOriginMatrix = mat3(1, 0, -origin.x,
                                 0, 1, -origin.y,
                                 0, 0, 1);


  mat3 scaleMatrix = mat3(1.0 / scale.x, 0, 0,
                          0, 1.0 / scale.y, 0,
                          0, 0, 1);

  mat3 moveFromOriginMatrix = mat3(1, 0, origin.x,
                                   0, 1, origin.y,
                                   0, 0, 1);

  // apply matrices
  newUv = newUv * moveToOriginMatrix;
  newUv = newUv * scaleMatrix;
  newUv = newUv * moveFromOriginMatrix;

  return newUv.xy;
}

vec2 translateUV(vec2 uv, vec2 translate) {
  vec3 newUv = vec3(uv, 1.0);

  // matrices
  mat3 translateMatrix = mat3(1, 0, -translate.x,
                              0, 1, -translate.y,
                              0, 0, 1);

  // apply matrices
  newUv = newUv * translateMatrix;

  return newUv.xy;
}

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

uniform vec3 uColorProject;

uniform vec2 uGrid;

uniform sampler2D tMask;
uniform sampler2D tVideo;

uniform float uTransitionHover;
uniform float uTransitionState;

uniform vec2 uMeshSizes;

void main() {
  vec3 color = vec3(1.0, 0.1, 1.0);
  vec2 uv = vUv;

  vec3 normal = normalize(vNormal);
  float lighting = dot(normal, normalize(vec3(-0.3, 0.8, 0.5)));

  vec3 mask = texture2D(tMask, vUv).rgb;
  color = texture2D(tMask, vUv).rgb;

  vec2 videoUV = translateUV(
      scaleUV(vUv, vec2(2.0, 2.0), vec2(0.0)),
    vec2(
        -(uGrid.x / 2.0),
      vec2(-((1.0 - uGrid.y) / 2.0))
    )
  );

  if (uMeshSizes.x > uMeshSizes.y) {
      videoUV = scaleUV(videoUV, vec2(1.0, 1.53225806452), vec2(uGrid.x, (1.0 - uGrid.y)));
  }

  vec3 video = texture2D(tVideo, videoUV).rgb;

  vec3 background = vec3(0.9333333333333333, 0.9137254901960784, 0.8745098039215686);
  vec3 backgroundShape = vec3(0.984313725490196, 0.9686274509803922, 0.9294117647058824);

  vec3 shape = mix(backgroundShape, video, uTransitionHover);
  vec3 shapeColor = mix(shape, background, uTransitionState);

  if (mask.g > 0.001) {
      float transition = linearConvert(uTransitionHover, 0.0, 1.0, 0.0, 1.95);

    color.b *= mix(0.0, 1.0, clamp(transition - mask.g, 0.0, 1.0));
  }

  color = mix(background, shapeColor, color.b) + mix(0.0, lighting * 0.05, uTransitionState);

  if (vPosition.z < -0.499) color = uColorProject;

  

  gl_FragColor = vec4(color, 1.0);
}