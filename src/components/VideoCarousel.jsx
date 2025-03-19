import React, { useEffect, useRef, useState } from 'react'
import {hightlightsSlides} from "../constants"
import { replayImg } from '../utils'
const VideoCarousel = () => {
  const videoRef = useRef([])
  const videoSpanRef = useRef([])
  const videoDivRef = useRef([])

  const [video,setVideo]=useState({
    isPlaying:false,
    isEnd:false,
    isStart:false,
    videoId:0,
    isLastVideo:false,
  })

  const [loadedData,SetloadedData]=useState([]);

  const {isPlaying,isEnd,isStart,videoId,isLastVideo}=video;

  useEffect(()=>{
    if(loadedData.length>3){
      if(!isPlaying){
        videoRef.current[videoId].pause();
      }else{
        isStart && videoRef.current[videoId].play();
      }
    }
  },[isStart,videoId,isPlaying,loadedData])

  // useEffect(()=>{
  //   const current=0;
  //   const span=videoSpanRef.current;

  //   if(span(videoId)){
  //     let anim=gsap.to(span[videoId],{
  //       onupdate:()=>{

  //       },
  //       onComplete:()=>{

  //       }
  //     })
  //   }
  // },[isStart,videoId])
  return (
   <>
   <div className='flex items-center'>
    {hightlightsSlides.map((highlight,i)=>(
      <div key={highlight.id} id='slider' className='sm:pr-20 pr-10'>
        <div className='video-carousel_container'>
          <div className='h-full w-full flex-center rounded-3xl overflow-hidden bg-black'>
            <video id='video' playsInline={true} preload='auto' muted ref={(el)=>videoRef.current[i]=el} onPlay={()=>setVideo((preview)=>({...preview,isPlaying:true}))}>
              <source src={highlight.src} type='video/mp4'/>
            </video>
          </div>

          <div className='absolute top-12 left-[5%] z-10'>
            {highlight.textLists.map((text)=>(
              <p key={text} className='md:text-2xl text-xl font-medium'>{text}</p>
            ))}
          </div>
        </div>
      </div>
    ))}
   </div>

   <div className='relative flex-center mt-10'>
    <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full '>
      {videoRef.current.map((_,i)=>{
        <span key={i} ref={(el)=>(videoDivRef.current[i]=el)} className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'>
         <span className='absolute h-full w-full rounded-full' ref={(el)=>(videoDivRef.current[i]=el)} ></span>
        </span>
      })}
    </div>
   </div>

   <button className='control-btn'>
    <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'} onClick={isLastVideo ? ()=>handleProcess('video-reset'):'none'}
    />
   </button>
   </>
  )
}

export default VideoCarousel