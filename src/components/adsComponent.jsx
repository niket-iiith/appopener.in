import React, { useEffect } from 'react';

// AdComponent: Reusable ad component that accepts 'type' as a prop
const AdComponent = ({ adType }) => {
  
  useEffect(() => {
    const vitagInit = window.vitag?.Init || [];
    
    // Initialize ad slot based on type
    if (adType === 'sticky') {
      vitagInit.push(() => {
        viAPItag.initStickyBanner('pw_42238');
      });
    } else if (adType === 'horizontal') {
      vitagInit.push(() => {
        viAPItag.display('pw_42234');
      });
    } else if (adType === 'inpost') {
      vitagInit.push(() => {
        viAPItag.display('pw_42235'); // Example: replace with actual in-post slot ID
      });
    }
  }, [adType]);

  // Render the container for the selected ad type
  return (
    <div>
      {adType === 'horizontal' && <div className="adsbyvli" data-ad-slot="pw_42234"></div>}
      {/* Add containers for other ad types as necessary */}
    </div>
  );
};

export default AdComponent;
