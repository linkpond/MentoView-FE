import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Test from "./pages/Test";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
import MyService from "./pages/MyService.js";
import Detail from "./pages/Detail";
import MyPage from "./pages/MyPage.js"
import VoiceService from "./pages/VoiceService.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/about" element={<About />} />
          <Route path="/service/voice" element={<VoiceService />} />
          <Route path="/service/video" element={"video"} />
          <Route path="/myservice" element={<MyService />} />
          <Route path="/myservice/:id" element={<Detail />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
