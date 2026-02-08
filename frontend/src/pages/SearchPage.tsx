import axios from "axios";
import Navbar from "../components/Navbar";

import { useState } from "react";
import { Loader, Search } from "lucide-react";
import { ORIGINAL_IMAGE_BASE_URL } from "../utils/constants.ts";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

interface searchProps {
  id: number;
  title?: string;
  name?: string;
  backdrop_path?: string;
  profile_path?: string;
}

const SearchPage = () => {
  const [category, setCategory] = useState<"movie" | "tv" | "person">("movie");
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchedMovies, setSearchedMovies] = useState<searchProps[]>([]);
  const [searchedTvShows, setSearchedTvShows] = useState<searchProps[]>([]);
  const [searchedPeople, setSearchedPeople] = useState<searchProps[]>([]);

  const handleSearch = () => {
    if (!inputValue) return;

    const fetchingData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/search/${category}/${inputValue}`,
        );

        if (category === "movie") setSearchedMovies(response.data.content);
        if (category === "tv") setSearchedTvShows(response.data.content);
        if (category === "person") setSearchedPeople(response.data.content);
      } catch (error: unknown) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 404
        ) {
          toast.error("No results found.");
        } else {
          toast.error("An error occurred while fetching data.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchingData();
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-center items-center mt-8 gap-4 ">
        <button
          className={`bg-gray-800 p-2 rounded-sm cursor-pointer hover:bg-red-600 ${category === "movie" ? "bg-red-600" : ""}`}
          onClick={() => {
            setCategory("movie");
            setSearchedTvShows([]);
            setSearchedPeople([]);
          }}
        >
          Movies
        </button>
        <button
          className={`bg-gray-800 p-2 rounded-sm cursor-pointer hover:bg-red-600 ${category === "tv" ? "bg-red-600" : ""}`}
          onClick={() => {
            setCategory("tv");
            setSearchedMovies([]);
            setSearchedPeople([]);
          }}
        >
          TV Shows
        </button>
        <button
          className={`bg-gray-800 p-2 rounded-sm cursor-pointer hover:bg-red-600 ${category === "person" ? "bg-red-600" : ""}`}
          onClick={() => {
            setCategory("person");
            setSearchedMovies([]);
            setSearchedTvShows([]);
          }}
        >
          People
        </button>
      </div>
      <div className="max-w-2xl mx-auto mt-4 flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder={`Search for ${category === "movie" ? "Movies" : category === "tv" ? "TV Shows" : "People"}...`}
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          className="w-full p-2 bg-gray-800 rounded"
        />
        <span className="bg-red-700 p-2 border border-white rounded-md cursor-pointer hover:bg-red-600">
          <Search size={22} onClick={handleSearch} />
        </span>
      </div>
      {loading === true ? (
        <div className="flex justify-center items-center w-full h-screen  ">
          <Loader size={24} className="animate-spin size-25 text-red-600" />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center pb-4 group mt-10 gap-4 mx-2">
          {category === "movie"
            ? searchedMovies.length > 0 &&
              searchedMovies.map((item) => {
                if (item.backdrop_path === null) return null;
                return (
                  <>
                    <Link
                      to={`/watch/${item.id}`}
                      key={item.id}
                      className="bg-gray-800 px-4 py-6 rounded-lg"
                    >
                      <div className="overflow-hidden ">
                        <img
                          src={ORIGINAL_IMAGE_BASE_URL + item.backdrop_path}
                          alt="poster"
                          className="flex-none max-w-96 h-100 object-cover  hover:scale-103 transition-transform duration-300 cursor-pointer"
                          loading="lazy"
                        />
                      </div>

                      <h2 className="mt-2 text-xl font-bold text-center">
                        {item.title || item.name}
                      </h2>
                    </Link>
                  </>
                );
              })
            : category === "tv"
              ? searchedTvShows.map((item) => {
                  if (item.backdrop_path === null) return null;
                  return (
                    <>
                      <Link to={`/watch/${item.id}`} key={item.id}>
                        <div className="overflow-hidden  rounded-lg">
                          <img
                            src={ORIGINAL_IMAGE_BASE_URL + item.backdrop_path}
                            alt="poster"
                            className="flex-none max-w-96 h-100 object-cover rounded-md hover:scale-103 transition-transform duration-300 cursor-pointer bg-gray-800 px-4 py-8"
                            loading="lazy"
                          />
                        </div>

                        <h2 className="mt-2 text-xl font-bold text-center">
                          {item.title || item.name}
                        </h2>
                      </Link>
                    </>
                  );
                })
              : searchedPeople.map((item) => {
                  if (item.profile_path === null) return null;
                  return (
                    <>
                      <Link to={`/watch/${item.id}`} key={item.id}>
                        <div className="overflow-hidden  rounded-lg">
                          <img
                            src={ORIGINAL_IMAGE_BASE_URL + item.profile_path}
                            alt="poster"
                            className="flex-none max-w-96 h-100 object-cover rounded-md hover:scale-103 transition-transform duration-300 cursor-pointer bg-gray-800 px-4 py-8"
                            loading="lazy"
                          />
                        </div>

                        <h2 className="mt-2 text-xl font-bold text-center">
                          {item.title || item.name}
                        </h2>
                      </Link>
                    </>
                  );
                })}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
