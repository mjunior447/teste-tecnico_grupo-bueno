import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "./components/ui/toaster.tsx";
import "./index.css";
import CreateUser from "./pages/CreateUser.tsx";
import Home from "./pages/Home.tsx";
import UpdateUser from "./pages/UpdateUser.tsx";
import { UserContextProvider } from "./contexts/UserContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="update-user/:id" element={<UpdateUser />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
    <Toaster />
  </StrictMode>
);
