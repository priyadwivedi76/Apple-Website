import React from 'react'
import {appleImg,searchImg,bagImg} from '../utils'
import {navLists} from '../constants'
const NavBar = () => {
  return (
    <>
    <header className='w-full py-5 sm:px-10 px-5 flex items-center justify-between'>
        <nav className='flex w-full screen-max-width'>
            <img src={appleImg} width={18} height={18}/>
            <div className='flex flex-1 justify-center items-center max-sm:hidden'>
                {navLists.map((nav)=>(
                    <div key={nav} className='px-5 text-sm text-[#86868b] hover:text-white curson-pointer transition-all'>
                        {nav}
                    </div>
                ))}
            </div>
            <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1'>
                <img src={searchImg} alt='search' width={18} height={18}/>
                <img src={bagImg} alt='bag' width={18} height={18}/>
            </div>
        </nav>
    </header>
    </>
  )
}

export default NavBar