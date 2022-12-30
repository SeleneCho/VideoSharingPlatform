import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Account() {
  const { currentUser } = useSelector((state) => state.user);
  const [newName, setNewName] = useState("");
  const [successImg, setSuccessImg] = useState(false);
  const [successUsername, setSuccessUsername] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const [file, setFile] = useState("");
  const imgPath = "http://localhost:8000/images/";

  const handleImgSubmit = async (e) => {
    e.preventDefault();
    const updatedAccount = {};

    if (file) {
      const data = new FormData();
      setImgError(false);
      setNameError(false);
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedAccount.img = filename;
      try {
        await axios.post("upload", data);
      } catch (err) {}
      try {
        const res = await axios.put(
          `/users/${currentUser?._id}`,
          updatedAccount
        );
        console.log(currentUser.img);
        setSuccessImg(true);
      } catch (err) {}
    }

    if (!file) {
      setImgError(true);
    }
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (newName) {
      setNameError(false);
      setImgError(false);
      const updatedAccount = {
        name: newName,
      };
      try {
        const res = await axios.put(
          `/users/${currentUser?._id}`,
          updatedAccount
        );
        console.log(currentUser.img);
        setSuccessUsername(true);
      } catch (err) {}
    }
    if (!newName) {
      setNameError(true);
    }
  };

  return (
    <div className="relative pt-60px pl-72px w-full h-full min-h-screen flex gap-y-10 gap-x-7 overflow-auto justify-center ">
      <div className="w-2/3 ">
        <h2 className="pt-3 pb-6 text-lg">Account</h2>

        {/* top */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl pb-2">
              Choose how you appear and what you see on YouTube
            </h1>
            <p className="text-zinc-500 font-light">
              Signed in as {currentUser?.email}
            </p>
          </div>
          <img
            className="w-44"
            src={require("../Assets/Images/accountImg.png")}
          />
        </div>
        <div className="HorizontalLine w-full h-[1px] bg-zinc-200 my-4"></div>
        {/* middle */}
        <div className="flex flex-col">
          <div className="Title">
            <h2 className="text-lg">Your YouTube channel</h2>
            <p className="text-zinc-500 font-light text-sm">
              This is your public presence on YourVideos.You need a channel to
              upload your own videos, comment on videos, or create playlists
            </p>
          </div>
          <div className="flex space-x-32 py-4">
            <h2 className="text-sm w-fit ">Your Channel</h2>
            <div className="flex flex-col gap-3 ml-0">
              <div className="flex space-x-5 items-center">
                <img
                  className="w-14 h-14 rounded-full object-cover"
                  src={
                    currentUser.img
                      ? imgPath + currentUser.img
                      : require("../Assets/Images/defaultUserIcon.jpeg")
                  }
                />
                <h2 className="text-sm">{currentUser?.name}</h2>
              </div>
              <div className="space-y-6">
                <form
                  className="flex justify-between items-start"
                  onSubmit={handleImgSubmit}
                >
                  <input
                    type="file"
                    id="fileInput"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="border h-8 w-3/4 rounded
                    "
                  />

                  <button
                    className="bg-red-500 m-0 text-white font-semibold text-sm hover:bg-red-400 rounded-lg w-20 p-1 "
                    type="submit"
                  >
                    Update
                  </button>
                </form>
                {successImg && (
                  <h2
                    style={{
                      color: "green",
                      marginTop: "20px",
                    }}
                  >
                    Profile Image has been updated!
                  </h2>
                )}
                {imgError && (
                  <h2
                    style={{
                      color: "red",
                      marginTop: "15px",
                    }}
                  >
                    File Required!
                  </h2>
                )}
                <form
                  className="flex justify-between items-center"
                  onSubmit={handleNameSubmit}
                >
                  <input
                    type="text"
                    placeholder="New Username"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="border rounded-md h-8 w-3/4 "
                  />
                  <button
                    className="bg-red-500 text-white font-semibold text-sm hover:bg-red-400 rounded-lg w-20 p-1 "
                    type="submit"
                  >
                    Update
                  </button>
                </form>
                {successUsername && (
                  <h2
                    style={{
                      color: "green",
                      marginTop: "15px",
                    }}
                  >
                    Username has been updated!
                  </h2>
                )}
                {nameError && (
                  <h2
                    style={{
                      color: "red",
                      marginTop: "20px",
                    }}
                  >
                    Name Required!
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
