import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // For redirect
  const [user_name, setUser_name] = useState(""); // input state
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(""); // error state

  const handleLogin = async () => {
    const res = await fetch("http://localhost/my_journal/backend/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name, pwd }),
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
        placeholder="User Name"
        value={user_name}
        onChange={(e) => setUser_name(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      /><br /><br />

      <button onClick={handleLogin}>Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
