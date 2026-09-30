import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const LookAroundControls = ({ onInteract, limits = {} }) => {
  const { camera, gl } = useThree();
  const stateRef = useRef({
    yaw: 0,
    pitch: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
  });

  const {
    minYaw = -0.95,
    maxYaw = 0.95,
    minPitch = -0.42,
    maxPitch = 0.38,
    sensitivity = 0.0035,
  } = limits;

  useEffect(() => {
    const canvas = gl.domElement;
    const state = stateRef.current;

    const setAnglesFromCamera = () => {
      const euler = new THREE.Euler().setFromQuaternion(camera.quaternion, "YXZ");
      state.yaw = euler.y;
      state.pitch = euler.x;
    };

    setAnglesFromCamera();

    const onPointerDown = (event) => {
      if (event.button !== 0 || event.target !== canvas) return;
      state.dragging = true;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      onInteract?.();
    };

    const onPointerMove = (event) => {
      if (!state.dragging) return;
      const deltaX = event.clientX - state.lastX;
      const deltaY = event.clientY - state.lastY;
      state.lastX = event.clientX;
      state.lastY = event.clientY;

      state.yaw = clamp(state.yaw - deltaX * sensitivity, minYaw, maxYaw);
      state.pitch = clamp(state.pitch - deltaY * sensitivity, minPitch, maxPitch);

      camera.rotation.set(state.pitch, state.yaw, 0, "YXZ");
    };

    const stopDrag = () => {
      state.dragging = false;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", stopDrag);
    window.addEventListener("pointercancel", stopDrag);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopDrag);
      window.removeEventListener("pointercancel", stopDrag);
    };
  }, [
    camera,
    gl,
    maxPitch,
    maxYaw,
    minPitch,
    minYaw,
    onInteract,
    sensitivity,
  ]);

  return null;
};

export default LookAroundControls;
