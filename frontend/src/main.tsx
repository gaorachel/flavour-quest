import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QuestFrom } from "./routes/QuestForm";
import { Results } from "./routes/Results";
import { createStandaloneToast } from "@chakra-ui/toast";
import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuestFrom />,
  },
  {
    path: "/results",
    element: <Results />,
  },
]);

const { ToastContainer, toast } = createStandaloneToast();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ChakraProvider>
  </React.StrictMode>
);
