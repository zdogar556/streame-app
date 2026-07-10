import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Movies from './components/Movies'
import MoivePlayer from './Pages/MovieModal'
import TVShow from './components/TVShow'
import LiveSports from './components/LiveSports'
import MyList from './components/MyList'
import LiveMatchPayer from './Pages/LiveMatchPlayer'




const App = () => {

    return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/watch/movie/:id" element={<MoivePlayer />} />
        <Route path="/tv-shows" element={<TVShow />} />
        <Route path="/sports" element={<LiveSports />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/sports/:id" element={<LiveMatchPayer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
