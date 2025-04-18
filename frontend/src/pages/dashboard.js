import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div>
      {message && <p style={{ color: "green" }}>{message}</p>}
      <h2>Welcome to the Dashboard</h2>
    </div>
  );
};

export default Dashboard;