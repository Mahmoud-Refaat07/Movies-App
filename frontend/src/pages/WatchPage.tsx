import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useContentStore from "../store/useContentStore";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMAGE_BASE_URL } from "../utils/constants";

interface contentDetails {
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  adult?: boolean;
  overview?: string;
  poster_path?: string;
}

interface Trailer {
  key: string;
}

function formatReleaseDate(date: string | undefined) {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const WatchPage = () => {
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [contentDetails, setContentDetails] = useState<null | contentDetails>(
    {},
  );
  const [similarContent, setSimilarContent] = useState<[]>([]);
  const { id } = useParams();
  const { contentType } = useContentStore();

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };
  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const response = await axios.get(`/api/${contentType}/${id}/trailers`);
        setTrailers(response.data.content);
      } catch (error: any) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      } finally {
        setLoading(false);
      }
    };
    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const response = await axios.get(`/api/${contentType}/${id}/similar`);
        setSimilarContent(response.data.content.results);
      } catch (error: any) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      } finally {
        setLoading(false);
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const response = await axios.get(`/api/${contentType}/${id}/details`);
        setContentDetails(response.data.content);
      } catch (error: any) {
        if (error.message.includes("404")) {
          setContentDetails(null);
        }
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />
        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4 ">
            <button
              className={`
                    bg-grey-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded  ${
                      currentTrailerIdx === 0
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }
                    `}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`
                    bg-grey-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded  ${
                      currentTrailerIdx === trailers.length - 1
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }
                    `}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              src={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx]?.key}`}
              //   playing
              controls
              width="100%"
              height="70vh"
              className="mx-auto rounded-lg overflow-hidden"
            />
          )}
          {trailers.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No trailers available for .
              <span className="font-bold text-red-600">
                {contentDetails?.title || contentDetails?.name}{" "}
              </span>
            </h2>
          )}
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-20
           max-w-6xl mx-auto"
          >
            <div className="mb-4 md:mb-0 ">
              <h2 className="text-5xl font-bold text-balance">
                {contentDetails?.title || contentDetails?.name}
              </h2>
              <p className="mt-2 text-lg">
                {formatReleaseDate(
                  contentDetails?.release_date ||
                    contentDetails?.first_air_date,
                )}{" "}
                |{" "}
                {contentDetails?.adult ? (
                  <span className="text-red-600">16+</span>
                ) : (
                  <span className="text-green-600">PG-13</span>
                )}
              </p>
              <p className="mt-4 text-lg text-gray-400">
                {contentDetails?.overview}
              </p>
            </div>
            <img
              src={ORIGINAL_IMAGE_BASE_URL + contentDetails?.poster_path}
              alt="poster"
              className="max-h-150 rounded-md mt-25"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
