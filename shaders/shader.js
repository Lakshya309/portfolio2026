export const vertexShader = `
uniform float uProgress; // Value from 0.0 to 1.0 (scroll progress)
uniform float uStrength; // Base curve intensity
varying vec2 vUv;

void main() {
    vUv = uv;
    vec3 pos = position;

    // 1. Base Reel Curve (The cylindrical shape)
    float curve = sin(uv.x * 3.1415926535) * uStrength;
    
    // 2. The Pulsation Logic
    // We use a sine wave tied to progress so the "pulse" is strongest at 0.5 (mid-transition)
    float pulseIntensity = sin(uProgress * 3.1415926535); 
    
    // 3. Shape Distortion (Bulge effect)
    // Displace vertices based on distance from center (0.5, 0.5)
    float dist = distance(uv, vec2(0.5));
    float distortion = pulseIntensity * 0.15 * (1.0 - dist);
    
    pos.z += curve + distortion;
    
    // Slight elastic scale effect on the XY plane during the pulse
    pos.xy *= 1.0 + (pulseIntensity * 0.05);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const fragmentShader = `
uniform sampler2D uTexture;
uniform float uOpacity;
uniform float uProgress; // Tied to scroll
uniform vec3 uColor;
varying vec2 vUv;

void main() {
    // 1. Dynamic RGB Shift (Chromatic Aberration)
    // The shift peaks when the pulse/progress is at 0.5
    float pulse = sin(uProgress * 3.1415926535);
    float shift = pulse * 0.015; 
    
    // Sample texture 3 times for the RGB split
    float r = texture2D(uTexture, vUv + vec2(shift, 0.0)).r;
    float g = texture2D(uTexture, vUv).g;
    float b = texture2D(uTexture, vUv - vec2(shift, 0.0)).b;
    
    vec3 color = vec3(r, g, b);
    
    // 2. Pulse Brightness/Contrast
    // Makes the image "pop" slightly as it enters the center of the screen
    color += pulse * 0.1;

    // 3. Color Tint
    color = mix(color, uColor, pulse * 0.5);

    gl_FragColor = vec4(color, uOpacity);
}
`;