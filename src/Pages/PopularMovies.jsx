import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getPopularMovies } from "../movieApi";
import MovieModal from "./MovieModal";

const PopularMovies = () => {
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
    getPopularMovies()
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-8 w-full ">

      {/* Header */}
      <div className="flex  gap-3 mb-3">

        {/* Title */}
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-white whitespace-nowrap">
            Popular Movies
          </h1>

          <p className="text-gray-400 mt-1 text-xs sm:text-sm truncate">
            Most-watched movies this week
          </p>
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2 shrink-0">

          <button
            onClick={moveLeft}
            className="
              w-8 h-8
              sm:w-9 sm:h-9
              rounded-full
              bg-[#08080cb3]
              text-white
              flex
              items-center
              justify-center
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
              flex
              items-center
              justify-center
              hover:bg-gray-950
              border border-gray-700
              transition
            "
          >
            <FaChevronRight className="text-sm sm:text-base" />
          </button>

        </div>
      </div>

      {/* Movies Slider */}
      <div
        ref={scrollRef}
        className="
          flex
          flex-nowrap
          overflow-x-auto
          overflow-y-hidden
          gap-3
          sm:gap-4
          scrollbar-hide
          scroll-smooth
          pb-2
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

            {/* Movie Information */}
            <h2
              className="
                text-white
                mt-2
                text-sm
                sm:text-base
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
        ))}
      </div>

      {/* Movie Modal */}
      <MovieModal
        movieId={selectedMovie}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

    </div>
  );
};

export default PopularMovies;