import { Routes, Route } from "react-router";

import Header from "./components/Header";
import Articles from "./components/Articles";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </>
  );
}

export default App;
