import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals.js";
createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/car-rent-sir/">
    <App />
  </BrowserRouter>
);

reportWebVitals(console.log)