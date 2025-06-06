import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user_name, setUser_name] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [user_type, setUser_type] = useState("admin"); // default to admin

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
      localStorage.setItem("user", JSON.stringify(result.user));

      switch (result.user.user_type) {
        case "admin":
          navigate("/admin-dashboard", {
            state: { user: result.user, message: "Welcome Admin!" },
          });
          break;
        case "author":
          navigate("/author-dashboard", {
            state: { user: result.user, message: "Welcome Author!" },
          });
          break;
        case "editor":
          navigate("/editor-dashboard", {
            state: { user: result.user, message: "Welcome Editor!" },
          });
          break;
        case "reviewer":
          navigate("/reviewer-dashboard", {
            state: { user: result.user, message: "Welcome Reviewer!" },
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
    <div style={styles.body}>
      <div style={styles.card} className="fade-in-up">
        <h2 style={styles.heading}>Login Panel</h2>

        <div style={styles.inputContainer}>
          <input
            type="text"
            value={user_name}
            onChange={(e) => setUser_name(e.target.value)}
            style={styles.input}
            required
          />
          <label style={styles.label}>Username</label>
        </div>

        <div style={styles.inputContainer}>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            style={styles.input}
            required
          />
          <label style={styles.label}>Password</label>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <select
            style={styles.select}
            value={user_type}
            onChange={(e) => setUser_type(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="author">Author</option>
            <option value="editor">Editor</option>
            <option value="reviewer">Reviewer</option>
          </select>
        </div>

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        {error && <div style={styles.error}>{error}</div>}
      </div>

      <style>
        {`
          .fade-in-up {
            animation: fadeInUp 0.7s ease forwards;
          }

          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  body: {
    background: "linear-gradient(120deg, #e0f7fa, #f1f8e9)",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    position: "relative",
    zIndex: 1,
  },
  heading: {
    marginBottom: "30px",
    textAlign: "center",
    color: "#00796b",
  },
  inputContainer: {
    position: "relative",
    marginBottom: "25px",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#f9f9f9",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s ease-in-out",
  },
  label: {
    position: "absolute",
    top: "-8px",
    left: "12px",
    backgroundColor: "#ffffff",
    padding: "0 6px",
    fontSize: "12px",
    color: "#888",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#f9f9f9",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#00796b",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "15px",
  },
};

export default Login;
