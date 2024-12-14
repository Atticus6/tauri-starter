import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/tray")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/tray"!</div>;
}
