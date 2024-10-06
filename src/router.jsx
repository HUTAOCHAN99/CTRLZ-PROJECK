import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { MyDestination } from "./pages/mydestination/MyDestination";
import { MyDestinationDetails } from "./pages/mydestination-details/MyDestinationDetails";
import AboutUs from "./pages/aboutus/AboutUs";
import { Layout } from "./Layout";
import {Destination} from "./pages/destination/Destination";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "",
          element: <Home/>
        },
        {
          path: "mydestination",
          element: <MyDestination/>
        },
        {
          path: "mydestination/:id",
          element: <MyDestinationDetails/>
        },
        {
          path: "aboutus",
          element: <AboutUs/>
        },
        {
          path:"destination/:id",
          element: <Destination/>
        }

      ]
    },

  ])