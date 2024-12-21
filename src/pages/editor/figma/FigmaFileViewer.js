import React, { useEffect, useState } from "react";
import axios from "axios";

const FigmaFileViewer = () => {
  const [figmaData, setFigmaData] = useState(null);

  useEffect(() => {
    const fetchFigmaData = async () => {
      try {
        const response = await fetch(`http://localhost:8082/figma/file?fileId=ia7R9zdonQUynH2XCXAsxF`);
        const data = await response.json();
        setFigmaData(data);
        console.log("Figma Data:", data);
      } catch (error) {
        console.error("Error fetching data from backend:", error);
      }
    };
    fetchFigmaData();
  }, []);
  
  

  if (!figmaData) return <p>Loading...</p>;

  return (
    <div>
      <h1>Figma File Data</h1>
      <pre>{JSON.stringify(figmaData, null, 2)}</pre>
    </div>
  );
};

export default FigmaFileViewer;