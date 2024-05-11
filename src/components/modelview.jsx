import React, { Suspense } from 'react';
import { PerspectiveCamera, View,Html, OrbitControls } from '@react-three/drei';
import Lights from './light';
import Iphone from "./iphone";
import * as THREE from "three";

const Modelview = ({index,groupRef,gsapType,controlRef,setRotationState,size,item}) => {
  return (
    <>
<View 
index={index}
id={gsapType}
className={`${(index===2) ? "right-[-100%]":""} w-full h-full absolute`}
>
{/* inside the view 3d model scene is created */}

    {/* light give the light in all the direction */}
    <ambientLight intensity={0.3}></ambientLight>

<Lights></Lights>

    <PerspectiveCamera makeDefault position={[0,0,4]}></PerspectiveCamera>

<OrbitControls
makeDefault
ref={controlRef}
enableZoom={false}
enablePan={false}
rotateSpeed={0.4}
target={new THREE.Vector3(0, 0 ,0)}
onEnd={()=> setRotationState(controlRef.current.getAzimuthalAngle())}
/>
<Suspense fallback={ <Html>
      <div className="absolute w-full h-full flex justify-center items-center">
        <div className="w-[10vw] h-[10vw] rounded-full">
          Loading...
        </div>
      </div>
    </Html>}>
    <Iphone scale={index===1 ? [17,17,17]:[19,19,19]} item={item} size={size}></Iphone>
</Suspense>
</View>
    </>
  )
}

export default Modelview