import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import TaskPage from "./pages/TaskPage";
import ProtectedRoute from "./components/protected-route";
import ErrorPage from "./pages/ErrorPage";
import AgentDashboard from "./pages/AgentDashboard";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route index path="/" element={<LandingPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="task" element={<TaskPage />} />
          </Route>

          <Route
            path="/agent"
            element={
              <ProtectedRoute allowedRole="AGENT">
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AgentDashboard />} />
          </Route>

          <Route path="/error-page" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
