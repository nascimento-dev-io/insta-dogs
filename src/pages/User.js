import React from "react";
import { Route, Routes } from "react-router";
import Feed from "../components/Feed/Feed";
import Head from "../components/Helpers/Head";
import NotFound from "../components/Helpers/NotFound";
import UserHeader from "../components/User/UserHeader";
import UserPhotoPost from "../components/User/UserPhotoPost";
import UserStats from "../components/User/UserStats";
import { UserContext } from "../UserContext";

const User = () => {
  const { data } = React.useContext(UserContext);
  return (
    <section className="container">
      <Head title="Minha conta" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="/post" element={<UserPhotoPost />} />
        <Route path="/stats" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
