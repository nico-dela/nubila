import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RoomObject = ({
  hotspot,
  onSelect,
  isHovered,
  onHoverChange,
  debug = false,
}) => {
  const meshRef = useRef();
  const [localHover, setLocalHover] = useState(false);
  const hovered = isHovered || localHover;
  const isAvailable = hotspot.album.status === "available";
  const [width, height, depth] = hotspot.size;

  useFrame(() => {
    if (!meshRef.current) return;
    const material = meshRef.current.material;
    if (!material || material.emissiveIntensity === undefined) return;
    const target = hovered ? 0.45 : isAvailable ? 0.22 : 0.08;
    material.emissiveIntensity = THREE.MathUtils.lerp(
      material.emissiveIntensity,
      target,
      0.18
    );
  });

  const handlePointerDown = (event) => {
    event.stopPropagation();
  };

  const handlePointerOver = (event) => {
    event.stopPropagation();
    setLocalHover(true);
    onHoverChange(hotspot.id, hotspot);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setLocalHover(false);
    onHoverChange(null, null);
    document.body.style.cursor = "default";
  };

  const handleClick = (event) => {
    event.stopPropagation();
    onSelect(hotspot);
  };

  return (
    <group position={hotspot.position}>
      <mesh
        ref={meshRef}
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={hotspot.color}
          emissive={hovered ? "#ffffff" : hotspot.color}
          emissiveIntensity={hovered ? 0.35 : isAvailable ? 0.15 : 0.05}
          roughness={0.82}
          metalness={0.04}
          wireframe={debug}
        />
      </mesh>
      {debug && (
        <mesh>
          <boxGeometry args={[width + 0.08, height + 0.08, depth + 0.08]} />
          <meshBasicMaterial color="#ff3366" wireframe transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  );
};

export default RoomObject;
