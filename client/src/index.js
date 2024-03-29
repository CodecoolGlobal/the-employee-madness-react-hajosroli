import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";
import RobertPage from "./Pages/RobertPage";
import EquipmentList from "./Pages/EquipmentList";
import EquipmentCreator from "./Pages/EquipmentCreator";
import EquipmentUpdater from "./Pages/EquipmentUpdater";
import MissingEmployees from "./Pages/Missing";
import TopPaid from "./Pages/TopPaid";
import Tools from "./Pages/Tools";
import Kittens from "./Pages/Kittens";
import Experience from "./Pages/Experience";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/robert",
        element: <RobertPage />
      },
      {
        path: "/equipment",
        element: <EquipmentList />
      },
      {
        path: "/missing",
        element: <MissingEmployees />
      },
      {
        path: "/create-equipment",
        element: <EquipmentCreator />
      },
      {
        path: "/update-equipment/:id",
        element: <EquipmentUpdater />
      },
      {
        path: "/top-paid",
        element: <TopPaid />
      },
      {
        path: "/tools",
        element: <Tools />
      },
      {
        path: "/kittens/:id",
        element: <Kittens />
      },
      {
        path: "/years-of-experience/:experience",
        element: <Experience />
      }
,

    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
