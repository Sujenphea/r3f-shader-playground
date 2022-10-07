uniform sampler2D uTexture;
uniform vec2 uMouse;

varying vec2 vUv;

// form text given texture containing text
float formText(vec2 uv) {
    // moves shape on hover
    uv += (uMouse - vec2(0.5)) * 0.2;

    return texture2D(uTexture, uv).x;
}

void main() {
    vec3 color = vec3(1.0, 1.0, 1.0);
    vec2 uv = vUv;

    float text = formText(uv); // create shape

    color = vec3(text);


    gl_FragColor = vec4(color, 1.0);
}