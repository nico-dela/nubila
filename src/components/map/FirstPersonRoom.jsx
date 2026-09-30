import { Suspense, useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera, useTexture } from "@react-three/drei";
import * as THREE from "three";
import m2Texture from "../../assets/images/M2.webp";
import LookAroundControls from "./LookAroundControls";
import RoomObject from "./RoomObject";
import {
  CAMERA_POSITION,
  INITIAL_LOOK_AT,
  roomHotspots,
} from "../../data/roomHotspots";

const RoomShell = ({ debug }) => {
  const wallTexture = useTexture(m2Texture);
  wallTexture.wrapS = wallTexture.wrapT = THREE.ClampToEdgeWrapping;
  wallTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.5]} receiveShadow>
        <planeGeometry args={[5.2, 5.2]} />
        <meshStandardMaterial color="#7cb068" roughness={1} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.55, 0.015, -1.85]}>
        <planeGeometry args={[1.35, 1.05]} />
        <meshStandardMaterial color="#b8c9d4" roughness={0.35} metalness={0.05} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.45, 0.015, -1.85]}>
        <planeGeometry args={[0.95, 0.85]} />
        <meshStandardMaterial color="#c9a56c" roughness={0.95} />
      </mesh>

      <mesh position={[0, 1.45, -2.48]} receiveShadow>
        <planeGeometry args={[5.1, 2.9]} />
        <meshStandardMaterial map={wallTexture} roughness={0.95} />
      </mesh>

      <mesh
        position={[2.48, 1.45, -0.35]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[4.2, 2.9]} />
        <meshStandardMaterial map={wallTexture} roughness={0.95} />
      </mesh>

      <mesh position={[2.47, 1.35, -0.25]}>
        <planeGeometry args={[0.02, 1.45, 1.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.2} />
      </mesh>

      <mesh position={[2.465, 1.35, -0.25]}>
        <planeGeometry args={[0.01, 1.15, 0.82]} />
        <meshStandardMaterial color="#9ed0f5" emissive="#6bb8ea" emissiveIntensity={0.12} />
      </mesh>

      <mesh position={[-2.48, 1.45, -0.35]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[4.2, 2.9]} />
        <meshStandardMaterial color="#f2efe8" roughness={0.98} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 2.95, -0.35]}>
        <planeGeometry args={[5.1, 5.1]} />
        <meshStandardMaterial color="#f7f4ef" roughness={1} />
      </mesh>
    </group>
  );
};

const CameraRig = () => {
  const { camera } = useThree();

  useLayoutEffect(() => {
    camera.position.set(...CAMERA_POSITION);
    camera.lookAt(new THREE.Vector3(...INITIAL_LOOK_AT));
  }, [camera]);

  return null;
};

const Scene = ({
  onHotspotSelect,
  hoveredHotspotId,
  onHoverChange,
  onInteract,
  debug,
}) => (
  <>
    <PerspectiveCamera makeDefault fov={68} near={0.1} far={30} />
    <CameraRig />
    <color attach="background" args={["#dbe8f0"]} />
    <fog attach="fog" args={["#dbe8f0", 8, 16]} />
    <ambientLight intensity={0.72} />
    <directionalLight position={[2, 4, 1.5]} intensity={0.85} castShadow />
    <directionalLight position={[-2, 2, -1]} intensity={0.25} />
    <Suspense fallback={null}>
      <RoomShell debug={debug} />
    </Suspense>
    {roomHotspots.map((hotspot) => (
      <RoomObject
        key={hotspot.id}
        hotspot={hotspot}
        onSelect={onHotspotSelect}
        isHovered={hoveredHotspotId === hotspot.id}
        onHoverChange={onHoverChange}
        debug={debug}
      />
    ))}
    <LookAroundControls onInteract={onInteract} />
  </>
);

const FirstPersonRoom = ({
  onHotspotSelect,
  hoveredHotspotId,
  onHoverChange,
  onInteract,
  debug = false,
}) => (
  <Canvas
    className="first-person-room-canvas"
    shadows
    gl={{ antialias: true }}
    dpr={[1, 1.5]}
  >
    <Scene
      onHotspotSelect={onHotspotSelect}
      hoveredHotspotId={hoveredHotspotId}
      onHoverChange={onHoverChange}
      onInteract={onInteract}
      debug={debug}
    />
  </Canvas>
);

export default FirstPersonRoom;
