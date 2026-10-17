import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TaskContextProvider from "./context/TaskContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <TaskContextProvider>
    <App />
    <Toaster />
  </TaskContextProvider>,
);
