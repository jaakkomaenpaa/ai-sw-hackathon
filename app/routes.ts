import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"), // Main Home Route
  route("openai", "./routes/openai.tsx"), // Internal API Route
] satisfies RouteConfig;

