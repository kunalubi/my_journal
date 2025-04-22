// src/pages/Index.js
import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const Index = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <div className="d-flex justify-content-center flex-grow-1">
          <div className="col-11" style={{ textAlign: "center", marginTop: "10px", border: "1px solid black", padding: "10px" }}>
          <h1>Welcome to My Journal</h1>
          <hr />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
