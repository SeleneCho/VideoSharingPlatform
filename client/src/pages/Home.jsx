import React, { useState, useEffect } from "react";
import "./Home.css";
import Card from "../Components/Card";
import axios from "axios";

const Home = ({ type }) => {
  const [fetchvideos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/${type}`);
      setVideos(res.data);
      console.log(res.data);
    };
    fetchVideos();
  }, [type]);

  const categoryData = [
    "All",
    "NewHopeClub",
    "TopGun",
    "BensonBoone",
    "BebeRexha",
    "News",
    "Hearts&Colors",
    "Atlanta",
    "Travel",
    "World",
    "K-POP",
    "Food",
    "Cats",
    "Dogs",
    "Music",
    "Games",
    "Sports",
  ];

  const [cateogry, setCateogry] = useState("All");

  const handleCategory = async (tag) => {
    setCateogry(tag);
  };

  return (
    <>
      <div
        className="homeContainer pt-[55px] pl-[85px] w-full h-full box-border min-h-screen  relative"
        id="homeContainer"
      >
        <div className="tagsContainer flex py-3 px-5 overflow-x-scroll relative ">
          {categoryData.map((tab) => {
            return (
              <h3
                className={`tagsList m-0 font-normal text-base py-1 px-3 rounded-full mr-3 break-keep whitespace-nowrap cursor-pointer ${
                  cateogry === tab && "active"
                }`}
                key={tab}
                onClick={() => handleCategory(tab)}
              >
                {tab}
              </h3>
            );
          })}
        </div>
        <div className="hidden sm:flex sm:relative homeBanner w-full">
          <img
            src={require("../Assets/Images/videoBanner1.jpeg")}
            alt="Ad Banner"
            className="youtubeAdBanner w-full"
          />
          <div className="bannerInfo absolute flex flex-col items-center z-[5] top-1/2 text-black ml-24">
            <div className="self-start flex items-center">
              <img
                className="w-8"
                src={require("../Assets/Images/movieIcon2.png")}
                alt="Logo"
              />
              <h2 className="m-0 ml-3">www.yourvideos.com</h2>
            </div>

            <h1 className="text-5xl scale-y-105 py-4 font-bold self-start">
              Share & Explore
            </h1>
            <h1 className="self-start text-2xl font-semibold">
              share and explore trending videos on yourvideos.com!
            </h1>
          </div>
        </div>
        <div className="videoContainer grid p-5 gap-x-5 gap-y-7">
          {fetchvideos.map((video) => {
            return <Card video={video} key={video._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
