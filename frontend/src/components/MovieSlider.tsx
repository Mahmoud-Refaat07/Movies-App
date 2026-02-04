import axios from "axios";
import { useEffect, useRef, useState } from "react";
import useContentStore from "../store/useContentStore";
import { Link } from "react-router-dom";
import { SMALL_IMAGE_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface categoryProps {
  category: string;
}

interface contentItem {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string;
}

const MovieSlider = ({ category }: categoryProps) => {
  const [content, setContent] = useState<[]>([]);
  const [showArrors, setShowArrors] = useState<boolean>(false);

  const { contentType } = useContentStore();
  const sliderRef = useRef<HTMLDivElement>(null);

  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formattedContentType = contentType === "movie" ? "Movie" : "Tv Shows";

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
    const getContent = async () => {
      const response = await axios.get(`/api/${contentType}/${category}`);
      setContent(response.data.content.results);
    };
    getContent();
  }, [contentType, category]);

  return (
    <div
      className="bg-black text-white relative px-5 md:px-20 "
      onMouseEnter={() => setShowArrors(true)}
      onMouseLeave={() => setShowArrors(false)}
    >
      <h2 className="mb-4 text-2xl font-bold ">
        {formattedCategoryName} {formattedContentType}
      </h2>

      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {content.map((item: contentItem) => (
          <Link
            to={`/watch/${item.id}`}
            className="min-w-62.5 relative group"
            key={item.id}
          >
            <motion.div
              className="rounded-lg overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
            >
              <img
                src={SMALL_IMAGE_BASE_URL + item.backdrop_path}
                alt="movie image"
                className="transition-transform duration-300 ease-in-out group-hover:scale-125 "
              />
            </motion.div>
            <motion.p
              className="mt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
            >
              {item.title || item.name}
            </motion.p>
          </Link>
        ))}
      </div>
      {showArrors && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
           size-12 rounded-full bg-black/50 hover:bg-black/80 text-white z-10"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
           size-12 rounded-full bg-black/50 hover:bg-black/80 text-white z-10"
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieSlider;
