import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DependenciesProvider } from "@/modules/di";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";

import "./index.css";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

const queryClient = new QueryClient();
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DependenciesProvider>
        <MantineProvider
          theme={{ primaryColor: "indigo", defaultRadius: "md" }}
        >
          <RouterProvider router={router} />
        </MantineProvider>
      </DependenciesProvider>
    </QueryClientProvider>
  </StrictMode>
);
