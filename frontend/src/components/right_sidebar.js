import React from "react";
import "../include/css/main.css"; 
const RightSidebar = () => {
    return (
        <div className="p-3 text-center">
        <div className="card mb-3">
        <div className="card-header">
          Search Article
        </div>
        <div className="card-body">
          <input type="text" className="form-control" placeholder="Search Article" />
          <button className="btn btn-primary mt-2">Search</button>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Most viewed articles
        </div>
        <div className="card-body fix">
          
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Most downloaded articles
        </div>
        <div className="card-body fix">
          
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Articles Statistics
        </div>
        <div className="card-body fix">
          
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Articles Statistics
        </div>
        <div className="card-body fix">
          
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Publication Statistics
        </div>
        <div className="card-body fix">
          
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Manuscript Statistics
        </div>
        <div className="card-body fix">
          
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Articles Statistics
        </div>
        <div className="card-body fix">
          
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Total Published Articles
        </div>
        <div className="card-body fix">
          
        </div>
      </div>
      </div>
    );
  };
  export default RightSidebar;
