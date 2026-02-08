import { useEffect, useState } from "react";
import useContentStore from "../store/useContentStore";
import { axiosInstance } from "../utils/axiosInstance";

export interface TrendingContentItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string | null;
  release_date?: string | null;
  first_air_date?: string | null;
  adult?: boolean;
}

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] =
    useState<TrendingContentItem | null>(null);

  console.log(trendingContent);

  const { contentType } = useContentStore() as { contentType: string };

  useEffect(() => {
    const getTrendingContent = async () => {
      const response = await axiosInstance.get(`${contentType}/trending`);
      setTrendingContent(response.data?.content);
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};

export default useGetTrendingContent;
