import { useEffect, useState } from 'react';
import ProblemForm from './components/ProblemForm';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [problems, setProblems] = useState(() => {
    try {
      const savedProblems = localStorage.getItem('codingProblems');
      return savedProblems ? JSON.parse(savedProblems) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('codingProblems', JSON.stringify(problems));
    } catch {
      // Ignore storage errors so the app can continue working.
    }
  }, [problems]);

  const handleAddProblem = (problem) => {
    const newProblem = {
      ...problem,
      id: Date.now(),
    };

    setProblems((previousProblems) => [
      ...previousProblems,
      newProblem,
    ]);

    setShowForm(false);
  };

  const totalProblems = problems.length;

  const solvedProblems = problems.filter(
    (problem) => problem.status === 'Solved',
  ).length;

  const inProgressProblems = problems.filter(
    (problem) => problem.status === 'In Progress',
  ).length;

  const notStartedProblems = problems.filter(
    (problem) => problem.status === 'Not Started',
  ).length;

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
              <p>{totalProblems}</p>
            </div>

            <div className="stat-card">
              <h3>Solved</h3>
              <p>{solvedProblems}</p>
            </div>

            <div className="stat-card">
              <h3>In Progress</h3>
              <p>{inProgressProblems}</p>
            </div>

            <div className="stat-card">
              <h3>Not Started</h3>
              <p>{notStartedProblems}</p>
            </div>
          </div>
        </section>

        {showForm ? (
          <ProblemForm
            onClose={() => setShowForm(false)}
            onAddProblem={handleAddProblem}
          />
        ) : (
          <section className="problems-section">
            <div className="section-header">
              <h2>My Problems</h2>

              <button onClick={() => setShowForm(true)}>
                Add Problem
              </button>
            </div>

            {problems.length === 0 ? (
              <div className="empty-state">
                <h3>No coding problems yet</h3>
                <p>
                  Add your first problem to start tracking your practice.
                </p>

                <button onClick={() => setShowForm(true)}>
                  Add Your First Problem
                </button>
              </div>
            ) : (
              <div className="problem-list">
                {problems.map((problem) => (
                  <div className="problem-card" key={problem.id}>
                    <h3>{problem.name}</h3>

                    <p>
                      {problem.platform} · {problem.topic}
                    </p>

                    <p>
                      {problem.difficulty} · {problem.status}
                    </p>

                    {problem.link && (
                      <a
                        href={problem.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open Problem
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
