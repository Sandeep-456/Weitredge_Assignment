import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "./index.css";
import App from "./App.jsx";

import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrimeReactProvider value={{ unstyled: false }}>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
);
