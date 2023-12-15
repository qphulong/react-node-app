import React from "react";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import RightBar from "./components/rightBar/RightBar"
import LeftBar from "./components/leftBar/LeftBar"
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile"
import { Navigate } from "react-router-dom";
function App() {

  //Protected Route
  const currentUser = true

  //Layout for main page
  //Outlet duoc su dung trong viec quan ly cac route long nhau
  //Layout contains outlet. Cac route con nhu Home, Add friends, Profile se duoc hien thi trong outlet
  const Layout = () => {
    return(
      <div>
        <NavBar/>
        <div style={{display: "flex"}}>
            <LeftBar/>
            <Outlet/>
            <RightBar/>
        </div>
      </div>
    )
  }
  
  // ProtectedRoute duoc su dung de bat buoc nguoi dung phai login truoc khi vao main page
  // Neu khong web se tu dong chuyen ve login
  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to='/login'/>
    }

    return children
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/profile/:id",
          element: <Profile/>
        }
      ]
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
