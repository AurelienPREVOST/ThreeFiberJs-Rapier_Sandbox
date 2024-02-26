import { Box, OrbitControls, Sphere, Torus } from "@react-three/drei";
import { BallCollider, RigidBody } from "@react-three/rapier";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={0.5}/>
      <directionalLight position={[-10, 10, 0]} intensity={0.4}/>
      <OrbitControls />

{/* Sphere - taille par defaut même si non précisé de 1. Attention ici une sphere donc si plus d'arguments passé dans le tableau forme bizarre possible
La restitution donne la puissance de l'effet rebond (peux etre negatif), à 1 il restitue 100% de sa force*/}
      <RigidBody position={[4, 5, 0]} colliders={"ball"} restitution={0.5}>
        <Sphere args={[2.2]}>
          <meshStandardMaterial color={"red"}  />
        </Sphere>
      </RigidBody>

{/* box */}
      <RigidBody position={[1, 7, 0]} gravityScale={1} restitution={-2}>
        <Box>
          <meshStandardMaterial color='royalblue'/>
        </Box>
      </RigidBody>




{/* Anneau -attention trimesh est gourmand en ressource, on peux lui préféré "hull" qui prendra les contours mais pas le creux de l'anneau par exemple*/}
      <RigidBody position={[-2, 3, 0]} colliders="trimesh">
        <Torus>
          <meshStandardMaterial color="orange"/>
        </Torus>
      </RigidBody>

      {/* Sphere with box glue - On peut construire une forme complexe en additionnant des elements qui ne feront qu'un. Dans ce cas le collider doit être passé à false*/}
      <RigidBody position={[0, 5, 0]} colliders="trimesh" gravityScale={4}>
        {/* <BallCollider args={[1]} position={[0, 1, 0]}/> faire le test en mettant colliders={false} au dessus, on va créé une box collision*/}
        {/* position-y indique la position de la sphere par rapport à la box */}
        <Sphere position-y={1.2}>
          <meshStandardMaterial color={"white"}/>
        </Sphere>
        <Box>
          <meshStandardMaterial color='white'/>
        </Box>
      </RigidBody>

      {/* plateau - en ajoutant type="fixed" on rend l'element fixe comme du sol ou un mur, il existe 4 types différents*/ }
      <RigidBody type="fixed" restitution={1}>
        <Box position={[0, 0, 0]} args={[20, 1, 20]}>
          <meshStandardMaterial color='springgreen'/>
        </Box>
      </RigidBody>


      {/* De base on a un mesh mais on le supprime au profit d'un rigidbody qui peux bénéficier de physics */}
      {/* <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
    </>
    
  );
};
