import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import { Toaster } from "sonner";

import "./index.css";
import { ClientInformation } from "./08-use-suspense/ClientInformation";
import { getUserAction } from "./08-use-suspense/api/get-user.action";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    {/* <HooksApp /> */}
    <Suspense
      fallback={
        <div className="bg-gradient flex flex-col">
          <h1>Loading client information...</h1>
        </div>
      }
    >
      <ClientInformation getUser={getUserAction(1)} />
    </Suspense>
  </StrictMode>
);
