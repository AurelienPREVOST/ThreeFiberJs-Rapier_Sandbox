import { Box, OrbitControls, Sphere, Torus, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { BallCollider, RigidBody, quat } from "@react-three/rapier";
import { useRef, useState } from "react";
import * as THREE from "three"; // Importez THREE.js pour accéder à MathUtils
import { Controls } from "../App";


export const Experience2 = () => {
  const [hover, setHover] = useState(false);
  const cube = useRef();
  const [start, setStart] = useState(false)
  const kicker = useRef()
  const jump = () => {
    if (isOnFloor.current) {
      console.log("JUMP!")
      cube.current.applyImpulse({x: 0, y: 5, z: 0})
      isOnFloor.current = false
    }
  }

  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const forwardPressed = useKeyboardControls((state) => state[Controls.forward]);
  const backwardPressed = useKeyboardControls((state) => state[Controls.backward]);

  const handleMovement = () => {
    // Si on est pas au sol on ne peut pas bouger
    if (!isOnFloor.current) {
      return
    }
    if (rightPressed) {
      cube.current.applyImpulse({x: 0.1, y: 0, z:0})
    }
    if (leftPressed) {
      cube.current.applyImpulse({x: -0.1, y: 0, z:0})
    }
    if (forwardPressed) {
      cube.current.applyImpulse({x: 0, y: 0, z:-0.1})
    }
    if (backwardPressed) {
      cube.current.applyImpulse({x: 0, y: 0, z:0.1})
    }
  }


  useFrame((_state, delta) => {
    if (jumpPressed) {
      jump()
    }
    handleMovement()

    if(!start) {
      return
    }
    const curRotation = quat(kicker.current.rotation());
    const incrementRotation = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      delta *2,
    );
    curRotation.multiply(incrementRotation);
    kicker.current.setNextKinematicRotation(curRotation)
  })

  const isOnFloor = useRef(true)



  return (
    <>
      <ambientLight intensity={0.5}/>
      <directionalLight position={[-10, 10, 0]} intensity={0.4}/>
      <OrbitControls />

      <RigidBody 
        position={[-2.5,1,0]} 
        ref={cube} 
        onCollisionEnter={({other}) => {
        if (other.rigidBodyObject.name === 'floor') {
          isOnFloor.current = true;
          }
        }}
        onCollisionExit={({other}) => {
          if (other.rigidBodyObject.name === 'floor') {
            isOnFloor.current = false;
          }
        }}
      >
        <Box 
          onPointerEnter={() => setHover(true)} 
          onPointerLeave={()=> setHover(false)}
          onClick={() => setStart(true)}
        >
          <meshStandardMaterial color={hover ? "grey": "red"}/>
        </Box>
      </RigidBody>


      <RigidBody type="kinematicPosition" position={[0, 0.75, 0]} ref={kicker}>
        <group position={[2.5, 0, 0]}>
          <Box args={[5, 0.5, 0.5]}>
            <meshStandardMaterial color="grey" />
          </Box>
        </group>
      </RigidBody>




      {/* plateau - en ajoutant type="fixed" on rend l'element fixe comme du sol ou un mur, il existe 4 types différents*/ }
      <RigidBody type="fixed" friction={1} name='floor'>
        <Box position={[0, 0, 0]} args={[20, 1, 20]}>
          <meshStandardMaterial color='springgreen'/>
        </Box>
      </RigidBody>
    </>
  );
};
