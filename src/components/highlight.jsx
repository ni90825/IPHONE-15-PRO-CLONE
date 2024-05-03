import { useGSAP } from '@gsap/react'
// import React from 'react';
import { useRef } from 'react';
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";
import watchimage from "../../public/assets/images/watch.svg";
import arrow from "../../public/assets/images/right.svg"
import Videocarousel from './videocarousel';

gsap.registerPlugin(ScrollTrigger)

const Highlight = () => {
const highlightref=useRef();
useGSAP(()=>{
  gsap.to("#title",{
    opacity:1,
    translateY:0,
    duration:1,
    scrollTrigger:{
      trigger:highlightref.current,
      start:"top 70%"
    }
  })
  gsap.to(".link",{
    opacity:1,
    translateY:0,
    duration:1,
    scrollTrigger:{
      trigger:highlightref.current,
      start:"top 70%"
    },
    stagger:{
      amount:0.2,
    }
  })
},[])
  return (
    <>
    <section id='highlights' className='w-full h-full common-padding bg-zinc' ref={highlightref}>
      <div className='screen-max-width'>
        <div className='w-full flex flex-row lg:items-end items-center md:items-baseline flex-wrap justify-between md:gap-4 gap-1 lg:gap-8'>
          <h1 className='section-heading' id='title'>
            Get the highlights.
          </h1>
          <div className='flex flex-row gap-8'>
          <div className='flex  flex-row gap-2 item-baseline link' >
            <p >Watch the film</p>
            <img src={watchimage}></img>
          </div>

          <div className='flex flex-row items-baseline gap-2 link'>
            <p>Watch the event</p>
            <img src={arrow}></img>
          </div>
          </div>
        </div>
      <Videocarousel></Videocarousel>
      </div>
    </section>
    </>
  )
}

export default Highlight