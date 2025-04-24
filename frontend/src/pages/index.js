import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import LeftSidebar from "../components/left_sidebar"; 
import RightSidebar from "../components/right_sidebar"; 

const Index = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <div className="d-flex flex-grow-1">
        <div className="col-2">
          <LeftSidebar />
        </div>
        <div className="col-8" style={{ textAlign: "center", marginTop: "10px", border: "1px solid black", padding: "10px" }}>
          <h1>Welcome to My Journal</h1>
          <hr />
        </div>
        <div className="col-2">
          <RightSidebar />
        </div>
      </div>
       {/* Slider section */}
       <div className="slider-container mt-5">
        <h4 className="mt-2">Slider</h4>
      </div>
      <div className="slider">
      <div className="slides">
  <img src="assest/img/logo.png" alt="Journal Logo" />
  <img src="assest/img/newcover.jpg" alt="Journal Cover" />
  <img src="assest/img/orcid.png" alt="ORCID Logo" />
  <img src="assest/img/newcover.jpg" alt="Journal Cover Alternate" />
  <img src="assest/img/google-scholar.png" alt="Google Scholar Logo" />
  <img src="assest/img/orcid.png" alt="ORCID Logo Duplicate" />
  <img src="assest/img/newcover.jpg" alt="Alternate Cover Design" />
</div>
      
      </div>
      <Footer />
    </div>
  );
};

export default Index;
