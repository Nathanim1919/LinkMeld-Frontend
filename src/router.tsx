// src/router.tsx
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import MainLayout from "./layout/MainLayout";
import { UserProfile } from "./pages/UserProfile";

const rootRoute = createRootRoute({
  component: MainLayout,
});


const homeRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: () => null, // Handled in MiddlePanel
});

const capturesRoute = createRoute({
  path: "/captures",
  getParentRoute: () => rootRoute,
  component: () => null, // handled in MiddlePanel
});


const profileRoute = createRoute({
  path: "/profile",
  getParentRoute: () => rootRoute,
  component: () => UserProfile,
});

const captureDetailRoute = createRoute({
  path: "/captures/$captureId",
  getParentRoute: () => rootRoute,
  component: () => null,
});

const foldersRoute = createRoute({
  path: "/folders",
  getParentRoute: () => rootRoute,
  component: () => null,
});

const folderNotesRoute = createRoute({
  path: "/folders/$folderId",
  getParentRoute: () => rootRoute,
  component: () => null,
});

const tagsRoute = createRoute({
  path: "/tags",
  getParentRoute: () => rootRoute,
  component: () => null,
});

const tagNotesRoute = createRoute({
  path: "/tags/$tagId",
  getParentRoute: () => rootRoute,
  component: () => null,
});

const clustersRoute = createRoute({
  path: "/clusters",
  getParentRoute: () => rootRoute,
  component: () => null,
});

const clusterNotesRoute = createRoute({
  path: "/clusters/$clusterId",
  getParentRoute: () => rootRoute,
  component: () => null,
});

const bookmarksRoute = createRoute({
  path: "/bookmarks",
  getParentRoute: () => rootRoute,
  component: () => null,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  capturesRoute,
  captureDetailRoute,
  foldersRoute,
  folderNotesRoute,
  tagsRoute,
  tagNotesRoute,
  clustersRoute,
  clusterNotesRoute,
  bookmarksRoute,
  profileRoute,
]);

export const router = createRouter({ routeTree });
