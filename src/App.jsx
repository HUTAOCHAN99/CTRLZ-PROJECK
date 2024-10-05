import Header from "./Header"; 
import "./App.css";
import Footer from "./Footer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  }
])

export default function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router}/>
      <Footer />
    </>
  );
}
