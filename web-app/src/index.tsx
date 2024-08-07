import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import TrendingGifs from './gifs/TrendingGifs';
import SearchGifs from './gifs/SearchGifs';
import Login from './auth/Login';
import { AuthContext, AuthProvider } from './auth/AuthContext';
import Orders from './orders/Orders';

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet/>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "orders",
        element: <Orders/>,
      },
      {
        element: <PrivateRoutes/>,
        children: [
          {
            path: "trending",
            element: <TrendingGifs/>,
          },
          {
            path: "search",
            element: <SearchGifs/>,
          },
          {
            path: "orders",
            element: <Orders/>,
          },
        ],
      },
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
