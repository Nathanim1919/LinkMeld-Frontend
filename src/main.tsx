import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CaptureProvider } from "./context/CaptureContext.tsx";
import { UIProvider } from "./context/UIContext.tsx";
import { FolderProvider } from "./context/FolderContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CaptureProvider>
      <UIProvider>
        <FolderProvider>
          <App />
        </FolderProvider>
      </UIProvider>
    </CaptureProvider>
  </StrictMode>
);
