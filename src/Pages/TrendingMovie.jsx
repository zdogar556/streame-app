import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getTrendingMovies } from '../movieApi';
import MovieModal from './MovieModal';

const TrendingMovie = () => {
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
      <div className='flex gap-3 '>
        <h1 className='text-2xl font-bold text-white'>Trending Movies</h1>
      <div className="flex items-center gap-2" >
        <button
        // moveback
        onClick={moveLeft}
        className="w-8 h-8 rounded-full bg-[#08080cb3] text-white flex items-center justify-center hover:bg-gray-950 border"
        >
          <FaChevronLeft />
        </button>
        <button
        // moveforward
        onClick={moveRight}
        className="w-8 h-8  rounded-full bg-[#08080cb3] text-white flex items-center justify-center hover:bg-gray-950 border"
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
              setSelectedMovie(movie.id)
              setIsOpen(true)
             }
              }
            >
              <img 
              className='w-[180px] h-72 object-cover rounded-xl bg-gray-800 '
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <div className="group-hover:hidden">
              <h2
              className='text-white mt-2 truncate '
              >{movie.title}</h2>
              <p 
              className='text-gray-600 text-sm  '>{movie.release_date? new Date(movie.release_date).getFullYear(): "N/A"}</p>                
              </div>
              {/* hover div */}
              {/* <div className="absolute bottom-0 left-0 w-full bg-black/90 rounded-b-xl p-4 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
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
              </div> */}
            </div>
            
          ))
        }
      </div>
      <MovieModal movieId={selectedMovie} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export default TrendingMovie
