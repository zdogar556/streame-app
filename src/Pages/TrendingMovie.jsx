import React, { useEffect, useState } from 'react'
import { getTrendingMovies } from '../movieApi';

const TrendingMovie = () => {
const [movies, setMovies] = useState([]);
useEffect(() => {
    getTrendingMovies()
      .then((res) => {
        setMovies(res.data.results);
    })
    .catch((error) => {
        console.log(error);
    })
},[])
  return (
    <div className=" mt-8 " >
      <h1 className='text-xl font-bold text-white'>Trending Movies</h1>
    <div
      className="flex overflow-x-auto gap-4 scrollbar-hide mt-3 " 
      >
        {
          movies.map((movie) => (
            <div 
            key={movie.id}
            className='min-w-[180px] 
             group relative  overflow-hidden cursor-pointer transition-all duration-300 
             hover:min-w-[260px]
             hover:-translate-y-8 hover:z-50   '
            >
              <img 
              className='w-[180px] h-72 object-cover rounded-xl group-hover:rounded-xl transition-all duration-300 group-hover:w-[260px] group-hover:h-[380px]'
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <div className="group-hover:hidden">
              <h2
              className='text-white mt-2 truncate '
              >{movie.title}</h2>
              <p 
              className='text-gray-600 text-sm  '>{movie.release_date? new Date(movie.release_date).getFullYear(): "N/A"}</p>                
              </div>
              {/* hover div */}
              <div className="absolute bottom-0 left-0 w-full bg-black/90 rounded-b-xl p-4 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <h2
              className='text-white mt-2 truncate'
              >{movie.title}</h2>
              <div className='flex gap-2 mt-2 text-white'>
                <span className='text-gray-600 text-sm'>
                  {movie.release_date? new Date(movie.release_date).getFullYear(): "N/A"}
                </span>
                <span className='text-green-600 text-sm'>
                  63% Match
                </span>
                <span className='text-red-600 px-2 text-sm  bg-gradient-to-tr from-red-600 to-black rounded-full' >
                  Movie
                </span>
              </div>
              <div className='flex gap-2 mt-2'>
                <button className='bg-red-600 py-2 px-4 rounded-full text-white text-sm '> ▶ Play</button>
                <button className='bg-gray-600 py-2 px-4 rounded-full text-white text-sm '>+ My List</button>
              </div>
              </div>
            </div>
            
          ))
        }
      </div>
    </div>
  )
}

export default TrendingMovie
