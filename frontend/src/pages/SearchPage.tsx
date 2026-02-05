import { use, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import { ORIGINAL_IMAGE_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

interface searchMoviesProps {
  id: number;
  backdrop_path: string;
}
interface searchedTvShowsProps {
  id: number;
  backdrop_path: string;
}
interface searchPeopleProps {
  id: number;
  profile_path: string;
}

const SearchPage = () => {
  const [category, setCategory] = useState<"movie" | "tv" | "person">("movie");
  const [inputValue, setInputValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchedMovies, setSearchedMovies] = useState<searchMoviesProps[]>([]);
  const [searchedTvShows, setSearchedTvShows] = useState<
    searchedTvShowsProps[]
  >([]);
  const [searchedPeople, setSearchedPeople] = useState<searchPeopleProps[]>([]);

  const handleSearch = () => {
    if (!inputValue) return;
    setSearchQuery(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    if (!searchQuery) return;
    const fetchingData = async () => {
      const response = await axios.get(
        `/api/search/${category}/${searchQuery}`,
      );

      if (category === "movie") setSearchedMovies(response.data.content);
      if (category === "tv") setSearchedTvShows(response.data.content);
      if (category === "person") setSearchedPeople(response.data.content);
    };

    fetchingData();
  }, [category, searchQuery]);
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-center items-center mt-8 gap-4 ">
        <button
          className={`bg-gray-500 p-2 rounded-sm cursor-pointer hover:bg-gray-600 ${category === "movie" ? "bg-red-800" : ""}`}
          onClick={() => setCategory("movie")}
        >
          Movies
        </button>
        <button
          className={`bg-gray-500 p-2 rounded-sm cursor-pointer hover:bg-gray-600 ${category === "tv" ? "bg-red-800" : ""}`}
          onClick={() => setCategory("tv")}
        >
          TV Shows
        </button>
        <button
          className={`bg-gray-500 p-2 rounded-sm cursor-pointer hover:bg-gray-600 ${category === "person" ? "bg-red-800" : ""}`}
          onClick={() => setCategory("person")}
        >
          People
        </button>
      </div>
      <div className="max-w-2xl mx-auto mt-4 flex items-center justify-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          className="w-full p-3 bg-gray-800 rounded-sm"
        />
        <Search
          className="bg-red-700 size-10 border border-white rounded-md cursor-pointer hover:bg-red-600"
          onClick={handleSearch}
        />
      </div>
      <div className="grid grid-cols-5 pb-4 group mt-10 gap-4 mx-2">
        {category === "movie"
          ? searchedMovies.length > 0 &&
            searchedMovies.map((item) => {
              if (item.backdrop_path === null) return null;
              return (
                <Link to={`/watch/${item.id}`} key={item.id}>
                  <img
                    src={ORIGINAL_IMAGE_BASE_URL + item.backdrop_path}
                    alt="poster"
                    className="w-full flex-none rounded-md hover:scale-105 transition-transform cursor-pointer border border-white"
                  />
                </Link>
              );
            })
          : category === "tv"
            ? searchedTvShows.map((item) => {
                if (item.backdrop_path === null) return null;
                return (
                  <Link to={`/watch/${item.id}`} key={item.id}>
                    <img
                      src={ORIGINAL_IMAGE_BASE_URL + item.backdrop_path}
                      alt="poster"
                      className="w-full flex-none rounded-md hover:scale-105 transition-transform cursor-pointer border border-white"
                    />
                  </Link>
                );
              })
            : searchedPeople.map((item) => {
                if (item.profile_path === null) return null;
                return (
                  <Link
                    to={`/watch/${item.id}`}
                    key={item.id}
                    className="px-2 py-6 bg-gray-700"
                  >
                    <img
                      src={ORIGINAL_IMAGE_BASE_URL + item.profile_path}
                      alt="poster"
                      className="w-full flex-none rounded-md hover:scale-105 transition-transform cursor-pointer border border-white"
                    />
                  </Link>
                );
              })}
      </div>
    </div>
  );
};

export default SearchPage;
