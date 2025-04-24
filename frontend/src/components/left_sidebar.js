import React from "react";
import "../include/css/main.css"; 
const LeftSidebar = () => {
  return (
    <div className="p-3 text-center">
        <div className="card mb-3">
        <div className="card-header">
          Email Alerts
        </div>
        <div className="card-body">
          <input type="text" className="form-control" placeholder="Enter Your Email" />
          <button className="btn btn-primary mt-2">Subscribe</button>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
          TOC Alerts
        </div>
        <div className="card-body">
          <input type="text" className="form-control" placeholder="Enter Your Email" />
          <button className="btn btn-primary mt-2">Subscribe</button>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Indexed In
        </div>
        <div className="card-body fix">
          
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Advertisement
        </div>
        <div className="card-body fix">
          
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Conference
        </div>
        <div className="card-body fix">
          
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Events
        </div>
        <div className="card-body fix">
          
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Visitor Count
        </div>
        <div className="card-body fix">
          
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Worldwide Visitors
        </div>
        <div className="card-body fix">
          
        </div>
      </div>
      </div>
    );
  };
export default LeftSidebar;
