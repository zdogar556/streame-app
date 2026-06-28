import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getTrendingMovies } from '../movieApi'
import TrendingMovie from '../Pages/TrendingMovie'
import TopRatedMovie from '../Pages/TopRatedMovie'
import InTheaters from '../Pages/InTheaters'
import PopularMovies from '../Pages/PopularMovies'
import HerorSection from '../Pages/HerorSection'
import BollyWoodMovies from '../Pages/BollyWoodMovies'
import TopTVShow from '../Pages/TopTVShow'




const Home = () => {
  
  return (
<div className='min-h-screen  min-w-screen bg-black text-white  '>
  <div className='bg-black p-4' >
    <HerorSection />
  </div>
  <div className='mt-8 bg-black p-4'>
    <TrendingMovie />
  </div>
  <div className='mt-8 bg-black p-4' >
    <PopularMovies />
  </div>
  <div className='mt-8 bg-black p-4' >
    <TopRatedMovie />
  </div>
  <div className='mt-8 bg-black p-4'>
    <InTheaters />
  </div>
  <div className='mt-8 bg-black p-4'>
    <BollyWoodMovies />
  </div>
  <div className='mt-8 bg-black p-4'>
    <TopTVShow />
  </div>
</div>
  )
}

export default Home
