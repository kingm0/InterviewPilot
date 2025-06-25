import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import InterviewDashboard from "./InterviewDashboard";

export default function App() {
  return (
    <Router>
      <div className="p-4 space-x-4 bg-gray-100 shadow">
        <Link to="/candidate" className="text-blue-600 hover:underline">Company View</Link>
        <Link to="/company" className="text-blue-600 hover:underline">Candidate View</Link>
      </div>

      <Routes>
        <Route
          path="/candidate"
          element={<InterviewDashboard hideInterviewerView={false} />}
        />
        <Route
          path="/company"
          element={<InterviewDashboard hideInterviewerView={true} />}
        />
      </Routes>
    </Router>
  );
}
