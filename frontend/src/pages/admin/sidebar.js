import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ children, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSection, setOpenSection] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost/my_journal/backend/logout.php", {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {}
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/admin/profile", { state: { user } });
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const isActive = (path) => location.pathname === path;

  const menuItemStyle = {
    cursor: "pointer",
    padding: "10px 15px",
    borderRadius: "8px",
    marginBottom: "6px",
    backgroundColor: "#e0f7fa",
    color: "#004d40",
    fontWeight: "500",
    transition: "all 0.3s ease",
  };

  const subMenuContainer = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
    padding: "12px",
    margin: "8px 0 12px 10px",
  };

  const subMenuItemStyle = {
    cursor: "pointer",
    padding: "8px 15px",
    borderRadius: "6px",
    marginBottom: "5px",
    backgroundColor: "#E0F7FA",
    color: "black",
    fontSize: "0.95rem",
    fontWeight: "500",
    transition: "background 0.3s ease",
  };

  const getActiveStyle = (path) => ({
    ...menuItemStyle,
    backgroundColor: isActive(path) ? "#b2dfdb" : menuItemStyle.backgroundColor,
  });

  const getSubActiveStyle = (path) => ({
    ...subMenuItemStyle,
    backgroundColor: isActive(path) ? "#dcedc8" : subMenuItemStyle.backgroundColor,
  });

  return (
    <div className="d-flex flex-column vh-100" style={{ background: "linear-gradient(120deg, #e0f7fa, #f1f8e9)" }}>
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white shadow-sm">
        <h2 className="mb-0 text-success">{title}</h2>
        <div className="dropdown">
          <button
            className="btn btn-outline-success dropdown-toggle"
            type="button"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user me-2"></i> {user?.First_Name || "User"}
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
              <button className="dropdown-item" onClick={handleProfile}>
                👤 My Profile
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => alert("Settings coming soon!")}>
                ⚙️ Settings
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => alert("Security page coming soon!")}>
                🛡️ Security
              </button>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button className="dropdown-item text-danger" onClick={handleLogout}>
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="d-flex flex-grow-1">
        <div className="p-3" style={{ width: "230px", background: "#ffffff", boxShadow: "4px 0 10px rgba(0,0,0,0.05)" }}>
          <div className="text-center py-3">
            <img
              src="/images/logoo.jpg"
              alt="Logo"
              className="img-fluid rounded-circle mb-2"
              style={{ width: "70px", height: "70px" }}
            />
            <h5 className="text-success">{user?.First_Name}</h5>
          </div>

          <div style={{ padding: "10px 0" }}>
            <div onClick={() => navigate("/admin-dashboard")} style={getActiveStyle("/admin-dashboard")}>
              <i className="fas fa-tachometer-alt me-2"></i> Dashboard
            </div>

            <div onClick={() => toggleSection("site")} style={menuItemStyle}>
              <i className="fas fa-cog me-2"></i> Site Manager
              <span className="float-end">{openSection === "site" ? "▲" : "▼"}</span>
            </div>
            {openSection === "site" && (
              <div style={subMenuContainer}>
                <div onClick={() => navigate("/admin/pages")} style={getSubActiveStyle("/admin/pages")}>Pages</div>
                <div onClick={() => navigate("/admin/image-slider")} style={getSubActiveStyle("/admin/image-slider")}>Image Slider</div>
                <div onClick={() => navigate("/admin/indexing-list")} style={getSubActiveStyle("/admin/indexing-list")}>Indexing List</div>
                <div onClick={() => navigate("/admin/conferences")} style={getSubActiveStyle("/admin/conferences")}>Conferences</div>
                <div onClick={() => navigate("/admin/advertisements")} style={getSubActiveStyle("/admin/advertisements")}>Advertisements</div>
                <div onClick={() => navigate("/admin/editorial-board")} style={getSubActiveStyle("/admin/editorial-board")}>Editorial Board</div>
              </div>
            )}

            <div onClick={() => navigate("/admin/users")} style={getActiveStyle("/admin/users")}>
              <i className="fas fa-users me-2"></i> Users
            </div>
          </div>
        </div>

        <div className="flex-grow-1 p-4" style={{ backgroundColor: "#ffffff", overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
