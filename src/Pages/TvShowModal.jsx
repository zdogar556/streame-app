import React, { useEffect } from 'react'
import { useState } from 'react'
import { getTVDetails, getTVCredits, getTVImages, getTVVideos } from '../movieApi'
import { X } from "lucide-react";
import {Play} from "lucide-react";
import { Plus } from "lucide-react";


const TvShowModal = ({tvShowId , isOpen, onClose}) => {
  const [tvShow, setTvShow] = useState(null);
  const [cast , setCast] = useState([]);
  const [images , setImages] = useState([]);
  const [trailer , setTrailer] = useState(null);

  useEffect(()=>{
    if(!isOpen) return;
    setTvShow(null);
    setCast([]);
    setImages([]);
    setTrailer(null);

    getTVDetails(tvShowId)
    .then((res) => {
      console.log(res.data);
      setTvShow(res.data);
    })
    .catch((error) => {
      console.log(error);
    })
    getTVCredits(tvShowId)
    .then((res) => {
      setCast(res.data.cast);
    })
    .catch((error) => {
      console.log(error);
    })
    getTVImages(tvShowId)
    .then((res) => {
      setImages(res.data.backdrops);
    })
    .catch((error) => {
      console.log(error);
    })
    getTVVideos(tvShowId)
    .then((res) => {
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
              className="w-full"
            />
              <div className="absolute bottom-4 left-4 flex gap-2">
                    <button
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
              <p className="mt-4">{tvShow.overview}</p>
              <div className="mt-4">
                <h2 className="text-xl font-bold">Cast</h2>
                <div className="flex gap-2">
                  {cast.map((actor) => (
                    <div key={actor.id}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                        alt={actor.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div className="mt-2">{actor.name}</div>
                    </div>
                  ))}
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
