import MovieDetailPage from "@/pages/[id]/MovieDetailPage";
import HomePage from "@/pages/home/HomePage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:id",
    element: <MovieDetailPage />,
  },
]);

export default router;
