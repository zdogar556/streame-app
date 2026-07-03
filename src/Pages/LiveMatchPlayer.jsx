import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMatchStream } from "../liveApi";

const LivePlayer = () => {
  const { state } = useLocation();
  const match = state?.match;

  const [streamUrl, setStreamUrl] = useState([]);

  useEffect(() => {
    if (!match) return;

    if (match.sources.length > 0) {
      const source = match.sources[0];

      getMatchStream(source.source, source.id)
        .then((res) => {
          console.log(res.data);

          // Change according to API response
          setStreamUrl(res.data.stream);
        })
        .catch(console.error);
    }
  }, [match]);

  if (!match) return <h1>No Match Found</h1>;

  return (
    <div className="bg-black min-h-screen text-white p-5">
      <h1 className="text-3xl font-bold mb-5">{match.title}</h1>

      {streamUrl ? (
        <iframe
          src={streamUrl.e}
          title={match.title}
          className="w-full h-[700px]"
          allowFullScreen
        />
      ) : (
        <p>Loading Stream...</p>
      )}
    </div>
  );
};

export default LivePlayer;