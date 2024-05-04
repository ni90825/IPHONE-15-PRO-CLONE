// import React from 'react'
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {hightlightsSlides} from "../constants/index";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
const Videocarousel = () => {

  const videoRef=useRef([]);
  const videoSpanRef=useRef([]);
  const videoDivRef=useRef([]);

  const [metaloadedData,setmetaLoadedData]=useState([]);

  // this state keep the track of video
  const [video,setVideo]=useState({
    isEnd:false,
    startPlay:false,
    isPlaying:false,
    videoId:0,
    isLastVideo:false,
  })

  let {isEnd,startPlay,isPlaying,videoId,isLastVideo} = video;

  useGSAP(()=>{
    gsap.to("#slider",{
      transform:`translateX(${-100*videoId}%)`,
      duration:2,
      ease:"power2.inOut"
    })
    gsap.to("#video",{
      scrollTrigger:{
        trigger:".video-carousel_container",
        toggleActions:"restart none none none",
        start:"top 40%",

// When the trigger enters the viewport:
// The associated animation restarts from the beginning.
// When the trigger leaves the viewport:
// No additional actions are taken on completion.
// No additional actions are taken on reversal.
// No additional actions are taken during scrolling while the trigger is active
onEnter:()=>{
  setVideo((prevvideo)=>({...prevvideo,startPlay:true,isPlaying:true}))
},
onComplete:()=>{
  // oncomplete indicates the complete of animation
  setVideo((prevvideo)=>({...prevvideo,startPlay:true,isPlaying:true}))
}

      },
    })
  },[isEnd,videoId])
  useEffect(()=>{
    let currentprogress=0;
    let span=videoSpanRef.current;

    if(span[videoId]){
      let anim=gsap.to(span[videoId],{
        onStart:()=>{
          gsap.to(videoDivRef.current[videoId],{
            width: screen.width < 650 ? "10vw":"4vw", 
            });
        },
        onUpdate:()=>{
          let progress= Math.ceil(anim.progress()*100);

          if(progress != currentprogress){
            currentprogress=progress; 

            gsap.to(span[videoId],{
              width:`${currentprogress}%`,
              backgroundColor:"white",
            })
          }
        },

        onComplete : ()=>{
          if(isPlaying){
            gsap.to(videoDivRef.current[videoId],{
              width:"12px"
            })
            gsap.to(span[videoId],{
              backgroundColor:"#afafaf"
            })
          }
          }
      })
      const animupdate = () =>{
        anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration
      )
    }
    if(isPlaying){
      gsap.ticker.add(animupdate)
    }
    else{
      gsap.ticker.remove(animupdate)
    }
    }
  },[videoId,startPlay])

  useEffect(()=>{
    if(metaloadedData.length > 3){
      if(!isPlaying){
        videoRef.current[videoId].pause();
      }
      else{
        startPlay && videoRef.current[videoId].play();
      }
    }
  },[videoId,startPlay,isPlaying,metaloadedData])

  const handleLoadedMetaData = (i, e) => setmetaLoadedData((pre) => [...pre, e]);
  const handleprocess =(type,index)=>{
switch (type){
  case "video-end":
    setVideo((prevVideo)=>({...prevVideo,isEnd:true,videoId:index+1}))
    break;
  case "video-last":
    setVideo((prevVideo)=>({...prevVideo,isLastVideo:true}))
    break;
  case "resetvideo":
    setVideo((prevVideo)=>({...prevVideo,isLastVideo:false,videoId:0}));
    break;
  case "playing":
    setVideo((prevVideo)=>({...prevVideo,isPlaying:true}))
    break;
  case "pause":
    setVideo((prevVideo)=>({...prevVideo,isPlaying:false}))
    break;
  case "click":
    setVideo((prevVideo)=>({...prevVideo,isPlaying:true,videoId:index,startPlay:true}))
    break;
  default :
     return video;
}
  }
  return (
    <>
    <div className="flex items-center w-full h-[90vh] mt-10">
      {hightlightsSlides.map((items,index)=>(
        <>
<div key={index} id="slider" className="rounded-3xl lg:mr-9 bg-black relative h-full">
<div className="absolute top-12 left-4 z-10">
      {items.textLists.map((itemsdata)=>(
        <>
        <div className="md:text-2xl text-xl font-medium">{itemsdata}</div>
        </>
      ))}
    </div>
  <div className="video-carousel_container lg:rounded-3xl w-full h-full overflow-hidden">

    {/* <video> tag, the preload attribute determines how much of the video data should be loaded before the user starts playing the video

    value of preload : 
    auto : browser determines how much of the video should be preloaded. The browser might preload the entire video or just a portion of it, depending on factors such as available bandwidth and device capabilities

    preload : entire video should be preloaded before the user start play

    metaload : this value indicates that only metadata about the video (such as duration, dimensions, etc.) should be preloaded before video get start.

    none : This is the default value. It means that the browser should not preload the video
     */}
    <video className={`pointer-events-none w-full h-full ${items.id === 2 && "translate-x-38"
                  } ${items.id === 1 ? "object-cover":"object-fill"}`} id="video" muted playsInline={true} ref={(el)=> (videoRef.current[index]=el)} onPlay={()=>{
      setVideo((prevvideo)=>({...prevvideo,isPlaying:true}))
    }} onEnded={() =>
     index !== 3
        ? handleprocess("video-end", index)
        : handleprocess("video-last")
    } onLoadedMetadata={(e) => handleLoadedMetaData(index, e)}>

    {/* preload="auto" */}
      <source src={items.video} type="video/mp4"></source>
    </video>
  </div>
</div>
        </>
      ))}
    </div>
       <div className="relative flex-center mt-10 sm:px-10 px-5">
        <div className="flex-center py-5 px-10 bg-gray-300 backdrop-blur-0 rounded-full">
          {hightlightsSlides.map((_,i)=>(
<span key={i} ref={(el)=>(videoDivRef.current[i]=el)} className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer" 
onClick={()=>{
    videoRef.current.map((items,index)=>{
      // if(isPlaying){
        setVideo((prevVideo)=>({prevVideo,isLastVideo:false}))
        if(index === videoId){
          items.currentTime=0;
          items.pause();
          videoDivRef.current[index].style.width="12px";
          videoSpanRef.current[index].style.width="0%";
          videoSpanRef.current[index].style.backgroundColor="#afafaf";
        }
      // }
    })
    handleprocess("click",i);
  }}>
  <span key={i} ref={(el)=>(videoSpanRef.current[i]=el)} className="absolute h-full rounded-full"></span>
</span>
          ))}
          
        </div>
        <div className="control-btn cursor-pointer">
          <img src={isLastVideo ? replayImg : isPlaying ? pauseImg : playImg} alt={isLastVideo ? "reply":isPlaying ? "play":"pause"}
          onClick={isLastVideo ? ()=>{handleprocess("resetvideo")}: !isPlaying ? ()=>{handleprocess("playing")}:()=>{handleprocess("pause")}} className="min-w-6"
          />
        </div>
      </div>
    </>
  )
}

export default Videocarousel;