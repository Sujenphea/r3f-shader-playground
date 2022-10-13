#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uStrength;
uniform vec2 uViewportSizes;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    float elevation = sin(modelPosition.y / uViewportSizes.y * PI + PI / 2.0) * abs(uStrength);
    
    modelPosition.z += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;  
}
