uniform vec2 uMouse;

varying vec2 vUv;

void main() {
    vec3 color = vec3(1.0, 0.5, 0.5);
    vec2 st = vUv;

    color = vec3(uMouse, 0.0);

    gl_FragColor = vec4(color, 1.0);
}