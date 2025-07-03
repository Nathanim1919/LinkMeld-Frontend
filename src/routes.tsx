// src/router.tsx
import {
  createRootRoute,
  createRoute,
  createRouter,
  useParams,
} from "@tanstack/react-router";
import { MainShell } from "./layout/MainShell";
import { ContentLayout } from "./layout/ContentLayout";
import { UserProfile } from "./pages/UserProfile";
import EmptyNoteView from "./components/EmptyNoteView";
import NoteView from "./components/NoteView";
import BookmarkPanel from "./components/panels/BookmarkPanel";
import SourcePanel from "./components/panels/SourcePanel";
import NotesList from "./components/NotesList";
import { useCaptureContext } from "./context/CaptureContext";
import FoldersPanel from "./components/panels/FoldersPanel";
import { PublicLayout } from "./layout/PublicLayout";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { PricingPage } from "./pages/Pricing";
import HeroPage from "./pages/hero";
import { Features } from "./pages/features";
import { FAQ } from "./pages/FAQ";
import { Manifesto } from "./pages/manifesto";
import { FolderLayout } from "./layout/FolderLayout";
import { SourceLayout } from "./layout/SourceLayout";
import { HomeLayout } from "./layout/HomeLayout";
import { CaptureDetail } from "./components/CaptureDetail";
import { BookMarkLayout } from "./layout/BookmarkLayout";

const FolderPanel = () => <FoldersPanel />;

const FolderNotes = () => {
  const { folderId } = useParams({ strict: false });
  return <NotesList filter="folder" folderId={folderId} />;
};

const FolderNoteDetail = () => {
  return <CaptureDetail />;
};

const SourcesPanel = () => <SourcePanel />;

const SourceNotes = () => {
  const { sourceId } = useParams({ strict: false });
  return <NotesList filter="source" sourceId={sourceId} />;
};

const SourceNoteDetail = () => {
  return <CaptureDetail />;
};

const BookmarksPanel = () => <BookmarkPanel />;

const BookmarkDetail = () => {
  return <CaptureDetail />;
};

// --- Routes --- //

const rootRoute = createRootRoute();

// Public routes (wrapped in PublicLayout)
const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public", // It's good practice to give layout routes a unique ID
  component: PublicLayout,
});

// Home route (renders HeroPage) - This is now the index route for publicRoute
const heroRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/",
  component: HeroPage,
});

// Pricing route (renders PricingPage)
const pricingRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "pricing",
  component: PricingPage,
});

const ManifestoRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "manifesto",
  component: Manifesto,
});

const FAQRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "faqs",
  component: FAQ,
});

const FeaturesRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/features",
  component: Features,
});

const RegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "register",
  component: RegisterPage,
});

const LoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  component: LoginPage,
});

// Authenticated routes (wrapped in MainShell)
const mainShellRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "mainShell",
  component: MainShell,
});

const contentRoute = createRoute({
  getParentRoute: () => mainShellRoute,
  path: "/in",
  component: ContentLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => contentRoute,
  path: "/",
  component: EmptyNoteView, // This can be a layout if you want to nest more routes
});

const capturesPanel = createRoute({
  getParentRoute: () => contentRoute,
  path: "captures",
  component: HomeLayout,
});

const captureDetail = createRoute({
  getParentRoute: () => capturesPanel,
  path: "$captureId",
  component: CaptureDetail,
});

const folderLayoutRoute = createRoute({
  getParentRoute: () => contentRoute,
  path: "folders",
  component: FolderLayout, // This can be a layout if you want to nest more routes
});

const foldersPanel = createRoute({
  getParentRoute: () => folderLayoutRoute,
  path: "/",
  component: FolderPanel,
});

const folderNotes = createRoute({
  getParentRoute: () => folderLayoutRoute,
  path: "$folderId",
  component: FolderNotes,
});

const folderNoteDetail = createRoute({
  getParentRoute: () => folderNotes, // This must match the $folderId route
  path: "captures/$captureId",
  component: FolderNoteDetail,
});

const sourceLayoutRoute = createRoute({
  getParentRoute: () => contentRoute,
  path: "sources",
  component: SourceLayout, // This can be a layout if you want to nest more routes
});

const sourcesPanel = createRoute({
  getParentRoute: () => sourceLayoutRoute,
  path: "/",
  component: SourcesPanel,
});

const sourceNotes = createRoute({
  getParentRoute: () => sourceLayoutRoute,
  path: "$sourceId",
  component: SourceNotes,
});

const sourceNoteDetail = createRoute({
  getParentRoute: () => sourceNotes,
  path: "captures/$captureId",
  component: SourceNoteDetail,
});

const BookmarkLayout = createRoute({
  getParentRoute: () => contentRoute,
  path: "bookmarks",
  component: BookMarkLayout, // This can be a layout if you want to nest more routes
});

const bookmarksPanel = createRoute({
  getParentRoute: () => BookmarkLayout,
  path: "/",
  component: BookmarksPanel,
});

const bookmarkDetail = createRoute({
  getParentRoute: () => bookmarksPanel,
  path: "captures/$captureId",
  component: BookmarkDetail,
});

const profileRoute = createRoute({
  getParentRoute: () => mainShellRoute,
  path: "/profile",
  component: UserProfile,
});

// --- Final Tree --- //
export const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([
    heroRoute,
    pricingRoute,
    ManifestoRoute,
    FeaturesRoute,
    FAQRoute,
  ]), // Correctly nest children of PublicLayout
  RegisterRoute,
  LoginRoute,
  mainShellRoute.addChildren([
    contentRoute.addChildren([
      homeRoute,
      capturesPanel.addChildren([captureDetail]),
      folderLayoutRoute.addChildren([
        foldersPanel,
        folderNotes.addChildren([folderNoteDetail]),
      ]),
      sourceLayoutRoute.addChildren([
        sourcesPanel,
        sourceNotes.addChildren([sourceNoteDetail]),
      ]),
      BookmarkLayout.addChildren([bookmarksPanel, bookmarkDetail]),
    ]),
    profileRoute,
  ]),
]);

export const router = createRouter({ routeTree });
