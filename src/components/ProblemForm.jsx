import { useEffect, useState } from 'react';

function ProblemForm({
  onClose,
  onAddProblem,
  onUpdateProblem,
  editingProblem,
}) {
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    platform: '',
    topic: '',
    difficulty: '',
    status: 'Not Started',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (editingProblem) {
      setFormData({
        name: editingProblem.name,
        link: editingProblem.link,
        platform: editingProblem.platform,
        topic: editingProblem.topic,
        difficulty: editingProblem.difficulty,
        status: editingProblem.status,
      });
    } else {
      setFormData({
        name: '',
        link: '',
        platform: '',
        topic: '',
        difficulty: '',
        status: 'Not Started',
      });
    }

    setError('');
  }, [editingProblem]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedTopic = formData.topic.trim();
    const trimmedLink = formData.link.trim();

    if (!trimmedName && !trimmedTopic) {
  setError('Please enter a problem name and topic.');
  return;
}

if (!trimmedName) {
  setError('Please enter a problem name.');
  return;
}

if (!trimmedTopic) {
  setError('Please enter a topic.');
  return;
}

    if (trimmedLink) {
      try {
        new URL(trimmedLink);
      } catch {
        setError('Please enter a valid problem link.');
        return;
      }
    }

    const cleanedProblem = {
      ...formData,
      name: trimmedName,
      topic: trimmedTopic,
      link: trimmedLink,
    };

    if (editingProblem) {
      onUpdateProblem({
        ...cleanedProblem,
        id: editingProblem.id,
      });
    } else {
      onAddProblem(cleanedProblem);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>
          {editingProblem
            ? 'Edit Coding Problem'
            : 'Add Coding Problem'}
        </h2>

        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>

      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

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
  maxLength={100}
  required
/>

<small>
  {formData.name.length} / 100 characters
</small>
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
            <option value="GeeksforGeeks">
              GeeksforGeeks
            </option>
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
            {editingProblem ? 'Save Changes' : 'Add Problem'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProblemForm;