import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/tray")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    document.documentElement.style.backgroundColor = "transparent";
  }, []);
  return (
    <div className="min-h-screen rounded-md bg-background">Hello "/tray"!</div>
  );
}
