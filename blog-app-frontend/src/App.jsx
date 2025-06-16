import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import WriteBlog from "./userPages/writeBlog";
import Blog from "./components/blog";
import UserBlogs from "./userPages/userBlogs";
import ViewBlog from "./userPages/viewBlog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/write" element={<WriteBlog />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/my-blogs" element={<UserBlogs />} />
      <Route path="/my-blog" element={<ViewBlog />} />
    </Routes>
  );
}
export default App;
