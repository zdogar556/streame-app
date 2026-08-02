import React from 'react'
import { useNavigate } from 'react-router-dom';


const MyList = () => {
  const navigate=useNavigate();
  return (
    <div className='h-screen  min-w-screen bg-black  text-white px-8  '>
      <div className="p-2">
        <h1 className='text-3xl font-bold'>
        My List
      </h1>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <p className='text-5xl'>🎬</p>
        <p className='text-xl font-bold mt-2'>Nothing saved yet</p>
        <p className='text-sm mt-2 text-gray-400'>Add movies and shows from the + My List button</p>
        <button
        onClick={()=>navigate("/")}
        className='bg-red-600 px-4 py-2 mt-4 rounded-full'>
          Browse Titles</button>
      </div>
    </div>
  )
}

export default MyList
