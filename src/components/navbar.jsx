import {useState} from 'react';
import { useGSAP } from '@gsap/react'; 
import gsap from "gsap";
import appleimage from "../../public/assets/images/apple.svg";
import searchimage from "../../public/assets/images/search.svg";
import bagimage from "../../public/assets/images/bag.svg";
import searchblackimage from "../../public/assets/images/icons8-search.svg"
const timelines=gsap.timeline({
  delay:0,
});
const Navbar = () => {
  const [searchbar,setSearchbar]=useState(null);
  useGSAP(()=>{
    if(searchbar==true){
      gsap.fromTo("#searchbar",{
        width:0,
        // height: 0,
        duration:2,
        color:"white",
        opacity:0,

      },{
        width:"auto",
        // duration:2,
        color:"black",
        opacity:1,
      })
      gsap.to(".searchimage",{
        opacity:0,
        duration:0.1,
        display:"none"
      })
    } 
    else if(searchbar==false){
      timelines.to("#searchbar",{
        duration:1,
        color:"black",
        opacity:1,
      })
      timelines.to("#searchbar",{
        width:"0px",
        color:"white",
        opacity:0,
      })
      timelines.to(".searchimage",{
        opacity:1,
          duration:0,
          display:"block"
        })
    }
  },[searchbar])
  return (
  <>
  <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
    <navbar className="flex w-full screen-max-width gap-3">
      <img src={appleimage} alt="appleimage" width={16} height={22} className="cursor-pointer"></img>
      <div className={`flex items-center justify-center flex-1 max-sm:hidden`}>
        {
          ["Store","Mac","IPhone","Support"].map((items,index)=>{
            return (
              <>
              <div className="px-5 cursor-pointer text-gray-200 font-normal text-sm hover:text-white hover:font-fontcustom" key={index}>{items}</div>
              </>
            )
          })
        }
      </div>
      <div>

      </div>
      <div className="flex items-baseline gap-x-9 max-sm:justify-end max-sm:flex-1">
      <div className={`${(searchbar==null) ? "invisible":"visible"} ${(searchbar==null ) ? "hidden":"flex"} bg-white rounded-md px-2 py-0.2`} id='searchbar'>
          <input className='font-light rounded-md text-black outline-0 bg-transparent w-full'></input>
          <img src={searchblackimage} width={18} height={24} alt="searchimage" className="cursor-pointer" onClick={()=>{
          setSearchbar(false);
        }}></img>
        </div>
      <><img src={searchimage} width={18} height={24} alt="searchimage" className={`cursor-pointer $ searchimage`} onClick={()=>{
        // {searchbar ? "hidden":"block"}
          setSearchbar(true);
        }}></img></>
        
        <>
        {/* <div className={!searchbar?"hidden":"flex"}> */}
        {/* </div> */}
        </>
        <img src={bagimage} width={18} height={24} alt="bagimage" className="cursor-pointer"></img>
      </div>
    </navbar>
  </header>
  </>
  )
}

export default Navbar