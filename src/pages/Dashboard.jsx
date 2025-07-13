import { useEffect, useState } from "react";
import API from "../api";
import "./Dashboard.css";

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [mostUpvotedComplaintId, setMostUpvotedComplaintId] = useState("");
  // const [alert, setalert] = useState({
  //   show: false,
  //   message: ''
  // })
  async function fetchData() {
      const [c] = await Promise.all([API.get("/complaints")]);
      setComplaints(c.data.complaints);
      setMostUpvotedComplaintId(c.data.mostUpvotedComplaintId)
      console.log(c.data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  async function resolveComplaint(id){
    const response = await Promise.all([API.put(`/complaints/${id}/resolve`)]);
    alert("Complaint marked resolved.");
    fetchData()
  }
  async function downVote(id){
    const response = await Promise.all([API.post(`/complaints/${id}/vote`, {type: 'downvote'})]);
    console.log(response);
    
    alert(response[0].data.message);
    fetchData()
  }
  async function upVote(id){
    const response = await Promise.all([API.post(`/complaints/${id}/vote`, {type: 'upvote'})]);
    alert(response[0].data.message);
    fetchData()
  }
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to QuirkyRoomie</h1>

      <section className="section">
        <h2 className="section-title">Active Complaints</h2>
        <ul className="complaints-list">
          {complaints.map((c) => (
            <li key={c._id} className="complaint-item">
              { mostUpvotedComplaintId == c._id &&
                <>
                <span style={{color: 'blue'}}>Flatmate Problem of the Week</span> <br/></>
              }
              <strong>{c.title}</strong> — {c.severity} ({c.type})
              <button onClick={()=>{resolveComplaint(c._id)}}>Resolve</button>
              <button style={{background: 'red'}} onClick={()=>{downVote(c._id)}}>Downvote({c.downvotes?.length})</button>
              <button style={{background: 'green'}} onClick={()=>{upVote(c._id)}}>Upvote({c.upvotes?.length})</button>
              {
                c.upvotes?.length >= 10 && 
                <>
                  <br/><strong style={{color: 'red'}}>Punishment</strong>
                  <ul>
                    <li>"Didn’t clean the dishes? You’re making chai for everyone for a week."</li>
                    <li>"Blasted loud music at 2 AM? You owe everyone samosas."</li>
                  </ul>
                </>
              }
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
