import OurTeam from "./OurTeam";
import { Outlet, ScrollRestoration } from "react-router-dom";

export default function AboutUs() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
      <OurTeam />
    </>
  );
}
