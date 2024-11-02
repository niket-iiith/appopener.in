import React, { useEffect } from "react";

const NewAdComponent = () => {
  useEffect(() => {
    
    const script = document.createElement("script");
    script.src = "https://storage.googleapis.com/public-assets-websdk/appopenerSDK.min.js";
    script.async = true;
    script.onload = () => {

      console.log("DOM loaded, initializing Adster SDK...");
      const adsterSDK = new window.AdsterSDK();
      console.log("Initializing Adster SDK...");
      adsterSDK.init().then(() => {
        console.log("Adster SDK setup complete");
      });
    };

    document.body.appendChild(script);

 
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="ad-container">
      <div className="ad-slot">
        <div id="div-gpt-ad-1730079117863-0"></div>
      </div>
    </div>
  );
};

export default NewAdComponent;
