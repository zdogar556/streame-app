import React, { useEffect } from 'react'
import { useState } from 'react'
import { getTVDetails, getTVCredits, getTVImages, getTVVideos } from '../movieApi'
import { X } from "lucide-react";
import {Play} from "lucide-react";
import { Plus } from "lucide-react";
import { useNavigate } from 'react-router-dom';


const TvShowModal = ({tvShowId , isOpen, onClose}) => {
  const [tvShow, setTvShow] = useState(null);
  const [cast , setCast] = useState([]);
  const [images , setImages] = useState([]);
  const [trailer , setTrailer] = useState(null);

  const navigate = useNavigate();

  useEffect(()=>{
    if(!isOpen) return;
    setTvShow(null);
    setCast([]);
    setImages([]);
    setTrailer(null);

    // Get TVShow Details
    getTVDetails(tvShowId)
    .then((res) => {
      
      setTvShow(res.data);
    })
    .catch((error) => {
      console.log(error);
    })

    // Get TVShow Cast
    getTVCredits(tvShowId)
    .then((res) => {

      setCast(res.data.cast);
    })
    .catch((error) => {
      console.log(error);
    })

    // get TVShow Images

    getTVImages(tvShowId)
    .then((res) => {
      console.log("TV Show Images",res.data.backdrops);
      setImages(res.data.backdrops);
    })
    .catch((error) => {
      console.log(error);
    })

    // get TVShow Videos


    getTVVideos(tvShowId)
    .then((res) => {
      console.log("TVShow Vedio",res.data.results);
      const trailer = res.data.results.find((video) => video.type === "Trailer");
      setTrailer(trailer);
    })
    .catch((error) => {
      console.log(error);
    })
    
  },[tvShowId,isOpen])

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
        {tvShow && (
          <>
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/original/${tvShow.backdrop_path}`}
              alt={tvShow.name}
              className="w-full h-72 object-cover"
            />
              <div className="absolute bottom-4 left-4 flex gap-2">
                    <button
                    onClick={()=>{
                      navigate(`/watch/tv-show/${tvShowId}`);
                    }}
                    className="bg-red-600 w-12 h-12 px-3 py-2 rounded-full" >
                    <Play 
                    className=" fill-white stroke-white"  />
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
    
            <div className="p-8">
              <h1 className="text-3xl font-bold">{tvShow.name}</h1>

              {/* Details */}
              <div className="flex gap-4 mt-3 text-gray-400"> 
                <p className="text-red-500 font-semibold">
                {Math.round(tvShow.vote_average * 10) }% Match
              </p>
              <p>
                  {tvShow.first_air_date
                    ? new Date(tvShow.first_air_date).getFullYear()
                    : "N/A"}
                </p>

                <p>
                  {tvShow.number_of_seasons} Seasons
                  
                  </p>
                <p>
                  
                  {tvShow.number_of_episodes} Episodes
                  </p>
              </div>

              
              {/* Genres */}
              <div className="flex gap-2 flex-wrap mt-2">
                {
                tvShow.genres.map((genre) => (
                  <span key={genre.id}
                  className="bg-gray-800 px-3 py-1 rounded-full"
                  >{genre.name}</span>
                ))
                }
              </div>

              {/* Production Companies */}
              <div  className="flex gap-2 flex-wrap mt-2">
                {
                tvShow.production_companies.map((company) => (
                  <div
                  key={company.id}>
                    <img src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`} alt={company.name} 
                    className='w-20 h-16 rounded-xl'
                    />
                  </div>
                ))
                }
              </div>
              <p className="mt-4">{tvShow.overview}</p>

                {/* Cast */}
              <div className="mt-4">
                <h2 className="text-xl font-bold">Cast</h2>

                <div className="flex gap-4 overflow-x-auto scrollbar-hide  ">
                  {cast.map((actor) => (
                    <div key={actor.id}
                    className="min-w-[120px]"
                    >
                      <img
                        src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : "https://via.placeholder.com/185x278?text=No+Image"
                      }
                      alt={actor.name}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="mt-2">{actor.name}</div>
                    </div>
                  ))}
                </div>

                
                {/* trailer */}
                  <h2 className="text-2xl font-bold mt-8 mb-4">Vedio</h2>
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
              

              {/* images */}
            
                <h2 className="text-2xl font-bold mt-8 mb-4">Images</h2>
                <div className="flex gap-4  overflow-x-auto scrollbar-hide">
                  {images.map((image) => (
                    <img
                      key={image.file_path}
                      src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                      alt={image.file_path}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
                </div>
              

                </div>
              </div>
            </div>

            
          </>
        )
          
        }

      </div>
      
    </div>
  )
}

export default TvShowModal
