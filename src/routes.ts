import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  {
    path: "about",
    file: "routes/about.tsx",
  },
  route("/tray", "routes/tray/index.tsx"),
  route("*?", "routes/404/index.tsx"),
] satisfies RouteConfig;
