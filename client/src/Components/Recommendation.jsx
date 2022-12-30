import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";

export const Recommendation = ({ video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <div className="w-[80%] left-0 right-0 mx-auto md:w-full h-56 cursor-pointer ">
      <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
        <div className="flex w-full h-full p-2  gap-3 mb-3 ">
          <img
            className="w-1/2 flex-1 h-32 top-0 bottom-0 my-auto"
            src={video.imgUrl}
          />

          <div className="flex flex-col flex-1 items-start">
            <div className="top-0 bottom-0 my-auto">
              <h1 className="text-xl font-semibold">{video.title}</h1>

              <h2 className="">{channel.name}</h2>
              <div className="text-xs">{video.views} views</div>
              <div className="text-xs">{format(video.createdAt)}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
