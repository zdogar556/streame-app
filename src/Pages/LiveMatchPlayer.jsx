import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMatchStreams } from "../liveApi";

const LiveMatchPlayer = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const match = state?.match;

  const [selectedSource, setSelectedSource] = useState(null);
  const [streams, setStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState(null);
  const [loading, setLoading] = useState(false);

  // Select first source automatically
  useEffect(() => {
    if (!match?.sources?.length) return;

    setSelectedSource(match.sources[0]);
  }, [match]);

  // Load streams whenever source changes
  useEffect(() => {
    if (!selectedSource) return;

    setLoading(true);

    getMatchStreams(selectedSource.source, selectedSource.id)
      .then((res) => {
        console.log("Streams:", res.data);

        setStreams(res.data);

        if (res.data.length > 0) {
          setSelectedStream(res.data[0]);
        } else {
          setSelectedStream(null);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedSource]);

  if (!match) {
    return (
      <div className="bg-black h-screen flex justify-center items-center text-white">
        Match not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* MATCH INFO */}

      <div className=" flex gap-3 p-6">

        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 rounded bg-red-600 hover:bg-red-700"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold">
          {match.title}
        </h1>

        <p className="text-gray-400 mt-2">
          {match.date
            ? new Date(match.date).toLocaleString()
            : "Live"}
        </p>

      </div>


      
      {/* PLAYER */}



      <div className="w-full aspect-video bg-gray-900">

        {selectedStream ? (
          <iframe
            src={selectedStream.embedUrl}
            title="Live Stream"
            className="w-full h-full"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        ) : (
          <div className="h-full flex justify-center items-center">
            {loading ? "Loading Stream..." : "No Stream Available"}
          </div>
        )}

      </div>

      

      {/* SOURCES */}

      <div className="px-6">

        <h2 className="text-xl font-bold mb-4">
          Sources
        </h2>

        <div className="flex flex-wrap gap-3">

          {match.sources.map((source) => (

            <button
              key={`${source.source}-${source.id}`}
              onClick={() => setSelectedSource(source)}
              className={`px-4 py-2 rounded-lg transition

                ${
                  selectedSource?.id === source.id
                    ? "bg-red-600"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
            >
              {source.source.toUpperCase()}
            </button>

          ))}

        </div>

      </div>

      {/* STREAMS */}

      <div className="px-6 mt-8 pb-10">

        <h2 className="text-xl font-bold mb-4">
          Streams
        </h2>

        {loading ? (
          <div>Loading Streams...</div>
        ) : (

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

            {streams.map((stream) => (

              <button
                key={stream.id}
                onClick={() => setSelectedStream(stream)}
                className={`rounded-xl border p-4 transition

                  ${
                    selectedStream?.id === stream.id
                      ? "bg-red-600 border-red-600"
                      : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  }`}
              >

                <h3 className="font-bold">
                  Stream {stream.streamNo}
                </h3>

                <p className="text-sm mt-2">
                  {stream.language}
                </p>

                <p className="text-sm mt-1">

                  {stream.hd ? (
                    <span className="text-green-400">
                      HD
                    </span>
                  ) : (
                    <span className="text-yellow-400">
                      SD
                    </span>
                  )}

                </p>

              </button>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default LiveMatchPlayer;