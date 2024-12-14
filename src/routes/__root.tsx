import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { getCurrentWindow } from "@tauri-apps/api/window";

export const Route = createRootRoute({
  component: () => {
    useEffect(() => {
      const view = getCurrentWindow();
      const check = async () => {
        const isVisible = await view.isVisible();
        if (!isVisible && view.label !== "tray") {
          view.show();
        }
      };
      check();
    }, []);

    return (
      <>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});
