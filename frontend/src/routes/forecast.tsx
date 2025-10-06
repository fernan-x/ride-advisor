import Forecast from "@/components/Forecast";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/forecast")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Forecast />;
}
