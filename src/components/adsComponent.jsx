import React, { useEffect } from 'react';

const AdComponent = () => {
  useEffect(() => {
    // Initialize the ad when the component mounts
    if (window.vitag && window.vitag.Init) {
      window.vitag.Init.push(() => {
        window.viAPItag.display("pw_42234");
      });
    }
  }, []);

  return (
    <div className="adsbyvli" data-ad-slot="pw_42234" style={{ margin: '20px 0', textAlign: 'center', width: '400px', height:'500px'}}>
      {/* The ad will be displayed here */}
    </div>
  );
};

export default AdComponent;
