// MiddlePanel.tsx
import { useRouterState } from "@tanstack/react-router";
import NotesList from "./NotesList";
import { SmartFolderPreviewGrid } from "./SmartOrganizers/SmartFolderCard";
import { SmartTagListPreview } from "./SmartOrganizers/SmartTagCard";
import { SmartClusterListPreview } from "./SmartOrganizers/SmartClusterCard";
import { useUI } from "../context/UIContext";
import { UserProfile } from "../pages/UserProfile";

export const MiddlePanel = () => {
  const router = useRouterState();
  const {middlePanelCollapsed} = useUI();

  if (middlePanelCollapsed) {
    return null;
  }

  // for profile page
  if (router.location.pathname.startsWith("/profile")) {
    return <UserProfile />;
  }

  if (router.location.pathname.startsWith("/tags/")) {
    return <NotesList filter="tag" />;
  }

  if (router.location.pathname.startsWith("/captures/")) {
    return <NotesList filter="all" />;
  }

  if (router.location.pathname.startsWith("/bookmarks")) {
    return <NotesList filter="bookmarks" />;
  }

  if (router.location.pathname.startsWith("/clusters/")) {
    return <NotesList filter="cluster" />;
  }

  if (router.location.pathname === "/folders") {
    return <SmartFolderPreviewGrid />;
  }

  if (router.location.pathname === "/sources") {
    return <SmartTagListPreview />;
  }

  if (router.location.pathname === "/clusters") {
    return <SmartClusterListPreview />;
  }

  return <NotesList />;
};
