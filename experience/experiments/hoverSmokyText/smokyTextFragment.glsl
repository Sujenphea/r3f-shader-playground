uniform sampler2D uTexture;
uniform sampler2D uNoiseTexture;
uniform vec2 uMouse;
uniform float uTime;

varying vec2 vUv;

// shadows
const float density = 0.7; // distance of shadow from main text
const int samples = 4; // The number of samples to take
const float weight = 0.38; // shadow weighting
const float decay = 0.8; // the amount to decay each sample by

// spotlight
const float spotlightDiameter = 0.4; // size of spotlight
const float spotlightColourRadius = 0.4; // radius of color of spotlight (minimum alrdy applied)
const float exposure = 0.5; // light exposure

// colors
const vec3 spotlightColor = vec3(0.639, 0.051, 1.0);
const vec3 textColor = vec3(0.114, 0.682, 1.0);
const vec3 backgroundColor = vec3(0.0, 0.0, 0.0); 

// form text given texture containing text
float formText(vec2 uv) {
    // moves shape on hover
    uv += (uMouse - vec2(0.5)) * 0.2;

    return texture2D(uTexture, uv).x;
}

// form spotlight on hover position
float formSpotlight(vec2 uv, vec2 uMouse, float object) {
    return (1.0 - smoothstep(0.0, spotlightDiameter, length(uMouse - uv))) * 
           (1.0 - object);
}

// random value given noise texture
float random2d(vec2 uv) {
  uv /= 256.0;

  vec4 tex = texture2D(uNoiseTexture, uv);

  return mix(tex.x, tex.y, tex.a);
}


void main() {
    vec3 color = vec3(1.0, 1.0, 1.0);
    vec2 uv = vUv;

    float text = formText(uv); // create shape

    float mappedText = formSpotlight(uv, uMouse, text); // creates spotlight effect

    vec2 shadowOffset = (uv - uMouse) * (1.0 / float(samples) * density);
    float currentDecay = 1.0;

    // repeat with each shadow
    vec2 _uv = vUv;
    for (int i = 0; i < samples; i++) {
        _uv -= shadowOffset;
        
        // - scattering
        float movement = uTime * 20.0 * float(i + 1);
        float dither = random2d(uv * 512.0 + 
                                mod(vec2(movement * sin(uTime * 0.5), 
                                        -movement), 
                                    1000.0)
                                ) * 2.0;

        // - _uv = position of shadow
        // - formText(_uv) = create new shape based on position
        // - shadowOffset * dither = one less shadow because that shadow on initial position
        float shadowText = formSpotlight(uv, uMouse, formText(_uv + shadowOffset * dither)); // create spotlight effect on shadow
        
        // - fade shadow
        shadowText *= currentDecay * weight;
        
        // - gradually increase value of fade
        currentDecay *= decay; 

        // - add shadow onto mappedText
        mappedText += shadowText;
    }

    float colorMixRatio = length(uMouse - uv) * (1.0 / spotlightColourRadius);

    // - color of letters
    // - mix color based on position from hover
    vec3 spotlightColor = mix(spotlightColor, textColor, colorMixRatio);
    // vec3 spotlightColor = textColor;

    // - mappedText = letters
    // - exposure = brightness
    color = vec3(backgroundColor + mappedText * exposure * spotlightColor);

    gl_FragColor = vec4(color, 1.0);
}