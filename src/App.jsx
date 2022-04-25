import { Routes, Route } from "react-router";
import { useState } from "react";

import Header from "./components/Header";
import Articles from "./components/Articles";
import SingleArticle from "./components/Single-article";
import RouteMissing from "./components/Route-missing";

// const user = "grumpy19";

function App() {
  const [user, setUser] = useState({});
  return (
    <>
      <Header setUser={setUser} user={user} />
      <Routes>
        <Route path="/" element={<Articles user={user} />} />
        <Route path="/articles" element={<Articles user={user} />} />
        <Route
          path="/articles?topic=:topic"
          element={<Articles user={user} />}
        />
        <Route
          path="/articles/:article_id"
          element={<SingleArticle user={user} />}
        />
        <Route path="*" element={<RouteMissing user={user} />} />
      </Routes>
    </>
  );
}

export default App;
