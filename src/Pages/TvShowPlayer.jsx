import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getTVDetails, getTVCredits } from '../movieApi'

const TvShowPlayer = () => {

    const { id } = useParams();
    const { season } = useParams();
    const { episode } = useParams();

    const navigate=useNavigate();

    const [tvShow, setTvShow] = useState(null);
    const [cast , setCast] = useState([]);
    const [images , setImages] = useState([]);

    const servers=[
        {
            id: "cinemaos",
            name: "CinemaOS (Multi - no ads)",
            url: `https://cinemaos.live/tv/watch/${id}`
        },
        {
            id:"vidfast",
            name:"vidfast (Multi - no ads)",
            url:`https://vidfast.vc/tv/${id}`
        },
        {
            id:"yapgrid",
            name:"yapgrid (Multi - no ads)",
            url:`https://yapgrid.com/embed/tv/${id}?autoplay=1`
        },
        {
            id:"cinesrc",
            name: "CineSrc (Multi-ads)",
            url: `https://cinesrc.st/embed/tv/${id}`
        },
        {
            id :"peachify",
            name: "Peachify (Multi-ads)",
            url: `https://peachify.pro/embed/tv/${id}`
        },
        {
            id:"embedmaster",
            name: "EmbedMaster (Multi-ads)",
            url: `https://embedmaster.link/tv/${id}`
         },
        {
            id:"vidking",
            name: "VidKing (Multi-ads)",
            url: `https://www.vidking.net/embed/tv/${id}`
        },
        
    ]

    const [currentServer,setCurrentServer]=useState(servers[0]);

    useEffect(() => {
        getTVDetails(id)
        .then((res) => {
          console.log(res.data);
          setTvShow(res.data);
        })
        .catch((error) => {
          console.log(error);
        })

        // Get TVShow Cast
        getTVCredits(id)
        .then((res) => {
          console.log(res.data.cast);
          setCast(res.data.cast);
        })
        .catch((error) => {
          console.log(error);
        })  
    }, [id]);

    if(!tvShow) return(
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      Loading...
    </div>
  );
  return (
    <div className='min-h-screen  min-w-screen bg-black text-white p-2'>
      TV Show Player


      <div>
    <iframe
      src={currentServer.url}
      width="100%"
      height="600"
      allowFullScreen
      />
      <div>
        
      </div>

      </div>

      
      <div 
      className='flex flex-col gap-2 '
      >
        {servers.map((server) => (
      
      <button
      key={server.id}
      onClick={() => setCurrentServer(server)}
      className={`w-full justify-start items-start gap-2 flex
         ${currentServer.id === server.id ? 
          "bg-red-800" : "bg-gray-700"} px-3 py-2 rounded-md hover:bg-gray-800`}
       >
      {server.name}
    </button>
      ))}
      </div>

      <h1 className="text-3xl font-bold">{tvShow?.name}</h1>

      {/* Details */}
              <div className="flex gap-4 mt-3 text-gray-400"> 
                <p className="text-red-500 font-semibold">
                {Math.round(tvShow?.vote_average * 10) }% Match</p>
                <p>{tvShow.first_air_date
                    ? new Date(tvShow?.first_air_date).getFullYear()
                    : "N/A"}</p>

                <p>{tvShow?.number_of_seasons} Seasons</p>
                
                <p>{tvShow?.number_of_episodes} Episodes </p>
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
                      <div className="text-sm text-gray-400">Character: {actor.character}</div>
                    </div>
                  ))}
                </div>  
              </div>
              
              
      
    </div>

    
  )
}

export default TvShowPlayer
