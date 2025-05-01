import { createBrowserRouter } from "react-router";
import SearchPage from "./pages/SearchPage";
import Template from "./pages/Template";
import ForecastPage, { ForecastLoader } from "./pages/ForecastPage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Template />,
    children: [
      {
        path: "/",
        loader: ForecastLoader,
        element: <ForecastPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);
