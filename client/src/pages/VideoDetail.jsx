import React, { useEffect, useState } from "react";
import "./VideoDetail.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import { useSelector, useDispatch } from "react-redux";
import { format } from "timeago.js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import { Comments } from "../Components/Comments";
import { Recommendation } from "../Components/Recommendation";
import { saveVideo } from "../redux/userSlice";

const VideoDetail = () => {
  const [showMoreStatus, setShowMoreStatus] = useState(false);
  const imgPath = "http://localhost:8000/images/";
  const { currentVideo } = useSelector((state) => state.video);
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});
  const [recomVideos, setRecomVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        const videosByTag = await axios.get(
          `/videos/tags?tags=${currentVideo?.tags}`
        );
        setRecomVideos(videosByTag.data);

        setRecomVideos(videosByTag.data);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    if (currentUser) {
      await axios.put(`/users/like/${currentVideo?._id}`);
      dispatch(like(currentUser?._id));
    } else {
      navigate("/signin");
    }
  };
  const handleDislike = async () => {
    if (currentUser) {
      await axios.put(`/users/dislike/${currentVideo?._id}`);
      dispatch(dislike(currentUser?._id));
    } else {
      navigate("/signin");
    }
  };

  const handleSub = async () => {
    currentUser?.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  const handleSave = async () => {
    console.log(currentUser?.watchLater);
    currentUser?.watchLater.includes(currentVideo?._id)
      ? await axios.put(`/users/unsave/${currentVideo?._id}`)
      : await axios.put(`/users/save/${currentVideo?._id}`);
    dispatch(saveVideo(currentVideo?._id));
  };

  return (
    <>
      <div className="videoDetailContainer relative pt-60px pl-[82px] w-full h-full min-h-screen flex flex-col md:flex-row gap-y-10 gap-x-7 overflow-auto">
        <div className="sm:px-5 w-full md:w-[65%] md:pl-8 pt-6">
          <div className="w-full mx-auto">
            <video
              controls
              src={currentVideo?.videoUrl}
              className=" w-full px-5 md:px-0 h-full  object-cover"
            />

            <div className="mt-5">
              <p className="text-xl">{currentVideo?.title}</p>
              <div className="flex justify-between mt-1">
                <div className="text-sm text-gray-400">
                  <span className="after:content-['•'] after:mx-1">
                    {currentVideo?.views}
                  </span>
                  <span> {format(currentVideo?.createdAt)}</span>
                </div>
                <div className="flex items-center gap-4 uppercase">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <button onClick={handleLike}>
                      {currentVideo?.likes?.includes(currentUser?._id) ? (
                        <ThumbUpIcon />
                      ) : (
                        <ThumbUpOutlinedIcon />
                      )}{" "}
                      {currentVideo?.likes?.length}
                    </button>
                  </div>
                  <div
                    onClick={handleDislike}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                      <ThumbDownIcon />
                    ) : (
                      <ThumbDownOffAltOutlinedIcon />
                    )}{" "}
                    Dislike
                  </div>

                  <div
                    onClick={handleSave}
                    className="flex items-center gap-1 cursor-pointer "
                  >
                    {currentUser?.watchLater?.includes(currentVideo?._id) ? (
                      <PlaylistAddCheckOutlinedIcon className="w-10" />
                    ) : (
                      <PlaylistAddOutlinedIcon className="w-10" />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 flex-col border-none border-gray-400 border-2 my-5 pb-3 border-l-transparent border-r-transparent">
                <div className="flex items-center gap-5 mr-5 mt-4">
                  <div>
                    <img
                      src={
                        channel.img
                          ? imgPath + channel.img
                          : require("../Assets/Images/defaultUserIcon.jpeg")
                      }
                      alt="Channel Logo"
                      className=" w-11 h-11 object-cover rounded-full"
                    />
                  </div>
                  <div className="w-5/6">
                    <h5 className="text-sm">
                      <strong>{channel.name}</strong>
                    </h5>
                    <h6 className="text-gray-400 text-xs">
                      {channel.subscribers} subscribers
                    </h6>
                  </div>
                  <div>
                    <button
                      onClick={handleSub}
                      className="uppercase bg-[#FFCACA] font-semibold rounded-md hover:bg-[#FFECEF] p-2 text-sm tracking-wider"
                    >
                      {currentUser?.subscribedUsers?.includes(channel._id)
                        ? "SUBSCRIBED"
                        : "SUBSCRIBE"}
                    </button>
                  </div>
                </div>
                <div
                  className={`${
                    !showMoreStatus ? "max-h-16 overflow-hidden" : ""
                  } text-sm w-11/12`}
                >
                  <pre
                    style={{
                      fontFamily: `"Roboto", sans-serif`,
                    }}
                    className="whitespace-pre-wrap"
                  >
                    {currentVideo?.desc}
                  </pre>
                </div>
                <button
                  className="self-start text-xs text-gray-600"
                  onClick={() => setShowMoreStatus(!showMoreStatus)}
                >
                  {showMoreStatus ? "SHOW LESS" : "SHOW MORE"}
                </button>
                <div></div>
                <hr />
                <Comments
                  videoId={currentVideo?._id}
                  userId={currentUser?._id}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-5 md:px-0 md:w-2/6 pt-6 flex flex-col gap-3">
          {recomVideos?.map((video) => {
            return <Recommendation key={video._id} video={video} />;
          })}
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
