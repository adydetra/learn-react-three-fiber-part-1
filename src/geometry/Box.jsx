import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Box = (props) => {
  const ref = useRef()

  const [rotate, useRotate] = useState(false)
  const [hover, useHover] = useState(false)
  const [count, useCount] = useState(0)

  const geometry = useMemo(
    () => [
      new THREE.BoxGeometry(), new THREE.SphereGeometry(0.785398), []
    ],
  )
  
  useEffect(() => {
    console.log(ref.current.geometry.uuid)
  })

  useFrame((_, delta) => {
    if (rotate) {
      ref.current.rotation.x += 1 * delta
      ref.current.rotation.y += 0.5 * delta
    }
  })

  return (
    <mesh
      {...props}
      ref={ref}
      scale={hover ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      onClick={() => useRotate(!rotate)}
      // onPointerUp={(e) => {console.log("Pointer Up " + e.object.name)}}
      // onPointerDown={(e) => {console.log("Pointer Down " + e.object.name)}}
      onPointerDown={() => useCount((count + 1) % 2)}
      onPointerOver={() => useHover(true)}
      onPointerOut={() => useHover(false)}
      // onUpdate={(self) => {console.log(self)}}
      geometry={geometry[count]}
    >
      {/* <boxGeometry /> */}
      <meshBasicMaterial {...props} color={hover ? 0x00ff00 : 0xFFFFFF} />
    </mesh>
  )
}

export default Box;