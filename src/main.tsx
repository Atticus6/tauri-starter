import { PropsWithChildren, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { useTheme } from "@nextui-org/use-theme";

import "./assets/index.css";
import { NextUIProvider } from "@nextui-org/react";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <NextUIProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </NextUIProvider>
    </StrictMode>,
  );
}

function ThemeProvider({ children }: PropsWithChildren) {
  const { theme } = useTheme();
  return (
    <main className={`${theme} bg-background text-foreground`}>{children}</main>
  );
}
