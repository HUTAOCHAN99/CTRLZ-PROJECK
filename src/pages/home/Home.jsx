import { Outlet, ScrollRestoration } from "react-router-dom";
import Content from "./Content";
import Destinations from "./Destinations";
import Title from "./Title";

export function Home() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
      <Title />
      <Content />
      <Destinations />
    </>
  );
}
