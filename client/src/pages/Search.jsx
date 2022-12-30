import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../Components/Card";

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    console.log("quest in search is ", query);
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/search${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return (
    <div className="relative pt-60px pl-[85px] w-full h-full min-h-screen flex gap-y-10 gap-x-7 overflow-auto">
      <div className="grid grid-cols-4 grid-rows-2 p-5 gap-y-8 gap-x-4">
        {videos.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Search;
