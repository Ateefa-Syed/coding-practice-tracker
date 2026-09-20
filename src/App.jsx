import { useEffect, useState } from 'react';
import ProblemForm from './components/ProblemForm';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [topicFilter, setTopicFilter] = useState('');

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
      // Ignore storage errors.
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

  const handleDeleteProblem = (id) => {
  const shouldDelete = window.confirm(
    'Are you sure you want to delete this problem?',
  );

  if (!shouldDelete) {
    return;
  }

  setProblems((previousProblems) =>
    previousProblems.filter((problem) => problem.id !== id),
  );
};

  const handleEditProblem = (problem) => {
    setEditingProblem(problem);
    setShowForm(true);
  };

  const handleUpdateProblem = (updatedProblem) => {
    setProblems((previousProblems) =>
      previousProblems.map((problem) =>
        problem.id === updatedProblem.id
          ? updatedProblem
          : problem,
      ),
    );

    setEditingProblem(null);
    setShowForm(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setProblems((previousProblems) =>
      previousProblems.map((problem) =>
        problem.id === id
          ? { ...problem, status: newStatus }
          : problem,
      ),
    );
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesPlatform =
      platformFilter === '' ||
      problem.platform === platformFilter;

    const matchesDifficulty =
      difficultyFilter === '' ||
      problem.difficulty === difficultyFilter;

    const matchesStatus =
      statusFilter === '' ||
      problem.status === statusFilter;

    const matchesTopic =
      topicFilter === '' ||
      problem.topic.toLowerCase() === topicFilter.toLowerCase();

    return (
      matchesSearch &&
      matchesPlatform &&
      matchesDifficulty &&
      matchesStatus &&
      matchesTopic
    );
  });

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

  const clearFilters = () => {
    setSearchTerm('');
    setPlatformFilter('');
    setDifficultyFilter('');
    setStatusFilter('');
    setTopicFilter('');
  };

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
            onClose={() => {
              setShowForm(false);
              setEditingProblem(null);
            }}
            onAddProblem={handleAddProblem}
            onUpdateProblem={handleUpdateProblem}
            editingProblem={editingProblem}
          />
        ) : (
          <section className="problems-section">
            <div className="section-header">
              <h2>My Problems</h2>

              <button
                onClick={() => {
                  setEditingProblem(null);
                  setShowForm(true);
                }}
              >
                Add Problem
              </button>
            </div>

            <div className="filters">
              <input
                type="text"
                placeholder="Search by problem name..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

              <select
                value={platformFilter}
                onChange={(event) =>
                  setPlatformFilter(event.target.value)
                }
              >
                <option value="">All Platforms</option>
                <option value="LeetCode">LeetCode</option>
                <option value="GeeksforGeeks">
                  GeeksforGeeks
                </option>
                <option value="HackerRank">HackerRank</option>
                <option value="CodeChef">CodeChef</option>
                <option value="Other">Other</option>
              </select>

              <select
                value={difficultyFilter}
                onChange={(event) =>
                  setDifficultyFilter(event.target.value)
                }
              >
                <option value="">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="">All Statuses</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Solved">Solved</option>
              </select>

              <input
                type="text"
                placeholder="Filter by topic..."
                value={topicFilter}
                onChange={(event) =>
                  setTopicFilter(event.target.value)
                }
              />

              <button
                type="button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>

            {problems.length === 0 ? (
              <div className="empty-state">
                <h3>No coding problems yet</h3>

                <p>
                  Add your first problem to start tracking your practice.
                </p>

                <button
                  onClick={() => {
                    setEditingProblem(null);
                    setShowForm(true);
                  }}
                >
                  Add Your First Problem
                </button>
              </div>
            ) : filteredProblems.length === 0 ? (
              <div className="empty-state">
                <h3>No matching problems</h3>

                <p>
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
               <>
                 <p className="problem-count">
  {filteredProblems.length} problem
  {filteredProblems.length !== 1 ? "s" : ""} found
</p>
              <div className="problem-list">
                {filteredProblems.map((problem) => (
                  <div
                    className="problem-card"
                    key={problem.id}
                  >
                    <h3>{problem.name}</h3>

                    <p>
                      {problem.platform} · {problem.topic}
                    </p>

                    <p>{problem.difficulty}</p>

                    <label>
                      Status:
                      <select
                        value={problem.status}
                        onChange={(event) =>
                          handleStatusChange(
                            problem.id,
                            event.target.value,
                          )
                        }
                      >
                        <option value="Not Started">
                          Not Started
                        </option>

                        <option value="In Progress">
                          In Progress
                        </option>

                        <option value="Solved">
                          Solved
                        </option>
                      </select>
                    </label>

                    {problem.link && (
                      <a
                        href={problem.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open Problem
                      </a>
                    )}

                    <div className="problem-actions">
                      <button
                        onClick={() =>
                          handleEditProblem(problem)
                        }
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteProblem(problem.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                
                ))}
              </div>
              </>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default App;
