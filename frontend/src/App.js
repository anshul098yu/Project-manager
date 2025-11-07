import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectListPage from './pages/ProjectListPage';
import ProjectBoardPage from './pages/ProjectBoardPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Project Management System</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ProjectListPage />} />
            <Route path="/project/:projectId" element={<ProjectBoardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;