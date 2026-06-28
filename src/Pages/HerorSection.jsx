import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getTrendingMovies } from '../movieApi'

const HerorSection = () => {
    const [movies, setMovies] = useState([]);
  useEffect(() => {
    getTrendingMovies()
      .then((res) => {
        console.log(res.data.results.slice(0, 4));

        setMovies(res.data.results.slice(0, 4));

      })

      .catch((error) => {
    })
    
  }, []);
  return (
    <div >
        <div>
    {
        movies.map((movie) => (

          <div
            key={movie.id}
            className="h-[500px] w-full bg-cover bg-center rounded-xl"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            }}
          >

            <div className="w-full h-full bg-black bg-opacity-50 flex flex-col  justify-end p-4 mb-10  ">
              <h1 className="text-3xl font-bold text-white mt-3">{movie.title}</h1>
              <p className="text-gray-400">{movie.overview}</p>
              <div className="flex gap-4 mt-4 text-white">
                <button className="bg-red-500 px-4 py-2 rounded-full w-48" >Watch</button> 
                <button>More Info</button>
                <button>i More Info</button>
              </div>
            </div>
          </div>
        ))
      }
  </div>
    </div>
  )
}

export default HerorSection
