import React, { useEffect } from 'react'
import { useState } from 'react'
import { searchMovies, searchMulti, searchTVShows } from '../movieApi'
import MovieModal from '../Pages/MovieModal'
import TVShowModal from '../Pages/TvShowModal'
import TvShowModal from '../Pages/TvShowModal'


const Search = () => {
    // Filters State
    const[typeFilter,SetTypeFilter]=useState("all");

    const [regionFilter,SetRegionFilter]=useState("all");
    // query state
    const [query,setQuery]=useState("");

    // results state

    const [results,setResults]=useState([]);

    // Loading

    const [loading,setLoading]=useState(false);

    // Selected move
    const [selectedMovie, setSelectedMovie] = useState(null);
    // Selected TV Show
    const [selectedTVShow, setSelectedTVShow] = useState(null);
    // Movie Modal
    const [movieModalOpen, setMovieModalOpen] = useState(false);
    // TV Modal
    const [tvModalOpen, setTvModalOpen] = useState(false);

 

    useEffect(()=>{
        // check if query is empty
        if(!query.trim()){
            setResults([])
            return;
        } 

        const fetchSearch= async()=>{
            try{
                setLoading(true);

                let res;

                // SerachApi Call
                if(typeFilter === "movies"){
                    res = await searchMovies(query);
                } else if(typeFilter === "tv"){
                    res = await searchTVShows(query);
                } else {
                    res = await searchMulti(query,);
                }
                let data= res.data.results || [];
                // Remove people results
            data = data.filter(
             (item) =>
            item.media_type !== "person" &&
            (item.poster_path || item.backdrop_path)
        );

        // bollywood filter
        if(regionFilter === "bollywood"){
            data = data.filter(
                (item) => 
                    item.original_language === "hi" ||
                    item.origin_country?.includes("IN")
            );
        }

        // hollywood filter
        if(regionFilter === "hollywood"){
            data = data.filter(
                (item) => 
                    item.original_language === "en" &&
                    ! item.origin_country?.includes("IN")
            );
        }
        
        setResults(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce
    const timer = setTimeout(fetchSearch, 1000);

    return () => clearTimeout(timer);
  }, [query, typeFilter, regionFilter]);

  const handleClick = (item) => {
    const isTV=
    item.media_type === "tv" || 
    (typeFilter === "tv" && !item.media_type);
    if (isTV) {
      setSelectedTVShow(item.id);
      setTvModalOpen(true);
    } else {
      setSelectedMovie(item.id);
      setMovieModalOpen(true);
    }
  };

  return (
    <div className='min-h-screen  min-w-screen bg-black text-white px-8 '>
        <div className='p-2'>
            <h1 className='text-3xl font-bold'>
                Search
            </h1>
            <p className='text-sm text-gray-400'>
                Find movies and TV shows — try “bollywood” or “hollywood”
            </p>
        </div>

        <div className=' p-2 flex items-center gap-2'>
            <input
            className="w-full h-12 rounded-xl bg-gray-900 px-4 outline-none border border-gray-800 focus:border-red-600"
            type="text"
            placeholder='Search movies,TV,bollywood,hollywood....'
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            
            />
        </div>
        {/* search filter for All,Movies,TV Shows */}
        <div className='flex gap-3 p-2 flex-wrap'>
            <button
            onClick={()=> SetTypeFilter("all")}
            className={`px-5 py-2 rounded-full transition
                ${typeFilter === "all" ? 
                    "bg-red-600 text-white" : 
                    "bg-gray-800 text-gray-400"}`}
            >
                All
            </button>


            <button 
            onClick={()=>SetTypeFilter("movies")}
            className={`px-5 py-2 rounded-full transition
                ${typeFilter === "movies" ? 
                    "bg-red-600 text-white" : 
                    "bg-gray-800 text-gray-400"}`}
            
            >
                Movies
            </button>


            <button
            onClick={()=>SetTypeFilter("tv")}
            className={`px-5 py-2 rounded-full transition
                ${typeFilter === "tv" ?
                    "bg-red-600 text-white":
                    "bg-gray-800 text-gray-400"
                 }
                `}
            >
                TV Shows
            </button>
        </div>
        
        {/* search filter for Regions */}
        <div className="flex gap-3 flex-wrap mb-6 p-2">
            <button 
            onClick={()=>SetRegionFilter("all")}
            className={`px-5 py-2 rounded-full transition
                ${regionFilter === "all" ?
                    "bg-red-600 text-white":
                    "bg-gray-800 text-gray-400"
                }`}
             >All
             </button>

            <button
            onClick={()=>SetRegionFilter("bollywood")}
            className={`px-5 py-2 rounded-full transition
                ${regionFilter === "bollywood" ?
                    "bg-red-600 text-white":
                    "bg-gray-800 text-gray-400"}`}
            >Bollywood
            </button>

            <button
            onClick={()=>SetRegionFilter("hollywood")}
            className={`px-5 py-2 rounded-full transition
                ${regionFilter === "hollywood" ?
                    "bg-red-600 text-white":
                    "bg-gray-800 text-gray-400"}`}
            >
                Hollywood
                </button>
        </div>


        {/* Loading state */}
        {loading &&( <div  className="text-center py-10 text-gray-400">
            Searching....
        </div>)}

        {/* Empty state */}
        {!query &&(<div className="flex flex-col justify-center items-center h-full p-2 text-center">
            <p className="text-5xl">🎬</p>
            <p className="text-lg text-gray-400">
             Start typing, or pick Bollywood / Hollywood to browse</p>
        </div>)}

        {/* No Result */}
        {query && !loading && results.length === 0 &&(
            <div className="text-center py-10 text-gray-400">
                 No Result Found
                 </div>
        )}

        
      {/* Results */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">

        {results.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className="cursor-pointer group"
          >
            <img
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  : "https://via.placeholder.com/500x750"
              }
              alt={item.title || item.name}
              className="rounded-xl w-full object-cover transition group-hover:scale-105"
            />

            <h3 className="mt-2 font-semibold line-clamp-1">
              {item.title || item.name}
            </h3>

            <p className="text-sm text-gray-400">
              {item.media_type || typeFilter}
            </p>
          </div>
        ))}

      </div>
      <MovieModal
      movieId={selectedMovie}
      isOpen={movieModalOpen}
      onClose={()=>{
        setMovieModalOpen(false);
        setSelectedMovie(null)
      }}
      />
      <TvShowModal
      tvId={selectedTVShow}
      isOpen={tvModalOpen}
      onClose={()=>{
        setTvModalOpen(false);
        setSelectedTVShow(null)
      }}
      />
    </div>
  )
}

export default Search
