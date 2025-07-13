import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./ComplaintForm.css";

export default function ComplaintForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "Noise",
    severity: "Mild",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/complaints", form);
      alert("Complaint submitted!");
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to submit complaint");
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2>File a Complaint</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Complaint Title</label>
            <input
              name="title"
              onChange={handleChange}
              value={form.title}
              required
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={form.description}
              required
            ></textarea>
          </div>

          <div>
            <label>Type</label>
            <select
              name="type"
              onChange={handleChange}
              value={form.type}
            >
              <option>Noise</option>
              <option>Cleanliness</option>
              <option>Bills</option>
              <option>Pets</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label>Severity</label>
            <select
              name="severity"
              onChange={handleChange}
              value={form.severity}
            >
              <option>Mild</option>
              <option>Annoying</option>
              <option>Major</option>
              <option>Nuclear</option>
            </select>
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
