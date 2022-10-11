/**
* idea:
* - ref: https://kacper.ch
* - hover gradually shows shape + image / video
* - result = blue in mask * (hover progress [0, 2] - green in mask [0, 1])[0, 1]
* - result used to calculate, showing either background or image / video
*/

precision highp float;
precision highp int;
#define GLSLIFY 1

float linearConvert(float value, float oldMin, float oldMax, float newMin, float newMax) {
    return newMin + (value - oldMin) * (newMax - newMin) / (oldMax - oldMin);
}

uniform vec3 uBackgroundColor;
uniform vec3 uBackgroundShapeColor;

uniform sampler2D tMask;
uniform sampler2D tVideo;

uniform float uTransitionHover;

varying vec2 vUv;

void main() {
    vec3 video = texture2D(tVideo, vUv).rgb;
    vec3 mask = texture2D(tMask, vUv).rgb;
    vec3 color = mask;

    // transition between shape and video
    vec3 shapeVideo = mix(uBackgroundShapeColor, video, uTransitionHover);

    // purpose: maintain first mask shape
    if (mask.g > 0.001) {
        // maintain 1.0 visibility for video shape
        // - code below causes the transparency to happen
        float transition = linearConvert(uTransitionHover, 0.0, 1.0, 0.0, 1.95);
        
        // store value (temp) of hover between background vs. video
        color.b *= mix(0.0, 1.0, clamp(transition - mask.g, 0.0, 1.0));
    }

    // perform operation of either background or video
    color = mix(uBackgroundColor, shapeVideo, color.b);

    gl_FragColor = vec4(color, 1.0);
}