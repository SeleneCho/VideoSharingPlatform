import { SingleComment } from "./SingleComment";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Comments = ({ videoId, userId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [desc, setDesc] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  const handleComments = async () => {
    try {
      const res = await axios
        .post("/comments", {
          videoId,
          userId,
          desc: desc,
        })
        .then(setDesc(""));
      window.location.replace(`/video/${currentVideo?._id}`);
    } catch (err) {}
  };

  return (
    <div className="container ">
      <div className="desc flex items-center gap-2">
        {currentUser?.img ? (
          <img
            src={currentUser?.img}
            alt=""
            className="rounded-full h-10 w-10"
          />
        ) : (
          <img
            className="rounded-full h-10 w-10 object-fill"
            src={require("../Assets/Images/defaultUserIcon.jpeg")}
          />
        )}
        <input
          className="border-none bg-transparent outline-none p-1 w-full"
          placeholder="Add a comment..."
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleComments} className="">
          Submit
        </button>
      </div>
      <div className="CommentsList ">
        {comments.map((comment) => {
          return <SingleComment key={comment._id} comment={comment} />;
        })}
      </div>
    </div>
  );
};
