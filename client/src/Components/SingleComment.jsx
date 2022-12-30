import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";

export const SingleComment = ({ comment }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data);
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <div className="container flex gap-2 my-5 ">
      {channel.img ? (
        <img src={channel.img} alt="" className="rounded-full h-10 w-10" />
      ) : (
        <img
          className="rounded-full h-10 w-10 object-fill"
          src={require("../Assets/Images/defaultUserIcon.jpeg")}
        />
      )}
      <div className="details flex flex-col gap-2">
        <span className="name text-sm font-semibold">
          {channel.name}{" "}
          <span className="text-sm font-normal mr-1">
            {format(comment.createdAt)}
          </span>
        </span>
        <span className="Text ">{comment.desc}</span>
      </div>
    </div>
  );
};
