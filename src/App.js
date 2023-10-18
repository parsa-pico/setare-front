// import Home from "./Components/Home";
import AddUserForm from "./Components/AddUser";
import CoursesList from "./Components/CoursesList";
import LoginPage from "./Components/Login";
import MenuBar from "./Components/MenuBar";
import Times from "./Components/Times";
import { Routes, Route, useLocation } from "react-router-dom";
import { getToken } from "./Services/authService";
import Users from "./Components/Users";
import AddCourse from "./Components/AddCourse";
import UpdateCourse from "./Components/UpdateCourse";
import { useEffect, useState } from "react";
import ResetPass from "./Components/ResetPass";

function App() {
  const loc = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [loc]);
  return (
    <div className="App">
      {getToken() && <MenuBar />}
      <Routes>
        <Route path="/" exact element={<LoginPage />} />
        <Route path="/times" element={<Times />} />
        <Route path="/add-student" element={<AddUserForm />} />
        <Route path="/courses" element={<CoursesList />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/update-course" element={<UpdateCourse />} />
        <Route path="/students" element={<Users />} />
        <Route path="/reset-pass" element={<ResetPass />} />
      </Routes>
    </div>
  );
}

export default App;
