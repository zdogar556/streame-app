import React, { useEffect } from 'react'
import { useState } from 'react'
import { getLiveMatches } from '../liveApi';
import { Link } from 'react-router-dom';


const LiveSports = () => {
  const [matches, setMatches] = useState([]);
useEffect(() => {
    getLiveMatches()
      .then((res) => {
        console.log(res.data);
        setMatches(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='min-h-screen  min-w-screen bg-black text-white px-2  ' >
      <h1 className='text-2xl font-bold p-4 '>
        Live Matches
      </h1>
      <div className=' flex flex-wrap  gap-6  p-6 '>
        {
        matches.map((match) => (   
        <Link
        to={`/sports/${match.id}`}
        state={{match}} > 
      <div
       key={match.id}
       className="cursor-pointer bg-gray-800 w-72  rounded-xl p-0">
      <img
        src={`https://streamed.pk${match.poster}`}
        alt={match.title}
        className="w-full h-36  rounded-xl"
      />
      <div className="p-4 ">
        <h3 className="text-white mt-2 font-bold line-clamp-1 ">{match.title}</h3>
        <div className='mt-1 flex gap-1 text-gray-400 text-sm'>
          <span>
            {match.date ?     new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
    }).format(new Date(match.date))
  : "N.A"}
          </span>
          <span>
            .{match.sources?.length ?? 0}Sources
          </span>

        </div>
      </div>
      
    </div>
        </Link>
  
        ))
      }

      </div>

      
    </div>
  )
}

export default LiveSports
