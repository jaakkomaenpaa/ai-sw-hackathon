import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "AgriSight" },
    { name: "description", content: "Welcome to AgriSight" },
  ];
}

export default function Home() {
  return <div> Tervetuloo</div>;
}
