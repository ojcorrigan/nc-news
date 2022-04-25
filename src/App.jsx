import { Routes, Route } from "react-router";
import { useState } from "react";

import Header from "./components/Header";
import Articles from "./components/Articles";
import SingleArticle from "./components/Single-article";
import RouteMissing from "./components/Route-missing";

function App() {
  const [user, setUser] = useState({});
  const [err, setErr] = useState(null);
  return (
    <>
      <Header setUser={setUser} user={user} />
      <Routes>
        <Route
          path="/"
          element={<Articles user={user} err={err} setErr={setErr} />}
        />
        <Route
          path="/articles"
          element={<Articles err={err} setErr={setErr} />}
        />
        <Route
          path="/articles?topic=:topic"
          element={<Articles user={user} err={err} setErr={setErr} />}
        />
        <Route
          path="/articles/:article_id"
          element={<SingleArticle user={user} err={err} setErr={setErr} />}
        />
        <Route
          path="*"
          element={<RouteMissing user={user} err={err} setErr={setErr} />}
        />
      </Routes>
    </>
  );
}

export default App;
