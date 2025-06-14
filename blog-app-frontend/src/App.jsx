import { Routes, Route } from "react-router-dom";
import Home from "./components/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/auth" element={<div>Auth</div>} /> */}
    </Routes>
  );
}
export default App;
