import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import NotFound from "./components/Helpers/NotFound";
import ProtectedRouter from "./components/Helpers/ProtectedRouter";
import Photo from "./components/Photo/Photo";
import UserProfile from "./components/User/UserProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";
import { UserStorage } from "./UserContext";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <main className="App-body">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login/*" element={<Login />} />
              <ProtectedRouter path="account/*" element={<User />} />
              <Route path="photo/:id" element={<Photo />} />
              <Route path="profile/:user" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
