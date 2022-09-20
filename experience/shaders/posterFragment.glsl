uniform sampler2D uTexture;

varying float vElevation;
varying vec2 vUv;

void main()
{
    vec3 color = vec3(1.0);
    vec2 st = vUv;

    // st *= 3.0;
    // st = fract(st);
    // color = vec3(st,0.0);

    // float result = mod(dot(vec2(1.0), step(vec2(0.5), fract(vUv * 3.0))), 2.0);
    // gl_FragColor = mix(vec4(1.0, 1.0, 1.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0), result);

    vec4 textureColor = texture2D(uTexture, vUv);
    color = textureColor.xyz;


    // float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    // vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

    gl_FragColor = vec4(color, 1.0);
}