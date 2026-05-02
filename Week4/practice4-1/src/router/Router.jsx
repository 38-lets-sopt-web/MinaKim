import { createBrowserRouter } from "react-router";
import { UserDetail } from "../pages/UserDetail";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/user/:id",
    Component: UserDetail,
  },
]);
