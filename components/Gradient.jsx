"use client";
import React from "react";
import { ShaderGradient,ShaderGradientCanvas } from "@shadergradient/react";

export default function Gradient() {
  return (
    // The wrapper must be absolute and fill 100% of the parent
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none touch-none overflow-hidden">
      <ShaderGradientCanvas
        style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%",
          pointerEvents: "none"
        }}
        camera={{ fov: 65, near: 0.01, far: 1000 }}
      >
        <ShaderGradient
          control="none"
          color3="#acbb7b"
          color1="#e9edc9"
          color2="#faedcd"
          uAzimuthAngle={0.7}
          uBrightness={1.1}
          uIntensity={1.5}
          uSpeed={0.5}
          type="plane"
          animate="on"
          rotationZ={30}
          positionY={1}
          cameraZoom={0.5}
          cDistance={2}
        />
      </ShaderGradientCanvas>
    </div>
  );
}