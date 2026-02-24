import './CSS/App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./Pages/Login.tsx";
import MainPage from "./Pages/MainPage.tsx";

const App = () => {

  const router = createBrowserRouter([
      {
          path: "/",
          element: <Login/>
      },
      {
          path: "/main-page",
          element: <MainPage/>
      },
  ])
    return <RouterProvider router={router}/>
}

export default App
