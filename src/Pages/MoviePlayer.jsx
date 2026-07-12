import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { getMovieWatchProviders, getMovieDetails, getMovieCredits, getMovieImages } from '../movieApi'

const MoviePlayer = () => {

  const { id } = useParams();

  const [moiveProvider, setMoiveProvider] = useState([]);
  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);

  const servers = [
  {
    id: "cinemaos",
    name: "CinemaOS (Multi - no ads)",
    url: `https://cinemaos.live/movie/watch/${id}`
  },

];
const [currentServer, setCurrentServer] = useState(servers[0])
  

  useEffect(() => {
    getMovieWatchProviders(id)
    .then((res) => {
      
      console.log(res.data.results);
      setMoiveProvider(res.data.results);
    })
    .catch((error) => {
      console.log(error);
    })
    getMovieDetails(id)
          .then((res) => {
            console.log(res.data);
            setMovie(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        // Get Movie Cast
        getMovieCredits(id)
          .then((res) => {
            console.log(res.data.cast);
            setCast(res.data.cast);
          })
          .catch((error) => {
            console.log(error);
          });
    

  },[id])

  return (
    <div className='min-h-screen  min-w-screen bg-black text-white p-2 '>

      <div>
        
      <h1>Movie Player</h1>

      <iframe
      src={currentServer.url}
      width="100%"
      height="600"
      allowFullScreen
      />

      {servers.map((server) => (
      <button
      key={server.id}
      onClick={() => setCurrentServer(server)}
       >
      {server.name}
    </button>
      ))}
      </div>
      
      <div>
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
              <p className="mt-5">{movie.overview}</p>
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
      </div>

    </div>
  )
}

export default MoviePlayer
