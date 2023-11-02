import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import LikesPage from "./LikesPage";
import Home from "./Home";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "like",
        element: <LikesPage />,
      },
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
