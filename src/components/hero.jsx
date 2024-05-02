import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import React, { useEffect, useState } from 'react';
import smallsizevideo from "../../public/assets/videos/smallHero.mp4";
import bigsizevideo from "../../public/assets/videos/hero.mp4";

const Hero = () => {
  const [selectedvideo,setSelectedvideo]=useState(window.innerWidth < 472 ? smallsizevideo:bigsizevideo);
  useGSAP(()=>{
    gsap.to("#cta",{
      opacity:1,
      translateY:-50,
      delay:1.5,
    })
  },[])

  const handlevideochange=()=>{
    if(window.innerWidth < 472){
      setSelectedvideo(smallsizevideo);
    }
    else{
      setSelectedvideo(bigsizevideo);
    }
  }

  useEffect(()=>{
    window.addEventListener("resize",handlevideochange);
    return ()=>{
      window.removeEventListener("resize",handlevideochange);
    }
  },[])

  useGSAP(()=>{
    gsap.to("#herro",{
      opacity:1,
      delay:1.5
    })
  },[])
  return (
    <>
    <section className='w-full nav-height bg-black relative'>
      <div className='h-5/6 w-full flex-center flex-col'>
      <p className='hero-title ' id='herro'>iPhone 15 Pro</p>
      <div className='md:w-10/12 w-9/12'>
      {/* To prevent this automatic fullscreen behavior and keep the video playing inline within its container, you can use the playsinline attribute */}
      <video className='pointer-events-none' autoPlay muted playsInline={true}>
        <source src={selectedvideo} type='video/mp4'></source>
      </video>
      </div>
      </div>
      <div id='cta' className='w-full flex flex-col items-center justify-items-center translate-y-20 opacity-0'>
<a href='#highlights' className='btn'>Buy</a>
<p className='font-normal text-xl'>From ₹134900.00</p>
      </div>
    </section>
    </>
  )
}

export default Hero