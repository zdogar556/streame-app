import axios from "axios";

const KEY = import.meta.env.VITE_TMDB_KEY;


const api = axios.create({
    baseURL:"https://api.themoviedb.org/3"
});


export const getPopularMovies = ()=>{

return api.get(
`/movie/popular?api_key=${KEY}`
)

}

export const getTrendingMovies = ()=>{

  return api.get(
  `/trending/movie/day?api_key=${KEY}`
  )
  
  }

export const getTopRatedMovies = ()=>{

  return api.get(
  `/movie/top_rated?api_key=${KEY}`
  )
  
  }

export const getBollywoodMovies = ()=>{

  return api.get(
  `/discover/movie?api_key=${KEY}&with_original_language=hi&sort_by=popularity.desc`
  )
  
  }

export const getHollywoodMovies = ()=>{

  return api.get(
  `/discover/movie?api_key=${KEY}&with_genres=35`
  )
  
  }

// Top Rated TV Shows
export const getTopTVShows = ()=>{

  return api.get(
  `/tv/top_rated?api_key=${KEY}`
  )
  
  }

  // Trending TV Shows
export const getTrendingTVShows = ()=>{

  return api.get(
  `/trending/tv/week?api_key=${KEY}`
  )
  
  }

  // Popular TV Shows
export const getPopularTVShows = ()=>{

  return api.get(
  `/tv/popular?api_key=${KEY}`
  )
  
  }