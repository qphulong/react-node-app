import LeftBar from "./components/leftbar/leftBar";
import NavBar from "./components/navbar/navBar";
import RightBar from "./components/rightbar/rightBar";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
function App() {

  const currentUser = true;

  const Layout = () => {
    return(
      <div>
        <NavBar/>
        <div style={{display: 'flex'}}>
            <LeftBar/>
            <div style={{flex: 6}}>
              <Outlet/>
            </div>
            <RightBar/>
        </div>
      </div>
    )
  }

  const ProtectedRouter = ({children}) => {
    if(!currentUser){
      return <Navigate to={'/login'}/>
    }

    return children
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRouter>
          <Layout/>
        </ProtectedRouter>
      ),
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/profile",
          element: <Profile/>,
        },
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
