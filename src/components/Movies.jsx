import React, { useEffect } from 'react'
import { useState } from 'react'
import { getPopularMovies } from '../movieApi'
import TrendingMovie from '../Pages/TrendingMovie';
import TopRatedMovie from '../Pages/TopRatedMovie';
import InTheaters from '../Pages/InTheaters';
import PopularMovies from '../Pages/PopularMovies';

const Movies = () => {


  return (
    <div className='min-h-screen  min-w-screen bg-black text-white px-8 ' >
      <div>
      <h1 className='text-4xl font-bold'>Movies</h1>
      <p
      className='text-gray-400 mt-2 text-semibold'
      >Browse all movies</p>
      </div>
      <div className='mt-8' >
        <TrendingMovie />
      </div>
      <div className='mt-8'>
        <h1 className='text-xl font-bold text-white'>Popular Movies</h1>
        <p
        className='text-gray-400 mt-2 text-sm'
        >
          Most Watch Right Now</p>
      </div>
      <div>
        <PopularMovies />
      </div>
      <div>
        <TopRatedMovie />
      </div>
      <div className='pb-8'>
        <InTheaters />
      </div>
      
    </div>
  )
}

export default Movies
