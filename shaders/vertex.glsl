uniform float uProgress;
uniform float uStrength;
varying vec2 vUv;
void main() {
    vUv = uv;
    vec3 pos = position;
    float curve =-sin(uv.x * 3.1415926535) * uStrength;
    pos.z += curve;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
