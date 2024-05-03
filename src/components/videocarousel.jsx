// import React from 'react'
import {hightlightsSlides} from "../constants/index";
const Videocarousel = () => {
  return (
    <>
    <div className="flex items-center w-full h-[75vh]">
      {hightlightsSlides.map((items,index)=>(
        <>
<div key={index} id="slider" className="rounded-3xl bg-black mr-9 relative h-full">
<div className="absolute top-12 left-4 z-10">
      {items.textLists.map((itemsdata)=>(
        <>
        <div className="md:text-2xl text-xl font-medium">{itemsdata}</div>
        </>
      ))}
    </div>
  <div className="video-carousel_container rounded-3xl w-full h-full overflow-hidden">

    {/* <video> tag, the preload attribute determines how much of the video data should be loaded before the user starts playing the video

    value of preload : 
    auto : browser determines how much of the video should be preloaded. The browser might preload the entire video or just a portion of it, depending on factors such as available bandwidth and device capabilities

    preload : entire video should be preloaded before the user start play

    metaload : this value indicates that only metadata about the video (such as duration, dimensions, etc.) should be preloaded before video get start.

    none : This is the default value. It means that the browser should not preload the video
     */}
    <video className="pointer-events-none w-full h-full object-fill lg:object-cover" id="video" muted playsInline={true} autoPlay>
    {/* preload="auto" */}
      <source src={items.video} type="video/mp4"></source>
    </video>
  </div>
</div>
        </>
      ))}
    </div>
    </>
  )
}

export default Videocarousel;