export const particleVertexShader = `
uniform float uTime;
uniform float uScale;

attribute float aScale;
attribute vec3 aColor;

varying vec3 vColor;

void main() {
  vColor = aColor;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  // Add some movement
  float angle = atan(modelPosition.x, modelPosition.z);
  float distanceToCenter = length(modelPosition.xz);
  float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
  angle += angleOffset;
  modelPosition.x = cos(angle) * distanceToCenter;
  modelPosition.z = sin(angle) * distanceToCenter;
  
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  gl_PointSize = 20.0 * aScale * uScale;
  gl_PointSize *= (1.0 / -viewPosition.z);
}
`;

export const particleFragmentShader = `
varying vec3 vColor;

void main() {
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  float strength = 1.0 - (distanceToCenter * 2.0);
  gl_FragColor = vec4(vColor, strength);
}
`;

export const spikeVertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;

// Classic Perlin 3D Noise 
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec3 P){
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0) - 0.5;
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1) - 0.5;
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 nz = mix(vec4(dot(g000, Pf0), dot(g100, vec3(Pf1.x, Pf0.yz)), dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z)), dot(g110, vec3(Pf1.xy, Pf0.z))),
                vec4(dot(g001, vec3(Pf0.xy, Pf1.z)), dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z)), dot(g011, vec3(Pf0.x, Pf1.yz)), dot(g111, Pf1)), fade(Pf0).z);
  return mix(mix(nz.x, nz.y, fade(Pf0).x), mix(nz.z, nz.w, fade(Pf0).x), fade(Pf0).y);
}


void main() {
  vec3 newPosition = position;

  // Mouse influence
  vec3 mouseInfluence = vec3(uMouse.x, uMouse.y, 0.0) * 0.5; // Adjust strength as needed
  float distToMouse = distance(newPosition.xy, uMouse);
  float mouseEffect = smoothstep(0.6, 0.0, distToMouse); // Spikes grow closer to mouse

  // Time-based animation
  float timeEffect = cnoise(newPosition * 2.0 + uTime * 0.1) * 0.5; // Perlin noise for organic growth

  // Combine effects
  float spikeAmount = (timeEffect + mouseEffect * uHover) * 0.5;

  newPosition += normal * spikeAmount;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

export const spikeFragmentShader = `
void main() {
  gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0); // Orange color for spikes
}
`;

export const waterVertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const waterFragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform sampler2D uTexture;

varying vec2 vUv;

// Simple noise function
float random(vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
    vec2 st = vUv;
    
    // Animate the water
    vec2 waterSt = st;
    waterSt.y += sin(waterSt.x * 10.0 + uTime * 2.0) * 0.02;
    waterSt.y += cos(waterSt.x * 5.0 + uTime * 1.0) * 0.02;

    // Mouse interaction
    float mouseDist = distance(st, uMouse);
    waterSt.y += 0.1 / (mouseDist + 0.1);

    vec4 videoColor = texture2D(uTexture, waterSt);

    gl_FragColor = videoColor;
}
`;
