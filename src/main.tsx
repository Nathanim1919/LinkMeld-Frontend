import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CaptureProvider } from "./context/CaptureContext.tsx";
import { UIProvider } from "./context/UIContext.tsx";
import { FolderProvider } from "./context/FolderContext.tsx";
import { SourceProvider } from "./context/sourceContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CaptureProvider>
      <UIProvider>
        <FolderProvider>
          <SourceProvider>
            <App />
          </SourceProvider>
        </FolderProvider>
      </UIProvider>
    </CaptureProvider>
 </StrictMode>
);
