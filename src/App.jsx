import { Routes, Route, useParams } from "react-router";

import Header from "./components/Header";
import Articles from "./components/Articles";
import SingleArticle from "./components/Single-article";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </>
  );
}

export default App;
