import React from "react";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./style.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import RightBar from "./components/rightBar/RightBar";
import LeftBar from "./components/leftBar/LeftBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { Navigate } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Friends from "./pages/friends/Friends";
import Notification from "./pages/notifications/Notifications";
import AddFriend from "./pages/addfriend/AddFriend";
import Invitations from "./pages/invitations/Invitations";
import ForModerator from "./pages/moderatorpage/ForModerator";
import ChangePassword from "./pages/changePassword/ChangePassword";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddFriendTest from "./pages/addfriendtest/AddFriendTest";
import AdminPage from "./pages/adminpage/AdminPage";
import axios from "axios";

function App() {
  window.backendURL = "http://localhost:3001";

  //Protected Route
  const { currentUser } = useContext(AuthContext);

  //get Context
  const { darkMode } = useContext(DarkModeContext);
  // console.log(darkMode);

  //QueryClient
  const queryClient = new QueryClient();

  //Layout for main page
  //Outlet duoc su dung trong viec quan ly cac route long nhau
  //Layout contains outlet. Cac route con nhu Home, Add friends, Profile se duoc hien thi trong outlet
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <NavBar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  // ProtectedRoute duoc su dung de bat buoc nguoi dung phai login truoc khi vao main page
  // Neu khong web se tu dong chuyen ve login
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:userId",
          element: <Profile />,
        },
        {
          path: "/friends",
          element: <Friends />,
        },
        {
          path: "/addfriends",
          element: <AddFriend />,
        },
        {
          path: "/change",
          element: <ChangePassword />,
        },
        {
          path: "/moderators",
          element: <ForModerator />,
        },
        // {
        //   path: "/notifications",
        //   element: <Notification/>
        // }
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/invitations/add-friends/:link",
      element: <Invitations />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
