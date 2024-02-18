import React from 'react';
import {splide, splideSlide } from '@splidejs/splide';
import '@splidejs/splide/css';
import { topPicks } from '../Data/data';
const TopPicks = () => {
    return (
        <>
        <h1 className='text-green-600 font-bold text-2xl text-center py-2'>3D Models</h1>
        <div className='hidden lg:flex max-w[1520px] m-auto py-2 px=2'>
            <splide options={{perPage: 4, gap: "0.5rem"}}>
           {
            topPicks.map((item)=>{
                return(
                    <splideSlide>
                    <div className='rounded 3xl relative'>
                        <div className='absolute w-full h-full bg-black/50 rounded-3xl text-white'>
                           <p className='px-2'>{item.title}</p> 
                           <button className='border-dotted border-white text-white mx-2 absolute bottom-4'>Add to cart</button>                        </div>
                        <img className='h-[200px] w-full object-cover rounded-3xl cursor-pointer hover:scale-105 ease-out duration-300'
                        src={item.img}/>
                    </div>
                    </splideSlide>
                )
               })
           } 
           </splide>
        </div>
        </>
    )
}

export default TopPicks