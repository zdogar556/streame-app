import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getTrendingMovies } from '../movieApi'

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
            className="h-[500px] w-full bg-cover bg-center rounded-xl object-cover"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            }}
          >
            <div className="w-full h-full bg-black bg-opacity-50 flex justify-between  ">
              <div className="w-1/2 p-8 mt-60 ">
                <h1 className="text-3xl font-bold text-white mt-3">{movie.title}</h1>
              <p className="text-gray-300 mt-4">{movie.overview}</p>
              <div className="flex gap-4 mt-4 text-white">
                <button className="bg-red-700 px-4 py-2 rounded-full w-48" >Watch</button> 
                <button className='bg-black px-2 rounded-full' >More Info</button>
                <button className='bg-gray-600 px-2 rounded-full'>i More Info</button>
              </div>
              
              </div>
               {/* Indicators */}
        <div className="flex gap-2 mt-8 mr-2 w-48 ">
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
            </div>
          </div>


  )
}

export default HerorSection
