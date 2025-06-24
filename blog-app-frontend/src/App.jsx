import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import WriteBlog from "./userPages/writeBlog";
import Blog from "./components/blog";
import UserBlogs from "./userPages/userBlogs";
import ViewBlog from "./userPages/viewBlog";
import Library from "./userPages/library";
import AdminPanel from "./adminPages/adminPanel";
import Profile from "./userPages/profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/write" element={<WriteBlog />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/my-blogs" element={<UserBlogs />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/library" element={<Library />} />
      <Route path="/my-blog" element={<ViewBlog />} />
      <Route path="/adminPanel" element={<AdminPanel />} />
    </Routes>
  );
}
export default App;
