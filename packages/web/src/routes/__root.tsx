import { Outlet, createRootRoute } from "@tanstack/react-router";

import { AppProviders } from "@/components/AppProviders";
import { RouteTracker } from "@/components/RouteTracker";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <AppProviders>
      <RouteTracker />
      <Outlet />
    </AppProviders>
  );
}
