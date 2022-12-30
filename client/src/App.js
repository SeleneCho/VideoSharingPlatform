import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import VideoDetail from "./pages/VideoDetail";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";
import { useSelector } from "react-redux";
import Account from "./pages/Account";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/">
            <Route index element={<Home type="random" />} />
            <Route path="trends" element={<Home type="trend" />} />
            <Route path="subscriptions" element={<Home type="sub" />} />
            <Route path="mypage" element={<Home type="mypage" />} />
            <Route path="watchlater" element={<Home type="watchlater" />} />
            <Route path="search" element={<Search />} />
            <Route path="signin" element={<SignIn />} />
            <Route
              path="account"
              element={currentUser ? <Account /> : <SignIn />}
            />
            <Route path="video">
              <Route path=":id" element={<VideoDetail />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
