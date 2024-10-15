import React, { useEffect } from "react";

const AdComponent = () => {
  useEffect(() => {
    console.log("Ad script initialized");

    
    if (window.vitag && window.vitag.Init) {
      (window.vitag.Init = window.vitag.Init || []).push(function () {
        window.viAPItag.display("pw_42234");
      });
    }
  }, []);

  return (
    <div>
      <div className="adsbyvli" data-ad-slot="pw_42234"></div>
    </div>
  );
};

export default AdComponent;
