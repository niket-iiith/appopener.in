/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", // Adjust based on your folder structure
  ],
  theme: {
    extend: {
      textShadow: {
        sm: "1px 1px 2px rgba(0,0,0,0.25)",
        DEFAULT: "2px 2px 4px rgba(0,0,0,0.25)",
        lg: "4px 4px 6px rgba(0,0,0,0.3)",
      },
      colors: {
        "my-teal": "hsla(147, 15%, 12%, 1)",
        "back-main": "hsla(154, 14%, 10%, 1)",
      },
      keyframes: {
        "star-out": {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(var(--x), var(--y)) scale(0.8)",
            opacity: "0",
          },
        },
        rain: {
          "0%": { transform: "translateY(-100px)" },
          "100%": { transform: "translateY(100vh)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "rotate-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "star-out": "star-out 4s linear forwards",
        rain: "rain 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        rotate: "rotate 12s linear infinite",
        "rotate-reverse": "rotate-reverse 12s linear infinite",

        // Optional: Add delay variants if you are using them
        "rain-delay-1": "rain 8s linear infinite 1s",
        "rain-delay-2": "rain 8s linear infinite 2s",
        "rain-delay-3": "rain 8s linear infinite 3s",
        "rain-delay-4": "rain 8s linear infinite 4s",
        "rain-delay-5": "rain 8s linear infinite 5s",
        "rain-delay-6": "rain 8s linear infinite 6s",
        "rain-delay-7": "rain 8s linear infinite 7s",
      },
    },
  },
  plugins: [],
};
