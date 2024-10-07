import { useEffect } from 'react';

const ScriptLoader = ({ inlineScript, onLoad }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = "text/javascript";
    script.text = inlineScript;

    if (onLoad) {
      script.onload = onLoad;
    }

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup on unmount
    };
  }, [inlineScript, onLoad]);

  return null; // This component doesn't render anything visible
};

export default ScriptLoader;
