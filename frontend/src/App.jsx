import { useState } from "react";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("home");

  const [time, setTime] = useState(30);
  const [activity, setActivity] = useState("Walking");
  const [energy, setEnergy] = useState("Medium");
  const [mission, setMission] = useState("");
const [loading, setLoading] = useState(false);
const [completed, setCompleted] = useState(false);
if (completed) {
  return (
    <div className="app">
      <div className="hero">
        <div className="logo">🎉</div>

        <h1>Mission Complete!</h1>

        <p className="tagline">
          You actually went outside. 🌱
        </p>

        <p className="description">
          Nice work! Another mission completed.
          <br />
          Your future self says thank you. 😎
        </p>

        <div className="mission-card">
          <h2>🏆 Rewards</h2>

          <p>🌱 +20 Grass Points</p>
          <p>🔥 Streak continues!</p>
          <p>📵 Time spent away from your screen.</p>
        </div>

        <button
          className="start-button"
          onClick={() => {
            setCompleted(false);
            setScreen("home");
          }}
        >
          🏠 Back Home
        </button>
      </div>
    </div>
  );
}
  if (screen === "setup") {
    return (
      <div className="app">
        <div className="hero">

          <div className="logo">🌱</div>

          <h1>Create Your Mission</h1>

          <p className="description">
            Tell us a little about your day.
            <br />
            Gemma will create your outdoor mission.
          </p>

          <div className="setup-section">
            <h2>⏱️ How much time do you have?</h2>

            <div className="time-value">
              {time} minutes
            </div>

            <input
              type="range"
              min="15"
              max="120"
              step="15"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="setup-section">
            <h2>🌿 What do you want to do?</h2>

            <div className="options">
              {["Walking", "Gardening", "Birding", "Running"].map(
                (item) => (
                  <button
                    key={item}
                    className={
                      activity === item
                        ? "option selected"
                        : "option"
                    }
                    onClick={() => setActivity(item)}
                  >
                    {item === "Walking" && "🚶"}
                    {item === "Gardening" && "🌱"}
                    {item === "Birding" && "🐦"}
                    {item === "Running" && "🏃"}

                    <span>{item}</span>
                  </button>
                )
              )}
            </div>
          </div>

          <div className="setup-section">
            <h2>⚡ How is your energy?</h2>

            <div className="options">
              {["Low", "Medium", "High"].map((item) => (
                <button
                  key={item}
                  className={
                    energy === item
                      ? "option selected"
                      : "option"
                  }
                  onClick={() => setEnergy(item)}
                >
                  {item === "Low" && "😴"}
                  {item === "Medium" && "🙂"}
                  {item === "High" && "🔥"}

                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>

          <button
onClick={async () => {
    console.log("CREATE BUTTON CLICKED");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/generate-mission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time: Number(time),
          activity: activity,
          energy: energy,
        }),
      });

      const data = await response.json();
      console.log("GEMMA RESPONSE:", data);

      setMission(data.mission);
      setScreen("mission");
    } catch (error) {
      console.error(error);
      alert("Could not connect to TouchGrass AI backend.");
    } finally {
      setLoading(false);
    }
  }}
>
  {loading ? "🌱 Creating..." : "🌳 Create My Mission"}
</button>
          <button
            className="back-button"
            onClick={() => setScreen("home")}
          >
            ← Back
          </button>

        </div>
      </div>
    );
  }

  if (screen === "mission") {
    return (
      <div className="app">
        <div className="hero">

          <div className="logo">🌳</div>

          <h1>Your Mission</h1>

          <div className="mission-card">

 <p style={{ whiteSpace: "pre-line" }}>{mission}</p>

          </div>

          <div className="phone-warning">
            📵 PHONE DOWN
            <br />
            <span>🌱 GO OUTSIDE</span>
          </div>

          <button
            className="start-button"
            onClick={() => setCompleted(true)}
          >
            🎉 Mission Complete
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="hero">

        <div className="logo">🌱</div>

        <h1>TouchGrass AI</h1>

        <p className="tagline">
          An AI that wants you <strong>OFF</strong> your phone.
        </p>

        <p className="description">
          Tell us how much time you have.
          <br />
          We'll create a personalized outdoor mission for you.
        </p>

        <button
          className="start-button"
          onClick={() => setScreen("setup")}
        >
          🌳 Start My Mission
        </button>

        <div className="stats">

          <div>
            <span>🌿</span>
            <p>120</p>
            <small>Grass Points</small>
          </div>

          <div>
            <span>🔥</span>
            <p>7</p>
            <small>Day Streak</small>
          </div>

          <div>
            <span>🌳</span>
            <p>12</p>
            <small>Missions</small>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;