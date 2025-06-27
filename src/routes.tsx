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

const Home = () => <NotesList />;
const CapturesPanel = () => <NotesList filter="all" />;

const CaptureDetail = () => {
  const { selectedCapture } = useCaptureContext();
  return selectedCapture ? (
    <NoteView capture={selectedCapture} />
  ) : (
    <EmptyNoteView />
  );
};

const FolderPanel = () => <FoldersPanel />;

const FolderNotes = () => {
  const { folderId } = useParams({ strict: false });
  return <NotesList filter="folder" folderId={folderId} />;
};

const FolderNoteDetail = () => {
  const { selectedCapture } = useCaptureContext();
  return selectedCapture ? (
    <NoteView capture={selectedCapture} />
  ) : (
    <EmptyNoteView />
  );
};

const SourcesPanel = () => <SourcePanel />;

const SourceNotes = () => {
  const { sourceId } = useParams({ strict: false });
  return <NotesList filter="source" sourceId={sourceId} />;
};

const SourceNoteDetail = () => {
  const { selectedCapture } = useCaptureContext();
  return selectedCapture ? (
    <NoteView capture={selectedCapture} />
  ) : (
    <EmptyNoteView />
  );
};

const BookmarksPanel = () => <BookmarkPanel />;

const BookmarkDetail = () => {
  const { selectedCapture } = useCaptureContext();
  return selectedCapture ? (
    <NoteView capture={selectedCapture} />
  ) : (
    <EmptyNoteView />
  );
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
  component: Home,
});

const capturesPanel = createRoute({
  getParentRoute: () => contentRoute,
  path: "captures",
  component: CapturesPanel,
});

const captureDetail = createRoute({
  getParentRoute: () => capturesPanel,
  path: "$captureId",
  component: CaptureDetail,
});

const foldersPanel = createRoute({
  getParentRoute: () => contentRoute,
  path: "folders",
  component: FolderPanel,
});

const folderNotes = createRoute({
  getParentRoute: () => contentRoute,
  path: "folders/$folderId",
  component: FolderNotes,
});

const folderNoteDetail = createRoute({
  getParentRoute: () => folderNotes,
  path: "captures/$captureId",
  component: FolderNoteDetail,
});

const sourcesPanel = createRoute({
  getParentRoute: () => contentRoute,
  path: "sources",
  component: SourcesPanel,
});

const sourceNotes = createRoute({
  getParentRoute: () => contentRoute,
  path: "sources/$sourceId",
  component: SourceNotes,
});

const sourceNoteDetail = createRoute({
  getParentRoute: () => sourceNotes,
  path: "captures/$captureId",
  component: SourceNoteDetail,
});

const bookmarksPanel = createRoute({
  getParentRoute: () => contentRoute,
  path: "bookmarks",
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
  publicRoute.addChildren([heroRoute, pricingRoute, ManifestoRoute, FeaturesRoute, FAQRoute]), // Correctly nest children of PublicLayout
  RegisterRoute,
  LoginRoute,
  mainShellRoute.addChildren([
    contentRoute.addChildren([
      homeRoute,
      capturesPanel.addChildren([captureDetail]),
      foldersPanel,
      folderNotes.addChildren([folderNoteDetail]),
      sourcesPanel,
      sourceNotes.addChildren([sourceNoteDetail]),
      bookmarksPanel.addChildren([bookmarkDetail]),
    ]),
    profileRoute,
  ]),
]);

export const router = createRouter({ routeTree });
