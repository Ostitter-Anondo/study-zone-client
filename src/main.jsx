import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import ContextProvider from "./utils/ContextProvider";
import { Toaster } from "react-hot-toast";
import { Routes } from "./routes/Routes";
import { HelmetProvider } from "react-helmet-async";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider >
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={Routes} />
        </HelmetProvider>
      </QueryClientProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </ContextProvider>
  </StrictMode>
);
