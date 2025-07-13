import { useEffect, useState } from "react";
import API from "../api";
import "./Leaderboard.css";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    async function fetchData() {
      const [c, l] = await Promise.all([
        API.get("/leaderboard"),
        API.get("/flat/stats"),
      ]);
      setLeaderboard(c.data);
      setStats(l.data.complaintTypes || {});
    }
    fetchData();
  }, []);

  return (
    <div className="leaderboard-container">
      <section className="section">
        <h2 className="section-title">Leaderboard (Karma)</h2>
        <ol>
          {leaderboard.map((user, i) => (
            <>
              <li key={user._id}>
                
                {user.name} — {user.karmaPoints} points
                <span className={`dynamic-span-${i}`} style={{display: "none"}}>Best Flatmate</span>
              </li>
              
            </>
          ))}
        </ol>
      </section>

      <section className="section">
        <h2 className="section-title">Complaint Types</h2>
        <ul>
          {Object.entries(stats).map(([type, count]) => (
            <li key={type}>
              {type}: {count}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
