import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { getPopularMovies } from '../movieApi'
import MovieModal from './MovieModal'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PopularMovies = () => {
      const [movies, setMovies] = useState([]);
      const [selectedMovie, setSelectedMovie] = useState(null);
      const [isOpen, setIsOpen] = useState(false);

      const scrollRef=useRef(null)

      const moveRight=()=>{
        scrollRef.current?.scrollBy({
          left: 500,
          behavior: 'smooth'
        })
      }
      const moveLeft=()=>{
        scrollRef.current?.scrollBy({
          left: -500,
          behavior: 'smooth'
        })
      }
    
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
        <div className=" mt-8 " >
          <div className='flex gap-2'>
          <div >
        <h1 className='text-xl font-bold text-white'>Popular Movies</h1>
        <p
        className='text-gray-400 mt-2 text-sm'
        >
          Most-watched movies this week</p>
      </div>

      <div className="flex items-center gap-2">
        <button
        onClick={moveLeft}
        className="w-8 h-8 rounded-full bg-[#08080cb3] text-white flex items-center justify-center hover:bg-gray-950 border"
        >
          <FaChevronLeft />
        </button>
        <button
        onClick={moveRight}
        className="w-8 h-8 rounded-full bg-[#08080cb3] text-white flex items-center justify-center hover:bg-gray-950 border"
        >
          <FaChevronRight />
        </button>
      </div>
          </div>
        
      <div
      ref={scrollRef}
      className="flex overflow-x-auto gap-4 scrollbar-hide mt-3" 
      >
        {
          movies.map((movie) => (
            <div
            key={movie.id}
            className="min-w-[180px] cursor-pointer"
            onClick={() => {
            setSelectedMovie(movie.id);
            setIsOpen(true);
  }}
>
              <img 
              className='w-[180px] h-72 object-cover rounded-xl bg-gray-800'
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
      <MovieModal
      movieId={selectedMovie}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
/>
    </div>
    
  )
}

export default PopularMovies
