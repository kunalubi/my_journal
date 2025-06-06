import React, { useEffect , useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "../include/css/main.css";
const Journal_Info = () => {
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const fetchPageContent = async () => {
          try {
            const response = await fetch(`http://localhost/my_journal/backend/get_page_by_id.php?id=7`);
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
    
    return (
        <>
            <Header />
                <div className=" d-flex justify-content-center row">
                    <div className="col-10" style={{ marginTop: "10px", border: "1px solid black", padding: "10px" }}>
                        <h1>{pageData?.page_title}</h1>
                        <hr />
                        <div dangerouslySetInnerHTML={{ __html: pageData?.page_content || "" }} />
                        
                    </div>
                </div>
            <Footer />
        </>
    );
};
export default Journal_Info;
