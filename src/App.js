import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Test from "./pages/Test";
import Layout from "./components/Layout";


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/test" element={<Test />} />
          <Route path="/about" element={"about"} />
          <Route path="/service/voice" element={"voice"} />
          <Route path="/service/video" element={"video"} />
          <Route path="/myservice" element={"myservice"} />
          <Route path="/contactus" element={"contactus"} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={"signup"} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
