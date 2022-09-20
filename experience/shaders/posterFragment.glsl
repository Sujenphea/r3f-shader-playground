uniform sampler2D uTexture;
uniform vec2 uMouse;

varying vec2 vUv;

void main() {
    vec3 color = vec3(1.0, 0.5, 0.5);
    vec2 st = vUv;

    vec4 textureColor = texture2D(uTexture, vUv);


    color = textureColor.xyz;
    
    float opacity = clamp(1.0 - length(uMouse - st), 0.5, 1.0);

    gl_FragColor = vec4(color, opacity);
}