import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "../include/css/main.css";
const Authors_Instructions = () => {
    return (
        <>
            <Header />
                <div className=" d-flex justify-content-center row">
                    <div className="col-10" style={{ marginTop: "10px", border: "1px solid black", padding: "10px" }}>
                        <h1>Authors_Instructions</h1>
                        <hr />
                        
                    </div>
                </div>
            <Footer />
        </>
    );
};
export default Authors_Instructions;
