import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";

// Layout
import DashboardLayout from "../components/dashboard/DashboardLayout";

// Public Pages
import Landing from "../pages/landing/Landing";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// Dashboard Pages
import Dashboard from "../pages/dashboard/Dashboard";
import Organization from "../pages/organization/Organization";
import Projects from "../pages/projects/Projects";
import Profile from "../pages/profile/Profile";
import Settings from "../pages/settings/Settings";

// Workspace
import ProjectWorkspace from "../pages/projects/ProjectWorkspace";
import ProjectOverview from "../pages/projects/ProjectOverview";

// Workspace Features
import Tasks from "../pages/tasks/Tasks";
import Chat from "../pages/chat/Chat";
import Files from "../pages/files/Files";
import Calendar from "../pages/calendar/Calendar";
import Meetings from "../pages/meetings/Meetings";
import MeetingRoomPage from "../pages/meetings/MeetingRoomPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── PUBLIC ── */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ── MEETING ROOM (full screen, outside layout) ── */}
        <Route
          path="/projects/:projectId/meeting-room/:roomName"
          element={
            <ProtectedRoute>
              <MeetingRoomPage />
            </ProtectedRoute>
          }
        />

        {/* ── PROTECTED DASHBOARD LAYOUT ── */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/organizations" element={<Organization />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

          {/* ── PROJECT WORKSPACE ── */}
          <Route path="/projects/:projectId" element={<ProjectWorkspace />}>
            <Route index element={<ProjectOverview />} />
            <Route path="kanban" element={<Tasks />} />
            <Route path="chat" element={<Chat />} />
            <Route path="files" element={<Files />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="meetings" element={<Meetings />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
