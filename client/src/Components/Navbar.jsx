import React, { useState } from "react";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { openSide, openUpload } from "../redux/generalSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import QueueOutlinedIcon from "@mui/icons-material/QueueOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Upload } from "./Upload";

const Navbar = () => {
  const [isDarkTheme, setisDarkTheme] = useState(true);
  const [openNav, setOpenNav] = useState(false);
  const [search, setSearch] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { isUploadOpen } = useSelector((state) => state.general);
  const imgPath = "http://localhost:8000/images/";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setOpenNav(false);
    navigate("/");
  };

  const handleThemes = () => {
    const rootElement = document.getElementById("root");
    rootElement.classList.toggle("Brown-theme");
    setisDarkTheme(!isDarkTheme);
  };

  return (
    <>
      <header className="fixed font-sans w-screen z-10">
        <div className="Container m-0 py-2 px-4 font-normal w-full h-14 box-border flex justify-between items-center">
          <div className="flex items-center">
            <div className="humburger rounded-full w-10 h-10 justify-center left-0 flex items-center">
              <div
                className="flex flex-col cursor-pointer"
                onClick={() => dispatch(openSide())}
              >
                <MenuOutlinedIcon />
              </div>
            </div>

            <img
              className="h-10 cursor-pointer p-0 ml-3"
              onClick={() => navigate("/")}
              src={require("../Assets/Images/movieIcon.png")}
              alt="Youtube Logo"
              title="Youtube"
            />
            <h1 className="text-xl sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold m-2 ">
              Your Videos
            </h1>
          </div>
          <div className="hidden sm:flex items-center w-1/2 lg:w-full h-10 relative max-w-[650px]">
            <div className="searchBox w-full relative flex items-center">
              <input
                className="  text-base py-[9px] px-1 w-full rounded-xl mr-3"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search !== "" && (
                <span
                  className="material-symbols-rounded absolute right-2 px-2 cursor-pointer"
                  onClick={() => setSearch("")}
                >
                  close
                </span>
              )}
            </div>
            <div
              onClick={() => navigate(`/search?q=${search}`)}
              className="searchButton flex justify-center items-center h-10 w-10 p-1 rounded-full"
            >
              <span className="cursor-pointer material-symbols-rounded">
                search
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <QueueOutlinedIcon
              className="cursor-pointer"
              onClick={() => dispatch(openUpload())}
            />
            <span className="material-symbols-rounded mr-6 text-2xl cursor-pointer">
              notifications
            </span>
            {currentUser ? (
              <img
                className="h-9 w-9 rounded-full cursor-pointer"
                src={
                  currentUser.img
                    ? imgPath + currentUser.img
                    : require("../Assets/Images/defaultUserIcon.jpeg")
                }
                alt="Your Avatar"
                title="Teenage Programmer"
                onClick={() => setOpenNav(!openNav)}
              />
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="cursor-pointer flex items-center space-x-1  text-blue-500 border hover:bg-blue-200 border-zinc-400 p-1.5 rounded-3xl"
              >
                <AccountCircleIcon />
                <p className="text-xs"> SIGN IN</p>
              </button>
            )}
          </div>
        </div>

        {openNav && (
          <div
            className="profileBtns absolute top-16 py-2 px-0 box-border right-5 "
            onClick={() => setOpenNav(false)}
          >
            <div className=" profileTab flex items-center cursor-pointer py-2 px-5 transition-[0.2s]">
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={
                  currentUser.img
                    ? imgPath + currentUser.img
                    : require("../Assets/Images/defaultUserIcon.jpeg")
                }
                alt="Your Avatar"
                title="Avatar"
              />
              <p className="m-0 text-base ml-4 font-light">
                {currentUser.name}
              </p>
            </div>
            <div className=" bg-zinc-600 w-full h-[1px] my-2 mx-0 relative "></div>
            <div className="profileTabs">
              <div className="profileTab flex items-center cursor-pointer py-2 px-5 transition-[0.2s]">
                <span className="material-symbols-rounded text-3xl">
                  account_box
                </span>
                <p className="m-0 text-base ml-4 font-light">Your Channel</p>
              </div>
              <div className="profileTab flex items-center cursor-pointer py-2 px-5 transition-[0.2s]">
                <span className="material-symbols-rounded text-3xl">
                  play_circle
                </span>
                <p className="m-0 text-base ml-4 font-light">Youtube Studio</p>
              </div>
              {currentUser && (
                <div
                  onClick={handleLogout}
                  className="profileTab flex items-center cursor-pointer py-2 px-5 transition-[0.2s]"
                >
                  <span className="material-symbols-rounded text-3xl">
                    logout
                  </span>
                  <p className="m-0 text-base ml-4 font-light">Sign Out</p>
                </div>
              )}
            </div>
            <div className=" bg-zinc-600 w-full h-[1px] my-2 mx-0 relative"></div>
            <div className="profileTabs">
              <div className="profileTab flex items-center cursor-pointer py-2 px-5 transition-[0.2s]">
                <span className="material-symbols-rounded text-3xl">
                  monetization_on
                </span>
                <p className="m-0 text-base ml-4 font-light">
                  Purchase and Memberships
                </p>
              </div>
              <div className="profileTab flex items-center cursor-pointer py-2 px-5 transition-[0.2s]">
                <span className="material-symbols-rounded text-3xl">
                  admin_panel_settings
                </span>
                <p className="m-0 text-base ml-4 font-light">
                  Your Data on Youtube
                </p>
              </div>
            </div>
            <div className=" bg-zinc-600 w-full h-[1px] my-2 mx-0 relative"></div>
            <div className="profileTabs">
              {isDarkTheme && (
                <div
                  className="profileTab flex items-center cursor-pointer py-2 px-5 transition-[0.2s]"
                  onClick={handleThemes}
                >
                  <span class="material-symbols-rounded text-3xl">
                    potted_plant
                  </span>
                  <p className="m-0 text-base ml-4 font-light">Brown Theme</p>
                </div>
              )}
              {!isDarkTheme && (
                <div
                  className="profileTab flex items-center cursor-pointer py-2 px-5 transition-[0.2s]"
                  onClick={handleThemes}
                >
                  <span class="material-symbols-rounded text-3xl">
                    filter_vintage
                  </span>
                  <p className="m-0 text-base ml-4">Lilac Theme</p>
                </div>
              )}
              <div
                onClick={() => navigate("/account")}
                className="profileTab flex items-center cursor-pointer py-2 px-5 transition-[0.2s]"
              >
                <span className="material-symbols-rounded text-3xl">
                  settings
                </span>
                <p className="m-0 text-base ml-4 font-light">Settings</p>
              </div>
            </div>
            <div className=" bg-zinc-600 w-full h-[1px] my-2 mx-0 relative"></div>
            <div className="profileTabs">
              <div className="profileTab flex items-center cursor-pointer py-2 px-5 transition-[0.2s]">
                <span className="material-symbols-rounded text-3xl font-light">
                  help
                </span>
                <p className="m-0 text-base ml-4 font-light">Help</p>
              </div>
              <div className="profileTab flex items-center cursor-pointer py-2 px-5 transition-[0.2s]">
                <span className="material-symbols-rounded text-3xl">
                  sms_failed
                </span>
                <p className="m-0 text-base ml-4 font-light">Send Feedback</p>
              </div>
            </div>
          </div>
        )}
      </header>
      {isUploadOpen && <Upload />}
    </>
  );
};

export default Navbar;
