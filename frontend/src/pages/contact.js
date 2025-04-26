import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "../include/css/main.css";
const Contact = () => {
    const [formData, setFormData] = useState({
        Name: "",
        Qualification: "",
        Email: "",
        Address: "",
        Message: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
        // Reset form after submission
        setFormData({
            Name: "",
            Qualification: "",
            Email: "",
            Address: "",
            Message: ""
        });
    };

    return (
        <>
            <Header />
                <div className=" d-flex justify-content-center row">
                    <div className="col-10" style={{ marginTop: "10px", border: "1px solid black", padding: "10px" }}>
                        <h1>Contact</h1>
                        <hr />
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="Name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="Name" placeholder="Enter your name" value={formData.Name} onChange={handleChange} />
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="Qualification" className="form-label">Qualification</label>
                                <input type="text" className="form-control" id="Qualification" placeholder="Enter your qualification" value={formData.Qualification} onChange={handleChange} />
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="Email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="Email" placeholder="Enter your email" value={formData.Email} onChange={handleChange} />
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="Address" className="form-label">Address</label>
                                <textarea className="form-control" id="Address" rows="2" placeholder="Enter your address" value={formData.Address} onChange={handleChange}></textarea>
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="Message" className="form-label">Message</label>
                                <textarea className="form-control" id="Message" rows="4" placeholder="Enter your message" value={formData.Message} onChange={handleChange}></textarea>
                            </div>
                            
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            <Footer />
        </>
    );
};
export default Contact;
