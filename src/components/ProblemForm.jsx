import { useState } from 'react';

function ProblemForm({ onClose, onAddProblem }) {
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    platform: '',
    topic: '',
    difficulty: '',
    status: 'Not Started',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    onAddProblem(formData);

    setFormData({
      name: '',
      link: '',
      platform: '',
      topic: '',
      difficulty: '',
      status: 'Not Started',
    });
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Add Coding Problem</h2>

        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="problem-name">Problem Name</label>
          <input
            id="problem-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter problem name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="problem-link">Problem Link</label>
          <input
            id="problem-link"
            name="link"
            type="url"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="platform">Platform</label>
          <select
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            required
          >
            <option value="">Select platform</option>
            <option value="LeetCode">LeetCode</option>
            <option value="GeeksforGeeks">GeeksforGeeks</option>
            <option value="HackerRank">HackerRank</option>
            <option value="CodeChef">CodeChef</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="topic">Topic</label>
          <input
            id="topic"
            name="topic"
            type="text"
            value={formData.topic}
            onChange={handleChange}
            placeholder="e.g. Arrays"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
          >
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Solved">Solved</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>

          <button type="submit">
            Add Problem
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProblemForm;