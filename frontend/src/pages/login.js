import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // For redirect
  const [user_name, setUser_name] = useState(""); // input state
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(""); // error state
  const [user_type, setUser_type] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost/my_journal/backend/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name, pwd, user_type }),
    });

    const result = await res.json();

    if (result.success) {
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(result.user));
      
      // Redirect based on user type
      switch(result.user.user_type) {
        case 'admin':
          navigate("/admin-dashboard", {
            state: { user: result.user, message: "Welcome Admin!" }
          });
          break;
        case 'author':
          navigate("/author-dashboard", {
            state: { user: result.user, message: "Welcome Author!" }
          });
          break;
        case 'editor':
          navigate("/editor-dashboard", {
            state: { user: result.user, message: "Welcome Editor!" }
          });
          break;
        case 'reviewer':
          navigate("/reviewer-dashboard", {
            state: { user: result.user, message: "Welcome Reviewer!" }
          });
          break;
        default:
          setError("Invalid user type");
      }
    } else {
      setError(result.message);
    }
  };

  return (

    <div className="container">
    <div style={{ marginTop: "100px", border: "1px solid black", padding: "50px", textAlign: "center" }}>
      <h2>Admin Login</h2>

      <input className="form-control"
        type="text"
        placeholder="User Name"
        value={user_name}
        onChange={(e) => setUser_name(e.target.value)}
      /><br /><br />

      <input className="form-control"
        type="password"
        placeholder="Password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      /><br /><br />
        <select className="form-select" id="User_Type" value={user_type} onChange={(e) => setUser_type(e.target.value)}>
                  <option value="">Select Type</option>
                  <option value="admin">Admin</option>
                  <option value="author">Author</option>
                  <option value="editor">Editor</option>
                  <option value="reviewer">Reviewer</option>
                </select>
      <br /><br />
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    </div>
  );
};

export default Login;
