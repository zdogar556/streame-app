import React, { useEffect } from 'react'
import { useState, } from 'react'
import {usEffect} from 'react'
import { getTrendingTVShows } from '../movieApi'

const TrendingTVShow = () => {
    const [trendingTVShow, setTrendingTVShow] = useState([]);
    useEffect(() => {
        getTrendingTVShows()
          .then((res) => {
            console.log(res.data.results);
            setTrendingTVShow(res.data.results);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
  return (
<div className=" mt-8  " >
      <h1 className='text-xl font-bold text-white'>Trending TV</h1>
        <div className='flex overflow-x-auto gap-4 scrollbar-hide mt-3'>
         {
        trendingTVShow.map((tvShow) => (
          <div className='min-w-[180px]'
           key={tvShow.id}>
            <img
            className='w-[180] h-72 object-cover rounded-xl'
            src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`} alt={tvShow.title} />
            <h2>{tvShow.name}</h2>
            <p>{tvShow.first_air_date? new Date(tvShow.first_air_date).getFullYear() : "N.A" }</p>
          </div>
        ))
      }
        </div>
      
    </div>
  )
}

export default TrendingTVShow
