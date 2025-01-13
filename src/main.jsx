import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import ContextProvider from "./utils/ContextProvider";
import { Toaster } from "react-hot-toast";
import { Routes } from "./routes/Routes";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider >
      <RouterProvider router={Routes} />
      <Toaster position="top-center" reverseOrder={false} />
    </ContextProvider>
  </StrictMode>
);
