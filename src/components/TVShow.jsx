import React from 'react'
import TrendingTVShow from '../Pages/TrendingTVShow'
import TopTVShow from '../Pages/TopTVShow'
import PopulatTVShow from '../Pages/PopulatTVShow'

const TVShow = () => {
  return (
    <div className='min-h-screen  min-w-screen bg-black text-white px-8 '>
      <div>
      <h1 className='text-4xl font-bold'>TV Shows</h1>
      <p
      className='text-gray-400 mt-2 text-semibold'
      >Browse all TV shows</p>
      </div>
      <div>
        <TrendingTVShow />
      </div>
      <div>
        <PopulatTVShow />
      </div>
      <div>
        <TopTVShow />
      </div>
    </div>
  )
}

export default TVShow
