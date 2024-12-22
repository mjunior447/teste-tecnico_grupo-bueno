import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import CreateUser from "./pages/CreateUser.tsx";
import UpdateUser from "./pages/UpdateUser.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="create-user" element={<CreateUser />} />
        <Route path="update-user" element={<UpdateUser />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
  </StrictMode>
);
