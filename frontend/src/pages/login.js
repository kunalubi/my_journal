import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // For redirect
  const [username, setUsername] = useState(""); // input state
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // error state

  const handleLogin = async () => {
    const res = await fetch("http://localhost/my_journal/backend/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await res.json();

    if (result.success) {
      navigate("/dashboard", {
        state: { message: "Login successful!" }
      });
     } else {
      setError(result.message);
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Admin Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleLogin}>Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
