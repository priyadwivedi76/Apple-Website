import React,{useEffect, useState} from 'react'
import gsap from 'gsap'
import {smallHeroVideo,heroVideo} from '../utils'
import {useGSAP} from '@gsap/react'
const Hero = () => {
  const[videoSrc,setVideoSrc]=useState(window.innerWidth < 700 ? smallHeroVideo : heroVideo)

  useGSAP(()=>{
    gsap.to('.hero-title',{
      opacity:1,
      delay:1.5,
    },[])
    gsap.to('#cta',{
      opacity:1,
      delay:2,
      y:-50
    })
  })

  const handleVideoSrc=()=>{
    if(window.innerWidth<700){
      setVideoSrc(smallHeroVideo)
    }else{
      setVideoSrc(heroVideo)
    }
  }

  useEffect(()=>{
    window.addEventListener('resize',handleVideoSrc)

    return ()=>{
      window.removeEventListener('resize',handleVideoSrc)
    }
  },[])
  return (
    <section className='w-full nav-height bg-black relative'>
        <div className='h-5/6 flex-center flex-col w-full'>
          <p className='hero-title'>iPhone 15 max</p>
          <div className='md:w-10/12 w-9/12'>
            <video className='pointer-event-none' autoPlay muted playsInline={true} key={videoSrc}>
              <source src={videoSrc} type='video/mp4'></source>
            </video>
          </div>
        </div>
        <div id='cta' className='flex flex-col opacity-0 items-center translate-y-20'>
          <a href='#Highlight' className='btn'>Buy</a>
          <p className='font-normal'>From $199/month or $999</p>
        </div>
    </section>
  )
}

export default Hero
