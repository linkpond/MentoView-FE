import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Test from "./pages/Test";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contactus from "./pages/Contactus";


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/test" element={<Test />} />
          <Route path="/about" element={<About />} />
          <Route path="/service/voice" element={"voice"} />
          <Route path="/service/video" element={"video"} />
          <Route path="/myservice" element={"myservice"} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
