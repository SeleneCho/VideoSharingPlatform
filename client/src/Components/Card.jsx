import "./Card.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";

const Card = ({ video }) => {
  const PF = "http://localhost:8000/images/";

  const handleViews = async () => {
    console.log(video._id);
    await axios.put(`/videos/view/${video._id}`);
  };

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <>
      <div
        onClick={handleViews}
        className="flex flex-col max-w-[360px] cursor-pointer left-0 right-0 mx-auto w-full"
      >
        <Link
          to={`/video/${video._id}`}
          className=" w-full h-full"
          style={{ textDecoration: "none" }}
        >
          <div className="thumbnail relative w-full h-2/3">
            <img
              src={video.imgUrl}
              alt="Thumbnail"
              className=" overflow-hidden w-full h-full rounded-2xl hover:scale-105"
            />
            <p className="absolute bottom-[6px] right-1.5 px-2 py-0.5 rounded-md text-xs m-0 bg-black text-white">
              {video.views} views
            </p>
          </div>
          <div className="videoInfo flex mt-[10px] ml-2">
            <img
              src={
                channel.img
                  ? PF + channel.img
                  : require("../Assets/Images/defaultUserIcon.jpeg")
              }
              alt="Channel Logo"
              className="channelLogo w-8 h-8 rounded-full"
            />
            <div className=" ml-2">
              <h2 className="font-normal m-0 text-base leading-5">
                {video.title.length <= 70
                  ? video.title
                  : `${video.title.substr(0, 70)}...`}
              </h2>
              <h3 className="items-center text-sm mt-1">{channel.name}</h3>

              <p className="text-sm">{format(video.createdAt)}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
