import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [background, setBackground] = useState("");
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await axios.post(
        "http://localhost:5001/api/recommend",
        {
          background,
          goal,
          experience,
        }
      );

      setResult(response.data.reply);
    } catch (error) {
      setResult("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Iron Lady AI Career Advisor</h1>
      <p>Get personalized guidance for your career journey</p>

      <input
        type="text"
        placeholder="Your background (e.g. student, working professional)"
        value={background}
        onChange={(e) => setBackground(e.target.value)}
      />

      <input
        type="text"
        placeholder="Your career goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      <input
        type="text"
        placeholder="Your experience level"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />

      <button onClick={getRecommendation} disabled={loading}>
        {loading ? "Thinking..." : "Get Recommendation"}
      </button>

      {result && (
        <div className="result">
          <h3>Recommendation</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
