import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/not-found" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
