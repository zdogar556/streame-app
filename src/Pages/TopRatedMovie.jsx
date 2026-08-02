import React from 'react'
import { useState } from 'react'
import { getTopRatedMovies } from '../movieApi'
import { useEffect, useRef} from 'react'
import MovieModal from './MovieModal'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TopRatedMovie = () => {
    const [movies, setMovies] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

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
        getTopRatedMovies()
          .then((res) => {
            setMovies(res.data.results);
        })
        .catch((error) => {
            console.log(error);
        })
    })
  return (
    <div className=" mt-8 " >
      <div className="flex gap-2" >
        <div >
        <h1 className='text-xl font-bold text-white'>Top Rated</h1>
        <p
        className='text-gray-400 mt-2 text-sm'
        >
          Highest rated of all time</p>
      </div>

      <div className="flex items-center gap-2">
        <button 
        onClick={moveLeft}
        className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center hover:bg-gray-700"> 
          <FaChevronLeft />
        </button>
        <button
        onClick={moveRight}
        className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center hover:bg-gray-700"
        >
          <FaChevronRight />
        </button>
      </div>
      </div>
        
    <div
      ref={scrollRef}
      className="flex overflow-x-auto gap-4 scrollbar-hide mt-3 " 
      >
        {
          movies.map((movie) => (
            <div 
            key={movie.id}
            className='min-w-[180px]  cursor-pointer '
            onClick={()=>{
              setSelectedMovie(movie.id);
              setIsOpen(true);
            }}
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
      <MovieModal movieId={selectedMovie} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export default TopRatedMovie
