import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";

import { Provider } from "react-redux";
import { store } from "./store/store";
import ProtectedRoute from "./components/ProtectedRoute";

import Toast from "../src/components/Toast";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "profile/",
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit",
            element: (
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <Toast />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
