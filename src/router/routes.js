import Home from "../pages/Home";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  { path: "*", element: <>Error 404</> },
];
