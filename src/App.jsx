import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export default function App() {
  return (
    <div className="bg-indigo-950 bg-gradient-to-t from-purple-500 h-screen">
      <RouterProvider router={router} />
    </div>
  );
}
