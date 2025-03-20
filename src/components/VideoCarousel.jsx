import React,{useEffect, useRef, useState} from 'react'
import {hightlightsSlides} from '../constants'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register the plugin
gsap.registerPlugin(ScrollTrigger);
import { pauseImg, playImg, replayImg } from '../utils';
const VideoCarousel = () => {
  // 3.initialise the useRef and the useState variable according to the conditions
  const videoRef=useRef([null, null, null,null]);
  const videoDivRef=useRef([]);
  const videoSpanRef=useRef([]);

  const [video,setVideo]=useState({
    isEnd:false,
    startPlay:false,
    videoId:0,
    isLastVideo:false,
    isPlaying:false
  })

  // 7.create useState for loading data
  const [loadedData,setLoadedData]=useState([]);

  // 4.Destructing
  const {isEnd,startPlay,videoId,isLastVideo,isPlaying}=video;

  //10.Animation for each video to start
  useEffect(()=>{
    gsap.to('#video',{
      scrollTrigger:{
        trigger:'#video',
        toggleActions:'restart none none none'
      },
      onComplete:()=>{
        setVideo((pre)=>({
          ...pre,
          startPlay:true,
          isPlaying:true,
        }))
      }
    })
  },[isEnd,videoId])

  useEffect(() => {
    if (videoRef.current[videoId]) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // 6.Deals with playing of the video
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId]?.pause();
      } else {
        startPlay && videoRef.current[videoId]?.play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // 5.useeffect:changes when the videoId changes 
  useEffect(()=>{
    const currentProgress=0;
    let span=videoSpanRef.current;

    if(span[videoId]){
      let anim=gsap.to(span[videoId],{
        onUpdate:()=>{

        },

        onComplete:()=>{

        }
      })
    }
  },[videoId,startPlay])


  // 9.switch case that manages various states of the image and their state must change after the condition are fulfilled
  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };

  //11.function to handle loaded data
  const handleLoadedMetaData=(i,e)=>{
    setLoadedData((pre)=>({...pre,e}))
  }
  return (
    <>
    <div className='flex items-center'>

      {/* 1.First map all the videos in the highlight section */}
      {hightlightsSlides.map((highlightSlide,i)=>(
        <div key={i} id='slider' className='sm:pr-20 pr-10'>
          <div className='video-carousel_container'>
            <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
              <video id='video' playsInline={true} preload='auto' muted ref={(el)=>(videoRef.current[i]=el)}  onPlay={() => { setVideo((prev) => ({ ...prev, isPlaying: true })) }} onLoadedMetadata={(e)=>handleLoadedMetaData(i,e)}>
                <source src={highlightSlide.video} type='video/mp4' />
              </video>
            </div>

            {/* 2.add paragraph and text */}
            <div className='absolute top-12 left-[5%] z-10'>
              {highlightSlide.textLists.map((text,i)=>(
                <p key={i} className='md:text-2xl text-xl font-medium'>
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* 8.create the buttons below the highlight section that demonstrates video */}
    <div className='relative flex-center mt-10'>
      <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
        {videoRef.current.map((_, i) => (
          <span
            key={i}
            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            ref={(el) => (videoDivRef.current[i] = el)}
          >
            <span
              className="absolute h-full w-full rounded-full"
              ref={(el) => (videoSpanRef.current[i] = el)}
            />
          </span>
        ))}
      </div>

      <button className='control-btn'>
        <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg } alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'} onClick={isLastVideo ? ()=>handleProcess('video-reset') : !isPlaying ? ()=> handleProcess('play') : ()=>handleProcess('pause')}/>
      </button>
    </div>
    </>
  )
}

export default VideoCarousel