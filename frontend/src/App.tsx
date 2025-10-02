import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import LandingPage from "./pages/LandingPage";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import TaskPage from "./pages/TaskPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route index path="/" element={<LandingPage />} />

          <Route path="/admin" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="task" element={<TaskPage />} />
          </Route>

          <Route path="/not-found" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
