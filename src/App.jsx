import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UpdateTask from "./pages/UpdateTask";
import AddTask from "./pages/AddTask";
import LandingPage from "./pages/LandingPage";
import RouteChangeHandler from "./components/RouteChangeHandler";

function App() {
  return (
    <BrowserRouter>
      <RouteChangeHandler />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:id/edit" element={<UpdateTask />} />
        <Route path="/add" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
