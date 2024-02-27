import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Physics } from "@react-three/rapier";
import { Suspense, useMemo } from "react";
import { Experience2 } from "./components/Experience2";
import { KeyboardControls } from "@react-three/drei";

export const Controls = {
  forward: 'forward',
  backward: 'backward',
  left: 'left',
  right: 'right',
  jump: 'jump'
}


function App() {

  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.backward, keys: ["ArrowDown", "KeyS"] }, 
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  return (
    <KeyboardControls map={map}>

      <Canvas shadows camera={{ position: [10, 10, 10], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        {/* Suspense???? */}
        <Suspense>
          {/* debug permet d'avoir des contours rouge autour des mesh et autres assets */}
          <Physics debug>
            <Experience2 />
          </Physics>
        </Suspense>
      </Canvas>

    </KeyboardControls>
  );
}

export default App;
