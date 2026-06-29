import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getTrendingMovies } from '../movieApi'


const Top10Movies = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
useEffect(() => {
    getTrendingMovies()
      .then((res) => {
        setTrendingMovies(res.data.results.slice(0, 10));
    })
    .catch((error) => {
        console.log(error);
    })
},[])

  return (
    <div className=" mt-8 " >
      <h1 className='text-xl font-bold text-white'>Top 10 Movies Today</h1>
      <p>Most popular movies right now</p>
    <div
      className="flex overflow-x-auto gap-6 scrollbar-hide mt-3 " 
      >
        {
          trendingMovies.map((movie, index) => (
            <div 
            key={movie.id}
            className='relative min-w-[180px]  '
            >
            <span
              className='absolute -left-5 bottom-0 text-[130px] font-extrabold text-white opacity-80 leading-none [-webkit-text-stroke:2px_black] z-0   '
              >{index+1}</span>
              <img 
              className='w-[180] h-72 object-cover rounded-lg'
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <h2
              className='text-white mt-2 truncate'
              >{movie.title}</h2>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Top10Movies
