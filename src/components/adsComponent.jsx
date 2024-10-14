import React from 'react';

const AdComponent = () => {
  return (
    <div className="ad-container" style={{ margin: '20px 0', textAlign: 'center' }}>
      {/* Insert your ad code here */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5645705217995911"
        data-ad-slot="9492391764"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>
  );
};

export default AdComponent;
