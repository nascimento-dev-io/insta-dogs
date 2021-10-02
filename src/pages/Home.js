import React from "react";

import Feed from "../components/Feed/Feed";
import Head from "../components/Helpers/Head";

const Home = () => {
  return (
    <section className="container main-container">
      <Head title="Fotos" description="Home do Site Dogs, com feed de fotos" />
      <Feed />
    </section>
  );
};

export default Home;
