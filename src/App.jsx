import { useState } from 'react';
import ProblemForm from './components/ProblemForm';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="app">
      <header className="header">
        <h1>Coding Practice Tracker</h1>
        <p>Track your coding practice in one place.</p>
      </header>

      <main className="main-content">
        <section className="dashboard">
          <h2>Dashboard</h2>

          <div className="stats">
            <div className="stat-card">
              <h3>Total Problems</h3>
              <p>0</p>
            </div>

            <div className="stat-card">
              <h3>Solved</h3>
              <p>0</p>
            </div>

            <div className="stat-card">
              <h3>In Progress</h3>
              <p>0</p>
            </div>

            <div className="stat-card">
              <h3>Not Started</h3>
              <p>0</p>
            </div>
          </div>
        </section>

        {showForm ? (
          <ProblemForm onClose={() => setShowForm(false)} />
        ) : (
          <section className="problems-section">
            <div className="section-header">
              <h2>My Problems</h2>

              <button onClick={() => setShowForm(true)}>
                Add Problem
              </button>
            </div>

            <div className="empty-state">
              <h3>No coding problems yet</h3>
              <p>
                Add your first problem to start tracking your practice.
              </p>

              <button onClick={() => setShowForm(true)}>
                Add Your First Problem
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
