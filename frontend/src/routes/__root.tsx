import { Navbar } from "@/components/Navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 pb-32 md:p-8 md:pb-32">
    <ReactQueryDevtools />
    <TanStackRouterDevtools />
    <Navbar />

    <Outlet />
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
