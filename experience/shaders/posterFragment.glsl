uniform sampler2D uTexture;

varying float vElevation;
varying vec2 vUv;

#define PI 3.14159265358979323846

vec2 rotate2D(vec2 _st, float _angle) {
    _st -= 0.5;
    _st = mat2(cos(_angle), -sin(_angle),
               sin(_angle), cos(_angle)) 
          * _st;
    _st += 0.5;
    
    return _st;
}

vec2 tile(vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st);
}

float makeCross(in vec2 _st, float width) {
    vec2 coord = rotate2D(_st, PI * 0.25);
    float halfWidth = width * 0.5;
    
    float cross = (1.0 - floor(coord.x + 0.5 + halfWidth)) + floor(coord.x + 0.5 - halfWidth);
    cross *= (1.0 - floor(coord.y + 0.5 + halfWidth)) + floor(coord.y + 0.5 - halfWidth);
    
    return cross;
}

float makeCenterVerticalLine(in vec2 _st, float width) {
    float halfWidth = width * 0.5;
    
    float verticalCenter = (1.0 - floor(_st.x + 0.5 + halfWidth)) + floor(_st.x + 0.5 - halfWidth);
    
    return verticalCenter;
}

float makeRightBorder(in vec2 _st, float width) {
    float right = 1.0 - floor(_st.x + width);
    
    return right;
}

void main()
{
    vec4 color = vec4(1.0);
    vec2 st = vUv;

    st = tile(st, 10.0);
    
    float cross = makeCross(st, 0.02);
    float verticalCenter = makeCenterVerticalLine(st, 0.01);
    float right = makeRightBorder(st, 0.01);
    
    vec3 borders = vec3(1.0 - right * cross * verticalCenter) * vec3(0.3, 0.3, 0.3);
    
    color = vec4(vec3(0.99), 1.0) - vec4(borders, 0.15);

    gl_FragColor = color;
}