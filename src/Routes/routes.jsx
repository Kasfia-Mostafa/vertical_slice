import { createBrowserRouter } from "react-router";
import Root from "../Components/Pages/Root/Root";
import ErrorPage from "../Components/Pages/ErrorPage/ErrorPage";
import HomePage from "../Components/Pages/HomePage/Homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: HomePage,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const maxFee = url.searchParams.get("maxFee");
          const country = url.searchParams.get("country");
          const degree = url.searchParams.get("degree");
          const response = await fetch(
            `https://vertical-slice-backend.vercel.app/api/universities?maxFee=${
              maxFee || ""
            }&country=${country || ""}&degree=${degree || ""}`
          );
          return response.json();
        },
      },
    ],
  },
]);
