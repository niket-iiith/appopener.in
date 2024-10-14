import React, { useEffect } from 'react';

const AdComponent = ({ adType }) => {

  useEffect(() => {
    
    const loadAds = () => {
      if (window.vitag && window.vitag.Init) {
        if (adType === 'sticky') {
          window.vitag.Init.push(() => {
            window.viAPItag.initStickyBanner('pw_42238');
          });
        } else if (adType === 'horizontal') {
          window.vitag.Init.push(() => {
            window.viAPItag.display('pw_42234');
          });
        } else if (adType === 'inpost') {
          window.vitag.Init.push(() => {
            window.viAPItag.display('pw_42235');
          });
        }
      } else {
        console.error('Value Impression ads not initialized');
      }
    };

    const timeout = setTimeout(() => {
      loadAds();
    }, 500);

   
    return () => clearTimeout(timeout);
  }, [adType]);

  return (
    <div>
      {adType === 'horizontal' && <div className="adsbyvli" data-ad-slot="pw_42234"></div>}
      {adType === 'sticky' && <div id="sticky-banner"></div>}
      {adType === 'inpost' && <div className="adsbyvli" data-ad-slot="pw_42235"></div>}
    </div>
  );
};

export default AdComponent;
