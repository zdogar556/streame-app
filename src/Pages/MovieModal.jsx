import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import {Play} from "lucide-react";
import { Plus } from "lucide-react";
import { getMovieDetails, getMovieCredits, getMovieImages , getMovieVideos } from "../movieApi";

const MovieModal = ({ movieId, isOpen, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [images, setImages] = useState([]);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    setMovie(null);
    setCast([]);

    // Get Movie Details
    getMovieDetails(movieId)
      .then((res) => {
        console.log(res.data);
        setMovie(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Get Movie Cast
    getMovieCredits(movieId)
      .then((res) => {
        console.log(res.data.cast);
        setCast(res.data.cast);
      })
      .catch((error) => {
        console.log(error);
      });

      // Get Movie Images
      getMovieImages(movieId)
      .then((res)=>{
        console.log("images", res.data.backdrops);
        setImages(res.data);
      })
      .catch((error)=>{
        console.log(error);
      });

      // Get Movie Trailer
      getMovieVideos(movieId)
      .then((res) => {
      // console.log( "videos",  res.data.results);
      const trailer = res.data.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
       );
      setTrailer(trailer);
      })
      .catch((error)=>{
        console.log(error);
      });

  }, [movieId, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 text-white w-[90%] max-w-4xl rounded-xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {movie && (
          <>
            {/* Backdrop */}
            <div className="relative">
               
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                 <button
                  className="bg-red-600 w-12 h-12 px-3 py-2 rounded-full" >
                  <Play className=" fill-white stroke-white"  />
                  </button>
                 <button className="bg-gray-600 w-12 h-12 px-3 py-2 rounded-full" >
                  <Plus /></button>
              </div>
              <button
                className="absolute top-4 right-4 bg-black p-2 rounded-full"
                onClick={onClose}
              >
                <X />
              </button>
            </div>

            {/* Movie Information */}
            <div className="p-6">
                
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <p>{movie.tagline}</p>

              <div className="flex gap-4 mt-3 text-gray-400">
                <p>
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "N/A"}
                </p>

                <p className="text-red-500 font-semibold">⭐ {Math.round(movie.vote_average * 10)}% Match</p>

                <p>
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </p> 
                <p>{movie.status}</p>
                
              </div>

              <p className="mt-5">{movie.overview}</p>

              {/* Genres */}
              <div className="flex gap-2 flex-wrap mt-5">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-800 px-3 py-1 rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Cast */}
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Cast</h2>

              <div className="flex gap-4 overflow-x-auto scrollbar-hide  ">
                {cast.map((actor) => (
                  <div 
                  key={actor.id} 
                  className="min-w-[120px]">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : "https://via.placeholder.com/185x278?text=No+Image"
                      }
                      alt={actor.name}
                      className="w-full h-40 object-cover rounded-lg"
                    />

                    <h3 className="mt-2 text-sm">{actor.name}</h3>

                    <p className="text-xs text-gray-400">
                      {actor.character}
                    </p>
                  </div>
                ))}  
              </div>
              {/* {trailer  */}
              <h2>Trailer</h2>
              <div>
                {trailer && (
                  <iframe
                   width="100%"
                     height="315"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  )}
              </div>


              {/* Images */}
                <h2 className="text-2xl font-bold mt-8 mb-4">Images</h2>
                <div className="flex gap-4  overflow-x-auto scrollbar-hide">
                  {
                  images.backdrops.map((image) => (
                    <div 
                    key={image.file_path}
                    className="min-w-[220px] h-36 mb-2  bg-gray-900 border border-gray-800 rounded-xl hover:border-red-600"
                    >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                      alt={movie.title}
                      className="w-full h-24 object-cover rounded-lg mt-4 mb-2"
                    />
                    </div>
                    
                  ))
                }
                </div>
                </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieModal;