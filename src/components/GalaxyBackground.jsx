import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function GalaxyBackground() {
  return (
    <Canvas>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
    </Canvas>
  );
}
