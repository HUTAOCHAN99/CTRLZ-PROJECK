import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { MyDestination } from "./pages/mydestination/MyDestination";
import { MyDestinationDetails } from "./pages/mydestination-details/MyDestinationDetails";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/mydestination",
      element: <MyDestination/>
    },
    {
      path: "/mydestination/:id",
      element: <MyDestinationDetails/>
    }
  ])