import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", flatCode: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/register", form);
    login(res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <input
          placeholder="Flat Code"
          onChange={(e) => setForm({ ...form, flatCode: e.target.value })}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
