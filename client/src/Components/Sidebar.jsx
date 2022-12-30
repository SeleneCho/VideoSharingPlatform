import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import axios from "axios";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedId, setSelectedId] = useState("home");
  const { isSideOpen } = useSelector((state) => state.general);
  const [subUserList, setSubUsersList] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const imgPath = "http://localhost:8000/images/";

  useEffect(() => {
    const fetchSubList = async () => {
      const res = await axios.get(`/users/sublist`);
      setSubUsersList(res.data);
    };
    fetchSubList();
  }, [currentUser]);

  const sideBarData = {
    mainTabs: [
      {
        head: "Home",
        icon: "home",
        path: "",
      },
      {
        head: "Explore",
        icon: "explore",
        path: "trends",
      },
      {
        head: "Shorts",
        icon: "bolt",
        path: "",
      },
      {
        head: "Subscriptions",
        icon: "subscriptions",
        path: "subscriptions",
      },
    ],
    externalTabs: [
      {
        head: "Library",
        icon: "video_library",
        path: "library",
      },
      {
        head: "Your Videos",
        icon: "smart_display",
        path: "mypage",
      },
      {
        head: "Watch Later",
        icon: "browse_gallery",
        path: "watchlater",
      },
      {
        head: "Liked Vides",
        icon: "thumb_up_off",
        path: "liked",
      },
    ],

    settings: [
      {
        head: "Settings",
        icon: "settings",
        path: "account",
      },
      {
        head: "Report History",
        icon: "flag",
        path: "",
      },
      {
        head: "Help",
        icon: "help",
        path: "",
      },
      {
        head: "Send Feedback",
        icon: "sms_failed",
        path: "",
      },
    ],
  };

  return (
    <>
      <div className={` ${isSideOpen ? "" : "close"}`} id="sidebarContainer">
        <div
          className="closedSidebar hidden fixed h-full pt-14 pr-2 pb-0 pl-2"
          id="closedSidebar"
        >
          {sideBarData.mainTabs.map((tab, i) => {
            return (
              <Link to={tab.path} key={i}>
                <div
                  key={i}
                  className={`closedSidebarTab flex flex-col cursor-pointer items-center rounded-lg py-2.5 px-0  ${
                    tab.icon === selectedId && "active"
                  }`}
                  onClick={() => setSelectedId(tab.icon)}
                >
                  <span className="material-symbols-rounded text-2xl">
                    {tab.icon}
                  </span>
                  <p className="m-0 mt-1 text-xs">{tab.head}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="overflow-auto" id="sidebarContainer">
          <div className="expandedSidebar fixed top-0 left-0 box-border pt-2.5 pr-3 pb-0 pl-3 border-b-4 border-b-transparent border-r-transparent border-r-4 w-64 overflow-auto mt-14 z-10">
            <div className="w-full">
              {/* search bar */}
              <div className="sm:hidden flex items-center w-full h-10 mb-3 ">
                <div className="searchBox relative flex items-center">
                  <input
                    className=" outline-none text-base py-1 px-1 w-full rounded-xl mr-1"
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
                  className="searchButton flex justify-center items-center ml-2 h-7 w-7  rounded-full"
                >
                  <span className="cursor-pointer material-symbols-rounded">
                    search
                  </span>
                </div>
              </div>
              <h2 className="m-0 font-medium text-lg ml-2.5 mt-5 mb-3">Home</h2>

              {sideBarData.mainTabs.map((tab, i) => {
                return (
                  <Link to={tab.path} key={i}>
                    <div
                      key={i}
                      className={`sideTab flex justify-start py-1.5 px-3 rounded-lg items-center cursor-pointer text-sm ${
                        tab.icon === selectedId && "active"
                      }`}
                      onClick={() => setSelectedId(tab.icon)}
                    >
                      <span className="material-symbols-rounded text-3xl mr-4">
                        {tab.icon}
                      </span>
                      {tab.head}
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className=" bg-zinc-600 w-full h-[1px] my-2 mx-0 relative "></div>

            {currentUser && (
              <>
                <div className="tabContainer">
                  <h2 className="m-0 font-medium text-lg ml-2.5 mt-5 mb-3">
                    My Page
                  </h2>
                  {sideBarData.externalTabs.map((tab, i) => {
                    return (
                      <Link to={tab.path} key={i}>
                        <div
                          key={i}
                          className={`sideTab flex justify-start py-1.5 px-3 rounded-lg items-center cursor-pointer text-sm ${
                            tab.icon === selectedId && "active"
                          }`}
                          onClick={() => setSelectedId(tab.icon)}
                        >
                          <span className="material-symbols-rounded text-3xl mr-4">
                            {tab.icon}
                          </span>
                          {tab.head}
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className=" bg-zinc-600 w-full h-[1px] my-2 mx-0 relative "></div>

                <div className="subscriptions">
                  <h2 className="m-0 font-medium text-lg ml-2.5 mt-5 mb-3">
                    Subscriptions
                  </h2>

                  {subUserList.map((sub) => {
                    return (
                      <div
                        className="subChannels flex justify-start w-full py-2 px-3 box-border items-center no-underline cursor-pointer rounded-lg"
                        key={sub.name}
                      >
                        <img
                          className="w-8 h-8 rounded-full mr-3 object-cover"
                          src={
                            sub.img
                              ? imgPath + sub.img
                              : require("../Assets/Images/defaultUserIcon.jpeg")
                          }
                        />
                        <p className="m-0 text-base">{sub.name}</p>
                      </div>
                    );
                  })}
                </div>

                <div className=" bg-zinc-600 w-full h-[1px] my-2 mx-0 relative "></div>
              </>
            )}
            <div className="tabContainer">
              {sideBarData.settings.map((tab, i) => {
                return (
                  <Link to={tab.path} key={i}>
                    <div
                      key={i}
                      className={`sideTab flex justify-start py-1.5 px-3 rounded-lg items-center cursor-pointer text-sm ${
                        tab.icon === selectedId && "active"
                      }`}
                      onClick={() => setSelectedId(tab.icon)}
                    >
                      <span className="material-symbols-rounded text-3xl mr-4">
                        {tab.icon}
                      </span>
                      {tab.head}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
