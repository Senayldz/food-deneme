import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup"
import PrivateRoute from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:[
        {
            path:"/",
            element: <Home/>
        },
        {
          path:"/menu",
          element: <Menu/>
        },
        {
          path:"/update-profile",
          element: <UpdateProfile/>
        },
        {
          path:"/cart-page",
          element: <CartPage/>
        }

    ]
  },
  {
    path:"/signup",
    element: <Signup/>
  },
  {
    path:"/dashboard",
    element: <PrivateRoute> <DashboardLayout/></PrivateRoute>,
    children:[
      {
        path:'',
        element: <Dashboard/>
      },
      {
        path:'users',
        element: <Users/>
      }
    ]
  },
]);

export default router;