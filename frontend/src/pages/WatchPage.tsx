import axios from "axios";
import Navbar from "../components/Navbar";
import useContentStore from "../store/useContentStore.js";
import WatchPageSkeleton from "../components/WatchPageSkeleton.jsx";

import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  ORIGINAL_IMAGE_BASE_URL,
  SMALL_IMAGE_BASE_URL,
} from "../utils/constants";
import { motion } from "framer-motion";
import { formatReleaseDate } from "../utils/dateFormat";
import { lazy, Suspense } from "react";

const ReactPlayer = lazy(() => import("react-player"));

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
interface similarContentItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
}

const WatchPage = () => {
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [contentDetails, setContentDetails] = useState<contentDetails | null>(
    {},
  );
  const [similarContent, setSimilarContent] = useState<similarContentItem[]>(
    [],
  );
  const [showArrors, setShowArrors] = useState<boolean>(false);
  const { id } = useParams();
  const { contentType } = useContentStore();
  const { pathname } = useLocation();
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };
  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const response = await axios.get(`/api/${contentType}/${id}/trailers`);
        setTrailers(response.data?.content);
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
    const getContentDetails = async () => {
      try {
        const response = await axios.get(`/api/${contentType}/${id}/details`);
        setContentDetails(response.data?.content);
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

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const response = await axios.get(`/api/${contentType}/${id}/similar`);
        setSimilarContent(response.data?.content.results);
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen p-10">
        <WatchPageSkeleton />
      </div>
    );
  }

  if (!contentDetails) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found
            </h2>
          </div>
        </div>
      </div>
    );
  }

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
          <Suspense
            fallback={<div className="h-64 bg-gray-800 animate-pulse" />}
          >
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
          </Suspense>
          {trailers.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No trailers available for .
              <span className="font-bold text-red-600">
                {contentDetails?.title || contentDetails?.name}{" "}
              </span>
            </h2>
          )}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-20
           max-w-6xl mx-auto mt-25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 3 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
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
              className="max-h-150 rounded-md"
              loading="lazy"
            />
          </motion.div>
        </div>
        {Array.isArray(similarContent) && similarContent.length > 0 && (
          <div
            className="mx-auto max-w-6xl mt-12 relative"
            onMouseEnter={() => {
              setShowArrors(true);
            }}
            onMouseLeave={() => setShowArrors(false)}
          >
            <h2 className="text-3xl font-bold mb-4">
              Similar{" "}
              {contentType === "movie"
                ? contentType.charAt().toUpperCase() +
                  contentType.slice(1) +
                  "s"
                : "TV Shows"}
            </h2>
            <motion.div
              className="flex justify-center items-center gap-4 pb-4 group overflow-x-scroll scrollbar-hide"
              ref={sliderRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 5 }}
              whileInView={{ opacity: 1 }}
            >
              {similarContent.map((item: similarContentItem) => {
                if (!item.poster_path) return null;
                return (
                  <Link
                    to={`/watch/${item.id}`}
                    key={item.id}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMAGE_BASE_URL + item.poster_path}
                      alt="poster"
                      className="w-full h-auto rounded-md"
                      loading="lazy"
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {item.title || item.name}{" "}
                    </h4>
                  </Link>
                );
              })}

              {showArrors && (
                <>
                  <ChevronLeft
                    className="absolute top-1/2 -translate-y-1/2  md:left-5  cursor-pointer
           size-12 rounded-full bg-black/50 hover:bg-black/80 text-white z-10"
                    onClick={scrollLeft}
                  />

                  <ChevronRight
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2  md:right-5 cursor-pointer
           size-12 rounded-full bg-black/50 hover:bg-black/80 text-white z-10"
                    onClick={scrollRight}
                  />
                </>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
