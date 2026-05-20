import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UserArea from "./pages/UserArea";
import ManagerArea from "./pages/ManagerArea";
import AdminArea from "./pages/AdminArea";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<UserArea />} />
        <Route path="/manager" element={<ManagerArea />} />
        <Route path="/admin" element={<AdminArea />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
