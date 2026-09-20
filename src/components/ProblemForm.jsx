function ProblemForm({ onClose }) {
  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Add Coding Problem</h2>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>

      <form>
        <div className="form-group">
          <label htmlFor="problem-name">Problem Name</label>
          <input
            id="problem-name"
            type="text"
            placeholder="Enter problem name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="problem-link">Problem Link</label>
          <input
            id="problem-link"
            type="url"
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="platform">Platform</label>
          <select id="platform">
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
            type="text"
            placeholder="e.g. Arrays"
          />
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select id="difficulty">
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status">
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