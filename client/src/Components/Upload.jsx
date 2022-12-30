import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeUpload } from "../redux/generalSlice";

export const Upload = ({ setOpenUpload }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(inputs);
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",

      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running" + imgPerc);
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post("videos", {
      ...inputs,
      tags,
    });
    dispatch(closeUpload());
    res.status === 200 && navigate(`/video/${res.data._id}`);
  };

  return (
    <div className=" fixed w-full h-full top-0 left-0 flex items-center justify-center bg-slate-600 z-50 bg-opacity-75">
      <div className="rounded-md h-[35rem] w-[20rem] sm:h-[30rem] sm:w-[50rem] flex flex-col relative bg-white p-5 text-black ">
        <div
          className="Close absolute top-2 cursor-pointer h-fit right-3 hover:scale-105 hover:shadow-md"
          onClick={() => dispatch(closeUpload())}
        >
          <CloseOutlinedIcon />
        </div>
        <h1 className="text-center mb-5 text-xl">Upload a video</h1>
        <div className="sm:flex justify-between items-start">
          <div className="flex flex-col w-full mr-5">
            <label className="mb-1 font-light">Description</label>
            <input
              className="text-black mb-5 p-1 border-2 rounded-md"
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
            <textarea
              className="text-black mb-5 p-1 border-2 rounded-md h-20  sm:h-52"
              placeholder="Description"
              name="desc"
              rows={8}
              onChange={handleChange}
            />
            <input
              className="text-black border mb-5 p-1 rounded-md"
              type="text"
              placeholder="Separate the tags with commas."
              onChance={handleTags}
            />
          </div>

          <div>
            <div className="mb-8 flex flex-col">
              <label className="mb-1 font-light">Select a video</label>
              <input
                className="border z-50 w-full rounded-sm"
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0])}
              />
              <p className="text-xs">
                {100 > videoPerc &&
                  videoPerc > 0 &&
                  "Uploading:" + videoPerc + "%"}
              </p>
              <p className="text-green-400 text-xs">
                {videoPerc === 100 && "Upload Successful!"}
              </p>
            </div>

            <div className="mb-2 flex flex-col">
              <label className="mb-1 font-light">Video thumbnails</label>

              <input
                className="border z-50 w-fill rounded-sm"
                type="file"
                accept="image/*"
                onChange={(e) => setImg(e.target.files[0])}
              />
              <p className="text-xs">
                {100 > imgPerc && imgPerc > 0 && "Uploading:" + imgPerc + "%"}
              </p>
              <p className="text-green-400 text-xs">
                {imgPerc === 100 && "Upload Successful!"}
              </p>
            </div>
          </div>
        </div>

        <button
          className="bottom-0 my-auto bg-blue-500 hover:bg-blue-300 rounded-lg w-fit px-4 py-1 left-0 right-0 mx-auto"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
};
