import { Routes, Route } from "react-router";
import { useState } from "react";

import Header from "./components/Header";
import Articles from "./components/Articles";
import SingleArticle from "./components/Single-article";
import RouteMissing from "./components/Route-missing";

// const user = "grumpy19";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles?topic=:topic" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="*" element={<RouteMissing />} />
      </Routes>
    </>
  );
}

export default App;
