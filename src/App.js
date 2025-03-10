import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Test from "./pages/Test";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
import MyService from "./pages/Myservice.js";
import Detail from "./pages/Detail";
import MyPage from "./pages/MyPage.js"
import VoiceService from "./pages/VoiceService.js";
import GoogleLogin from "./components/GoogleLogin.js";
import FormLogin from "./components/FormLogin.js";
import { useTokenRefresh } from "./hooks/useTokenRefresh.js";

function App() {
  useTokenRefresh();
  
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/test" element={<Test />} />
          <Route path="/about" element={<About />} />
          <Route path="/service/voice" element={<VoiceService />} />
          <Route path="/service/video" element={"video"} />
          <Route path="/myservice" element={<MyService />} />
          <Route path="/myservice/:interviewId" element={<Detail />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
        <Route path="/google-login" element={<GoogleLogin />} />
        <Route path="/form-login" element={<FormLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
