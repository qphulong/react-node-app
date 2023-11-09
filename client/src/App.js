import LeftBar from "./components/leftbar/leftBar";
import NavBar from "./components/navbar/navBar";
import RightBar from "./components/rightbar/rightBar";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
function App() {

  const Layout = () => {
    return(
      <div>
        <NavBar/>
        <div>
            <LeftBar/>
            <Outlet/>
            <RightBar/>
        </div>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [

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
      <div>
          <RouterProvider router={router} />
      </div>
  );
}

export default App;
