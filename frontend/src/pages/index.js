import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import LeftSidebar from "../components/left_sidebar";
import RightSidebar from "../components/right_sidebar";
import "../include/css/main.css";

const Index = () => {
  const sliderRef = useRef(null);
  const [pageData, setPageData] = useState(null);

  // Fetch Page Content
  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await fetch(`http://localhost/my_journal/backend/get_page_by_id.php?id=1`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.success && result.data) {
          setPageData(result.data);
        } else {
          console.error('Invalid data format from API');
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    };

    fetchPageContent();
  }, []);

  // Slider Logic
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const moveSlide = () => {
      if (slider.children.length === 0) return;
      const firstImage = slider.children[0];
      slider.style.transition = "transform 0.5s ease-in-out";
      slider.style.transform = "translateX(-14%)";

      setTimeout(() => {
        slider.appendChild(firstImage);
        slider.style.transition = "none";
        slider.style.transform = "translateX(0)";
      }, 500);
    };

    const intervalId = setInterval(moveSlide, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-12">
            <LeftSidebar />
          </div>

          <div className="col-lg-8 col-md-6 col-sm-12" style={{ marginTop: "10px", border: "1px solid black", padding: "10px" }}>
            <h1>{pageData?.page_title || "Welcome to My Journal"}</h1>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: pageData?.page_content || "" }} />

            {/* Navigation Pills */}
            <ul className="nav nav-pills justify-content-center mb-3" id="pills-tab" role="tablist">
              {["Current", "Viewed", "Downloaded"].map((type, i) => (
                <li className="nav-item" role="presentation" key={type}>
                  <a
                    className={`nav-link ${i === 0 ? "active" : ""}`}
                    id={`pills-${type}-tab`}
                    data-bs-toggle="pill"
                    href={`#pills-${type}`}
                    role="tab"
                    aria-controls={`pills-${type}`}
                    aria-selected={i === 0 ? "true" : "false"}
                  >
                    {i === 0 ? "Current Articles" : `Most ${type} Articles`}
                  </a>
                </li>
              ))}
            </ul>

            {/* Tab Content */}
            <div className="tab-content" id="pills-tabContent">
              {["Current", "Viewed", "Downloaded"].map((type, i) => (
                <div
                  key={type}
                  className={`tab-pane fade ${i === 0 ? "show active" : ""}`}
                  id={`pills-${type}`}
                  role="tabpanel"
                  aria-labelledby={`pills-${type}-tab`}
                >
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered mt-2">
                      <thead>
                        <tr>
                          <th width="75%">Article</th>
                          <th width="5%">Share</th>
                          <th width="5%">View</th>
                          <th width="5%">Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="article-title">Article Title</div>
                            <div className="article-meta">
                              <p className="mb-1">Authors: John Doe, Jane Smith</p>
                              <p className="mb-1">Pages: 10</p>
                              <p className="mb-1">Published: 2021-01-01</p>
                              <p className="mb-1">DOI URL: <a href="https://doi.org/10.1000/182">https://doi.org/10.1000/182</a></p>
                            </div>
                            <div className="d-flex gap-2">
                              <button type="button" className="btn btn-primary">View</button>
                              <a href="/" className="btn btn-primary">Download</a>
                              <a href="/" className="btn btn-primary">Download XML</a>
                              <button type="button" className="btn btn-primary">Full HTML</button>
                            </div>
                          </td>
                          <td className="text-center">10</td>
                          <td className="text-center">10</td>
                          <td className="text-center">10</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-sm-12">
            <RightSidebar />
          </div>
        </div>
      </div>

      {/* Slider section */}
      <div className="slider-container mt-5">
        <h4 className="mt-2">Slider</h4>
        <div className="slider">
          <div className="slides" ref={sliderRef}>
            <img src="images/logoo.jpg" alt="Journal Logo" />
            <img src="images/2106.i126.041.S.m005.c13.architect.jpg" alt="Journal Cover" />
            <img src="images/2109.w023.n001.1061B.p1.1061.jpg" alt="ORCID Logo" />
            <img src="images/2211.i126.049.F.m005.c9.workplace stretches.jpg" alt="Journal Cover Alternate" />
            <img src="images/3699666.jpg" alt="Google Scholar Logo" />
            <img src="images/ChatGPT Image Apr 16, 2025, 06_02_11 PM.png" alt="ORCID Logo Duplicate" />
            <img src="images/ChatGPT Image Apr 16, 2025, 06_08_19 PM.png" alt="Alternate Cover Design" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
