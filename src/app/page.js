import HomeView from "@src/views/home";
import React, { Suspense } from "react";

const Home = () => {
  return (
    <Suspense>
      <HomeView />
    </Suspense>
  );
};

export default Home;
