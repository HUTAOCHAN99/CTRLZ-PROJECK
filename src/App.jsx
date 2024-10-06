import Header from "./Header"; 
import "./App.css";
import Footer from "./Footer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { MyDestination } from "./pages/mydestination/MyDestination";
import { router } from "./router";

export default function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}
