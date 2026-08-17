import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMovieWatchProviders, getMovieDetails, getMovieCredits, getMovieImages } from '../movieApi'

const MoviePlayer = () => {

  const { id } = useParams();
  const navigate=useNavigate();

  const [moiveProvider, setMoiveProvider] = useState([]);
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  const [theaterMode,setTheaterMode]= useState(false);

  const playerRef = useRef(null);

  const servers = [
  {
    id: "cinemaos",
    name: "CinemaOS (Multi - no ads)",
    url: `https://cinemaos.live/movie/watch/${id}`
  },
  {
    id: "cinextream",
    name: "Cinextream (Multi - no ads)",
    url: `https://cinextream.net/api/embed/movie/${id}`

  },
  {
    id: "vidfast",
    name: "vidfast (Multi - no ads)",
    url: `https://vidfast.vc/movie/${id}`
  },
  {
    id: "yapgrid",
    name: "yapgrid (Multi - no ads)",
    url: `https://yapgrid.com/embed/movie/${id}?autoplay=1`
  },
  {
    id:"cinesrc",
    name: "CineSrc (Multi-ads)",
    url: `https://cinesrc.st/embed/movie/${id}`

  },

  {
    id :"peachify",
    name: "Peachify (Multi-ads)",
    url: `https://peachify.pro/embed/movie/${id}`
  },
  {
    id:"embedmaster",
    name: "EmbedMaster (Multi-ads)",
    url: `https://embedmaster.link/movie/${id}`
  },
  {
    id:"vidking",
    name: "VidKing (Multi-ads)",
    url: `https://www.vidking.net/embed/movie/${id}`
  }

];
const [currentServer, setCurrentServer] = useState(servers[0]);
  const [showSources,setShowSources]=useState(false);

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


  const handleFullScreen = () => {
  if (playerRef.current.requestFullscreen) {
    playerRef.current.requestFullscreen();
  } else if (playerRef.current.webkitRequestFullscreen) {
    playerRef.current.webkitRequestFullscreen();
  } else if (playerRef.current.msRequestFullscreen) {
    playerRef.current.msRequestFullscreen();
  }
};

  if (!movie) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      Loading...
    </div>
  );
}

  return (
    <div className='min-h-screen  min-w-screen bg-black text-white p-2 '>
      <h1>Movie Player</h1>
      <div>
      <button className='text-gray-400'
      onClick={()=>{
        navigate("/movies")
      }}
      >
       ← Back to Movies
      </button>
      </div>

      {/* Player button */}
      <div className='flex gap-2 justify-end p-2 bg-gray-800 h-10 border border-gray-800 rounded-lg'>
        {/* open new tab */}
        <button
        onClick={()=>
          window.open(currentServer.url,"_blank")}
        className='bg-black text-md px-4  rounded-full '
        >Open tab
        </button>
        {/* theater */}
        <button
        onClick={()=>setTheaterMode(!theaterMode)}
        className={`' px-4  rounded-full '
        ${theaterMode ? "text-red-600 bg-black " : "bg-black text-md "}`}

        >{theaterMode ? "Exit Theater" : "Theater"}</button>
        <button
        onClick={handleFullScreen}
        className='bg-black text-md px-4  rounded-full '
        >Fullscreen</button>
      </div>


      <div
  className={`mx-auto transition-all duration-300 ${
    theaterMode ? "max-w-screen-2xl" : "max-w-5xl"
  }`}
>
  <iframe
    ref={playerRef}
    src={currentServer.url}
    width="100%"
    height={theaterMode ? "800" : "600"}
    allowFullScreen
    title="Movie Player"
  />
</div>

      <div 
      className='mt-3 border border-gray-800 p-3 rounded-lg'
      >
        <button
        className='w-full px-4 py-2 rounded-md flex justify-between items-center'
        onClick={()=>setShowSources(!showSources)}
        >
          <div className='flex gap-2'>
            <span>Sources</span>
            <span>{currentServer.name}</span>
          </div>
        
        <span>{showSources ? "-" : "+"}</span>
        </button>

        {showSources && (
          <div 
          className='flex flex-col gap-2 mt-3  '
          >
            {servers.map((server) => (
      
      <button
        key={server.id}
        onClick={() => setCurrentServer(server)}
        className={`w-full justify-start items-start gap-2 flex
         ${currentServer.id === server.id ? 
          "bg-red-900 border-l-8 border-red-600" : "bg-gray-700"} px-3 py-2 rounded-md hover:bg-gray-800`}
       >
      {server.name}
    </button>
      ))}

          </div>
        )}
        
        </div>

      
        

    

      <div className="mt-8">
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
                {movie.genres?.map((genre) => (
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
