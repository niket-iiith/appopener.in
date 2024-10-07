import React, { useEffect } from "react";

const ScriptLoader = ({ src, inlineScript, onLoad }) => {
  useEffect(() => {
    if (src) {
      // Load external script
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (onLoad) onLoad(); // Call the onLoad callback
      };
      document.body.appendChild(script);

      // Cleanup function to remove the script when component unmounts
      return () => {
        document.body.removeChild(script);
      };
    } else if (inlineScript) {
      // Execute inline script
      const inline = document.createElement("script");
      inline.innerHTML = inlineScript;
      document.body.appendChild(inline);
      if (onLoad) onLoad(); // Call the onLoad callback after executing the inline script

      // Cleanup function to remove the inline script when component unmounts
      return () => {
        document.body.removeChild(inline);
      };
    }
  }, [src, inlineScript, onLoad]);

  return null; // No UI rendering needed for this component
};

export default ScriptLoader;
