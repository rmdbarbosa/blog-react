import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Post from "./pages/Post";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:slug" element={<Post />} />
    </Routes>
  );
}

export default App;
