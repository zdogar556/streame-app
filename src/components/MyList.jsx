import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const MyList = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  // Get My List from localStorage
  useEffect(() => {
    const savedItems =
      JSON.parse(localStorage.getItem("myList")) || [];

    setItems(savedItems);
  }, []);

  // Remove item from My List
  const removeItem = (id) => {
    const updatedItems = items.filter(
      (item) => item.id !== id
    );

    setItems(updatedItems);

    localStorage.setItem(
      "myList",
      JSON.stringify(updatedItems)
    );
  };

  // Navigate to correct player
  const handleItemClick = (item) => {
    console.log("Clicked item:", item);

    // Movie
    if (item.title) {
      // navigate(`/watch/movie/${item.id}`);
    }

    // TV Show
    else if (item.name) {
      // navigate(`/watch/tv-show/${item.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-8">

      {/* Header */}
      <div className="p-2">
        <h1 className="text-3xl font-bold">
          My List
        </h1>
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[80vh]">

          <p className="text-5xl">
            🎬
          </p>

          <p className="text-xl font-bold mt-2">
            Nothing saved yet
          </p>

          <p className="text-sm mt-2 text-gray-400">
            Add movies and shows from the + My List button
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-red-600 px-4 py-2 mt-4 rounded-full"
          >
            Browse Titles
          </button>

        </div>
      )}

      {/* My List */}
      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-8">

          {items.map((item) => (

            <div
              key={item.id}
              className="group relative"
            >

              {/* Poster */}
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                onClick={() => handleItemClick(item)}
                className="w-full h-72 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
              />

              {/* Title */}
              <h2 className="font-semibold mt-2 truncate">
                {item.title || item.name}
              </h2>

              {/* Media Type */}
              <p className="text-sm text-gray-400">
                {item.title ? "Movie" : "TV Show"}
              </p>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 bg-black p-2 rounded-full hover:bg-red-600 transition"
              >
                <X size={18} />
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default MyList;