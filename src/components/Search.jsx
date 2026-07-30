import React from 'react'


const Search = () => {
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
            className='bg-gray-900 w-full h-12 rounded-xl p-2'
            type="text"
            placeholder='Search movies,TV,bollywood,hollywood....'
            
            />
        </div>
        {/* search filter for All,Movies,TV Shows */}
        <div className='p-2 flex items-center gap-2' >
            <div className='text-gray-400 w-20 h-10 bg-red-600 flex justify-center items-center rounded-full' >All</div>
            <div
            className='text-gray-400 w-20 h-10 bg-red-600 flex justify-center items-center rounded-full' >Movies</div>
            <div
            className='text-gray-400 w-20 h-10 bg-red-600 flex justify-center items-center rounded-full'>TV Shows</div>
        </div>
        
        {/* search filter for Regions */}
        <div className='p-2 flex items-center gap-2'>
            <div className='text-gray-400 w-20 h-10 bg-red-600 flex justify-center items-center rounded-full'>All Regions</div>
            <div className='text-gray-400 w-20 h-10 bg-red-600 flex justify-center items-center rounded-full'>Bollywood</div>
            <div className='text-gray-400 w-20 h-10 bg-red-600 flex justify-center items-center rounded-full'>Hollywood</div>
        </div>


        <div className="flex flex-col justify-center items-center h-full p-2 text-center">
            <p className="text-5xl">🎬</p>
            <p className="text-lg text-gray-400">
             Start typing, or pick Bollywood / Hollywood to browse</p>
        </div>

        

      
    </div>
  )
}

export default Search
