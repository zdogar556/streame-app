import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getPopularMovies } from '../movieApi'

const PopularMovies = () => {
      const [movies, setMovies] = useState([]);
    
     useEffect(() => {
    
        getPopularMovies()
          .then((res) => {
            console.log(res.data.results);
    
            setMovies(res.data.results);
    
          })
    
          .catch((error) => {
    
            console.log(error);
    
          });
    
    
      }, []);
  return (
    <div>
            <div
      className="flex overflow-x-auto gap-4 scrollbar-hide mt-3" 
      >
        {
          movies.map((movie) => (
            <div 
            key={movie.id}
            className='min-w-[180px]'
            >
              <img 
              className='w-[180] h-72 object-cover rounded-xl'
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <h2
              className='text-white mt-2 truncate'
              >{movie.title}</h2>
              <p
              className='text-gray-600 text-sm'
              >{movie.release_date? new Date(movie.release_date).getFullYear(): "N/A"}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PopularMovies
