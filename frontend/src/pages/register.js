// src/pages/Register.js
import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const Register = () => {
  const [formData, setFormData] = useState({
    Salutation: "",
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
    Qualification: "",
    Orc_id: "",
    User_Type: "",
    Country: "",
    State: "",
    Address: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost/my_journal/backend/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      });

      const result = await res.text();
      alert(result); // Show server response
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center flex-grow-1">
        <div className="col-11" style={{ marginTop: "10px", border: "1px solid black", padding: "10px" }}>
          <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="Salutation" className="form-label">Salutation</label>
                <select className="form-select" id="Salutation" value={formData.Salutation} onChange={handleChange}>
                  <option value="">Select Salutation</option>
                  <option value="Mr">Mr.</option>
                  <option value="Mrs">Mrs.</option>
                  <option value="Master">Master</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="Name" className="form-label">Name</label>
                <input type="text" className="form-control" id="Name" placeholder="Enter your name" value={formData.Name} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label htmlFor="Email" className="form-label">Email</label>
                <input type="email" className="form-control" id="Email" placeholder="Enter your email" value={formData.Email} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label htmlFor="Phone" className="form-label">Phone No</label>
                <input type="tel" className="form-control" id="Phone" placeholder="Enter phone number" value={formData.Phone} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label htmlFor="Password" className="form-label">Password</label>
                <input type="password" className="form-control" id="Password" placeholder="Enter password" value={formData.Password} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label htmlFor="Qualification" className="form-label">Qualification</label>
                <input type="text" className="form-control" id="Qualification" placeholder="Your qualification" value={formData.Qualification} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label htmlFor="Orc_id" className="form-label">ORC ID</label>
                <input type="text" className="form-control" id="Orc_id" placeholder="Enter your ORC ID" value={formData.Orc_id} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label htmlFor="User_Type" className="form-label">User Type</label>
                <select className="form-select" id="User_Type" value={formData.User_Type} onChange={handleChange}>
                  <option value="">Select Type</option>
                  <option value="author">Author</option>
                  <option value="reviewer">Reviewer</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="Country" className="form-label">Country</label>
                <input type="text" className="form-control" id="Country" placeholder="Enter country" value={formData.Country} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label htmlFor="State" className="form-label">State</label>
                <input type="text" className="form-control" id="State" placeholder="Enter state" value={formData.State} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label htmlFor="Address" className="form-label">Address</label>
                <textarea className="form-control" id="Address" rows="3" placeholder="Enter address" value={formData.Address} onChange={handleChange}></textarea>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary px-5">Register</button>
              </div>
            </form>
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
