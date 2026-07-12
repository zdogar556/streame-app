import React, { useEffect } from 'react'
import { useState } from 'react'
import { getTopTVShows } from '../movieApi'
import TVShow from '../components/TVShow';
import TVShowModal from './TvShowModal';

const TopTVShow = () => {
    const [topTVShow, setTopTVShow] = useState([]);
    const [selectTvShow, setSelectTvShow] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getTopTVShows()
          .then((res) => {
            console.log(res.data.results);
            setTopTVShow(res.data.results);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
  return (
    <div className=" mt-8  " >
      <h1 className='text-xl font-bold text-white'>Top Rated</h1>
      <p
      className='text-gray-400 mt-2 text-sm'>Highest rated of all time</p>
        <div className='flex overflow-x-auto gap-4 scrollbar-hide mt-3'>
         {
        topTVShow.map((tvShow) => (
          <div className='min-w-[180px]'
           key={tvShow.id}
           onClick={() => {
          setIsOpen(true);
          setSelectTvShow(tvShow);
            }}
           >
          
            <img
            className='w-[180] h-72 object-cover rounded-xl'
            src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`} alt={tvShow.title} />
            <h2>{tvShow.name}</h2>
            <p>{tvShow.first_air_date? new Date(tvShow.first_air_date).getFullYear() : "N.A" }</p>
          </div>
        ))
      }
        </div>
      <TVShowModal
  tvShowId={selectTvShow?.id }
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
/>
    </div>
  )
}

export default TopTVShow
