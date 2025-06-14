// src/router.tsx
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import MainLayout from "./layout/MainLayout";
import NoteView from "./components/NoteView";
import EmptyNoteView from "./components/EmptyNoteView";
import { UserProfile } from "./pages/UserProfile";
import { useCaptureContext } from "./context/CaptureContext";

const rootRoute = createRootRoute({
  component: MainLayout,
});

const homeRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: () => <EmptyNoteView />,
});

const capturesRoute = createRoute({
  path: "/captures",
  getParentRoute: () => rootRoute,
  component: () => <EmptyNoteView />,
});

function CaptureDetail() {
  const { selectedCapture } = useCaptureContext();
  return selectedCapture ? (
    <NoteView capture={selectedCapture} />
  ) : (
    <EmptyNoteView />
  );
}

const captureDetailRoute = createRoute({
  path: "/captures/$captureId",
  getParentRoute: () => rootRoute,
  component: CaptureDetail,
});

const foldersRoute = createRoute({
  path: "/folders",
  getParentRoute: () => rootRoute,
  component: () => <EmptyNoteView />,
});

const folderNotesRoute = createRoute({
  path: "/folders/$folderId",
  getParentRoute: () => rootRoute,
  component: () => <EmptyNoteView />,
});

const tagsRoute = createRoute({
  path: "/tags",
  getParentRoute: () => rootRoute,
  component: () => <EmptyNoteView />,
});

const sourceRoute = createRoute({
  path: "/sources/$source",
  getParentRoute: () => rootRoute,
  component: () => <EmptyNoteView />,
});

const clustersRoute = createRoute({
  path: "/clusters",
  getParentRoute: () => rootRoute,
  component: () => <EmptyNoteView />,
});

const clusterNotesRoute = createRoute({
  path: "/clusters/$clusterId",
  getParentRoute: () => rootRoute,
  component: () => <EmptyNoteView />,
});

const bookmarksRoute = createRoute({
  path: "/bookmarks",
  getParentRoute: () => rootRoute,
  component: () => <EmptyNoteView />,
});

const profileRoute = createRoute({
  path: "/profile",
  getParentRoute: () => rootRoute,
  component: () => <UserProfile />,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  capturesRoute,
  captureDetailRoute,
  foldersRoute,
  folderNotesRoute,
  tagsRoute,
  sourceRoute,
  clustersRoute,
  clusterNotesRoute,
  bookmarksRoute,
  profileRoute,
]);

export const router = createRouter({ routeTree });
