import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getTrendingMovies } from '../movieApi'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HerorSection = () => {
    const [movies, setMovies] = useState([]);
    const [currentIndex,setCurrentIndex] = useState(0);
  useEffect(() => {
    getTrendingMovies()
      .then((res) => {
        console.log(res.data.results.slice(0, 5));

        setMovies(res.data.results.slice(0, 5));

      })

      .catch((error) => {
    })
    
  }, []);
  // Audo Slide
useEffect(() => {
  if(movies.length===0) return;

  const interval=setInterval(()=>{
    setCurrentIndex((prev)=>(prev+1)% movies.length)
  },60000);

  return ()=>clearInterval(interval);
},[movies]);

if(movies.length===0){
  return <div
   className="h-[500px] flex justify-center items-center text-white"
   >Loading...</div>
}
   
const movie=movies[currentIndex];

  return (
          <div
            key={movie.id}
            className=" w-full h-[400px] md:h-[500px] lg:h-[650px]  bg-cover bg-center rounded-xl mt-3  "
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            }}
          >
            <div 
            className="w-full h-full bg-black/60 bg-opacity-50 flex flex-col lg:flex-row justify-end lg:justify-between">
              <div 
              className="w-full lg:w-1/2  flex flex-col justify-end p-4 sm:p-8 lg:p-10  ">
              <span
              className="text-md font-semibold text-red-500">
                ★ Trending #{currentIndex+1}
                </span>
                <h1 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2 ">
                  {movie.title}
                  </h1>
              <p 
              className="text-gray-300 mt-2 text-sm sm:text-base line-clamp-3 lg:line-clamp-none">
                {movie.overview}
                </p>
              <div 
              className="flex flex-wrap gap-3 mt-5 text-white">
                <button 
                className="bg-red-700 px-6 py-3 rounded-full lg:w-48 " >
                  Watch
                  </button> 
                <button
                 className='bg-black px-6  py-3 rounded-full' >
                  More Info
                  </button>
                <button 
                className='bg-gray-600 px-6  py-3 rounded-full'>
                  i More Info
                  </button>
              </div>              
              </div>
              {/* left Side */}
               {/* Indicators */}
               <div
               className="w-full lg:w-1/2 flex  lg:flex-col flex-row lg:justify-between justify-evenly  items-end p-4  ">
                <div 
                className="flex gap-2 mt-4 lg:mt-8 mr-2 md:flex-wrap justify-end ">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-3 rounded-full transition-all ${
                currentIndex === index
                  ? "bg-red-500 w-8"
                  : "bg-gray-400 w-8"
              }`}
            />
          ))}
        </div>
        <div 
        className="flex gap-2 justify-end  mr-4 w-48 mb-8 ">
          <button
          className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-gray-600 text-white flex items-center justify-center hover:bg-gray-700"
          onClick={()=> setCurrentIndex((prev)=>(prev-1 +movies.length)% movies.length)}
          >
            <FaChevronLeft />
          </button>
          <button
          className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-gray-600 text-white flex items-center justify-center hover:bg-gray-700"
          onClick={()=> setCurrentIndex((prev)=>(prev+1)% movies.length)}
          >
            <FaChevronRight />
            </button>
        </div>
               </div>
            </div>
          </div>


  )
}

export default HerorSection
