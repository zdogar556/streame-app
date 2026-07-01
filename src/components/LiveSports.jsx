import React, { useEffect } from 'react'
import { useState } from 'react'
import { getLiveMatches } from '../liveApi';


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
    <div className='min-h-screen  min-w-screen bg-black text-white' >
      <h2>
        live Matches
      </h2>
      {
        matches.map((match) => (
          <div key={match.id}>
            <h3>{match.category}</h3>
            <p>{match.teams.away.name} vs {match.teams.away.name}</p>
            <img src={`https://streamed.pk${match.poster
}`} alt="" />
          </div>
        ))
      }
    </div>
  )
}

export default LiveSports
