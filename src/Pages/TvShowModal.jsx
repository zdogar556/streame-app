import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getTrendingMovies } from "../movieApi";
import MovieModal from "./MovieModal";

const TrendingMovie = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const scrollRef = useRef(null);

  const moveRight = () => {
    scrollRef.current?.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  const moveLeft = () => {
    scrollRef.current?.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getTrendingMovies()
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-8 w-full px-3 sm:px-4 md:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        
        <h1 className="text-xl sm:text-2xl font-bold text-white whitespace-nowrap">
          Trending Movies
        </h1>

        {/* Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={moveLeft}
            className="
              w-8 h-8
              sm:w-9 sm:h-9
              rounded-full
              bg-[#08080cb3]
              text-white
              flex items-center justify-center
              hover:bg-gray-950
              border border-gray-700
              transition
            "
          >
            <FaChevronLeft className="text-sm sm:text-base" />
          </button>

          <button
            onClick={moveRight}
            className="
              w-8 h-8
              sm:w-9 sm:h-9
              rounded-full
              bg-[#08080cb3]
              text-white
              flex items-center justify-center
              hover:bg-gray-950
              border border-gray-700
              transition
            "
          >
            <FaChevronRight className="text-sm sm:text-base" />
          </button>
        </div>
      </div>

      {/* Movie Slider */}
      <div
        ref={scrollRef}
        className="
          flex
          flex-nowrap
          overflow-x-auto
          overflow-y-hidden
          gap-3
          sm:gap-4
          pb-2
          scrollbar-hide
          scroll-smooth
        "
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="
              flex-none
              w-[130px]
              sm:w-[150px]
              md:w-[170px]
              lg:w-[180px]
              cursor-pointer
              group
            "
            onClick={() => {
              setSelectedMovie(movie.id);
              setIsOpen(true);
            }}
          >
            {/* Poster */}
            <img
              className="
                w-full
                aspect-[2/3]
                object-cover
                rounded-xl
                bg-gray-800
                transition
                duration-300
                group-hover:scale-[1.03]
              "
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
            />

            {/* Movie Info */}
            <div className="mt-2">
              <h2
                className="
                  text-white
                  text-sm
                  sm:text-base
                  font-medium
                  truncate
                "
              >
                {movie.title}
              </h2>

              <p className="text-gray-500 text-xs sm:text-sm">
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <MovieModal
        movieId={selectedMovie}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default TrendingMovie;