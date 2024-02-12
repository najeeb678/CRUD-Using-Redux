import Create from "./components/Create";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Read from "./components/Read";
import Update from "./components/update";
import CustomModal from "./components/CustomModal";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read" element={<Read />} />
        <Route path="/edit/:id" element={<Update />} />
        <Route path="/Modal" element={<CustomModal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
