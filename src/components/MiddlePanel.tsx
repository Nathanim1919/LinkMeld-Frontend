// MiddlePanel.tsx
import { useRouterState } from "@tanstack/react-router";
import NotesList from "./NotesList";
import { SmartFolderPreviewGrid } from "./SmartOrganizers/SmartFolderCard";
import { SmartTagListPreview } from "./SmartOrganizers/SmartTagCard";
import { SmartClusterListPreview } from "./SmartOrganizers/SmartClusterCard";

export const MiddlePanel = () => {
  const router = useRouterState();

  if (router.location.pathname.startsWith("/folders/")) {
    return <NotesList filter="folder" />;
  }

  if (router.location.pathname.startsWith("/tags/")) {
    return <NotesList filter="tag" />;
  }

  if (router.location.pathname.startsWith("/captures/")) {
    return <NotesList filter="all" />;
  }

  if (router.location.pathname.startsWith("/favourites")) {
    return <NotesList filter="bookmarks" />;
  }

  if (router.location.pathname.startsWith("/clusters/")) {
    return <NotesList filter="cluster" />;
  }

  if (router.location.pathname === "/folders") {
    return <SmartFolderPreviewGrid />;
  }

  if (router.location.pathname === "/tags") {
    return <SmartTagListPreview />;
  }

  if (router.location.pathname === "/clusters") {
    return <SmartClusterListPreview />;
  }

  return <NotesList />;
};
