import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { X } from "lucide-react";


const MyList = () => {
  const navigate=useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("myList")) || [];
    setMovies(savedMovies); 
  }, []);



  const removeMovie= (id) =>{
    const updateMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updateMovies);
    localStorage.setItem("myList", JSON.stringify(updateMovies));
  }


  return (
    <div className='h-screen  min-w-screen bg-black  text-white px-8  '>
      <div className="p-2">
        <h1 className='text-3xl font-bold'>
        My List
      </h1>
      </div>
      {/* empty state */}
      {movies.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
        <p className='text-5xl'>🎬</p>
        <p className='text-xl font-bold mt-2'>Nothing saved yet</p>
        <p className='text-sm mt-2 text-gray-400'>Add movies and shows from the + My List button</p>
        <button
        onClick={()=>navigate("/")}
        className='bg-red-600 px-4 py-2 mt-4 rounded-full'>
          Browse Titles</button>
      </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-8">
        {movies.map((movie) => (
          <div
          key={movie.id}
          className="group relative "
          >
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}
            className="w-full h-72 object-cover rounded-lg "
            />
            <h2 className="font-semibold mt-2 truncate">
                {movie.title}
              </h2>

              <button
                onClick={() => removeMovie(movie.id)}
                className="absolute top-2 right-2 bg-black p-2 rounded-full"
              >
                <X />
              </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyList
