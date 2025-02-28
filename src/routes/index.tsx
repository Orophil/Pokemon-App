import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeComponentPage from "../pages/HomeComponentPage";
import DetailsPage from "../pages/DetailsPage";
const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeComponentPage />,
    },
    {
        path:'/details-page',
        element:<DetailsPage/>
    }
]);
const RouterApp: React.FC = () => {
    return <RouterProvider router={router} />;
  };
  export default RouterApp;
  