import * as React from "react";
import './index.css'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import LikedProducts from "./Components/LikedProducts";
import Home from "./Components/Home";
import Login from './Components/Login';
import Signup from './Components/Signup';
import Addproduct from "./Components/Addproduct";
import ProductDetail from "./Components/ProductDetail";
import Categorypage from "./Components/Categorypage";





const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home />
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path:'/login',
    element:(<Login />)
  }
  ,
  {
    path:'/signup',
    element:(<Signup />)
  }
  ,
  {
    path:'/add-product',
    element:(<Addproduct />)
  }
  ,
  {
    path:'/liked-products',
    element:(<LikedProducts />)
  }
  ,
  {
    path:'/product/:productId',
    element:(<ProductDetail />)
  }
  ,
  {
    path:'/category/:categoryName',
    element:(<Categorypage />)
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)