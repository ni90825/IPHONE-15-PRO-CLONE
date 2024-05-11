import { useGSAP } from '@gsap/react'
import React,{useEffect} from 'react'
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";
import { yellowImg } from '../utils';
import { useRef, useState } from 'react';
import * as  THREE from "three";
import Modelview from './modelview';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';
import { models,sizes } from '../constants';
import { animateWithGsapTimeline } from '../utils/animation';

gsap.registerPlugin(ScrollTrigger)

const Model = () => {
    const [size,setSize]=useState("small");
    const [model,setModel]=useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: yellowImg
    })

    // this is use as a ref for orbit control
    const cameraControlSmall = useRef(null);
    const cameraControlLarge = useRef(null);
    
    // this is use as ref for the model 
    // new THREE.GROUP() IS CREATE THE GROUP(WHICH HELP TO THE GROUP THE COMPONENTS OF THE THREE.JS)
    const small= useRef(new THREE.Group());
    const large= useRef(new THREE.Group());

    const [smallrotation,setSmallrotation]=useState(0);
    const [largerotation,setLargerotation]=useState(0);

    const tl = gsap.timeline();

    useEffect(() => {
        if(size === 'large') {
          animateWithGsapTimeline(tl, small, smallrotation, '#view1', '#view2', {
            transform: 'translateX(-100%)',
            duration: 1
          })
        }
    
        if(size ==='small') {
          animateWithGsapTimeline(tl, large, largerotation, '#view2', '#view1', {
            transform: 'translateX(0)',
            duration: 1
          })
        }
      }, [size])

    
    useGSAP(()=>{
        gsap.to("#heading",{
            y:0,
            opacity:1,
            scrollTrigger:{
                trigger:"#headingsection"
            }
        })
    },[])

    useGSAP(()=>{
        if(size=="large"){
            console.log(size)
            gsap.to("#circle",{
                x:"100%",
                duration:0.5     
            })
        }
        else if(size=="small"){
            console.log(size)
            gsap.to("#circle",{
                x:0,
                duration:0.5       
            })
        }
    },[size])

  return (
    <section className='common-padding'>
        <div className='screen-max-width' id='headingsection'>
            <h1 className='section-heading' id='heading'>
                Take a closer look.
            </h1>

            <div className='flex flex-col items-center mt-3'>
            <div className='w-full h-[80vh] md:h-[85vh] overflow-hidden relative'>
            <Modelview 
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallrotation}
              item={model}
              size={size}
            />  

            <Modelview 
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargerotation}
              item={model}
              size={size}
            />

{/* canvas component is use to render whole 3d scene. this canvas component present in react-three/fiber */}
{/* inside the canvas all the model/3d scene is render. */}

            <Canvas className='w-full h-full' style={{
                position:"fixed",
                top:0,
                right:0,
                bottom:0,
                left:0,
                overflow:"hidden"
            }}
            // this event source help canvas to listen all the events of the model which is present in particular section.
            // without this eventsource sometimes it can't able to listen the event act on the model i.e mouseevent,keyboard event so on.

            eventSource={document.getElementById("root")}
            >
                {/* this view.port consist of all the views of 3d model */}
                {/* all created 3d scene is kept here */}
                <View.Port></View.Port>
            </Canvas>
            </div>
            <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li key={i} className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{ backgroundColor: item.color[0] }} onClick={() => setModel(item)} />
                ))}
              </ul>

              <button className="size-btn-container relative">
                <div className='w-6/12 h-full rounded-full bg-white absolute' id='circle'></div>
                {sizes.map(({ label, value }) => (
                  <span key={label} className={`size-btn z-10`} style={{color: size === value ? 'black' : 'white'}} onClick={() => {
                    setSize(value)
                    }}>
                    {/* style={{ backgroundColor: size === value ? 'white' : 'transparent', color: size === value ? 'black' : 'white'}} */}
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
            </div>
        </div>
    </section>
  )
}

export default Model