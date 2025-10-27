import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LoadingScreen from "./Loader";
import siren from "../assets/Siren.gif";
import fireworks from "../assets/Fireworks.gif";

const PagerElement = ({ pagermsg }) => {
  const [current, setCurrent] = useState(0);
  const [msg, setmsg] = useState(
    pagermsg && pagermsg.length
      ? pagermsg
      : [
          {
            text: "To Delete or Rub paid message, Add 8 more irrelevant paid texts. Cool na? Ikr",
            source: "chat",
          },
        ]
  );
  const [theme, setTheme] = useState("default");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (msg.length === 0) return;

    if (msg[current]?.source === "donate") {
      setTheme("golden");
    } else if (msg[current]?.source === "sos") {
      setTheme("alert");
    } else {
      setTheme("default");
    }

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === msg.length - 1 ? 0 : prev + 1));
    }, 20000 / msg.length);

    return () => clearInterval(interval);
  }, [msg, current]);

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? msg.length - 1 : prev - 1));
  const next = () =>
    setCurrent((prev) => (prev === msg.length - 1 ? 0 : prev + 1));

  const openPopup = (state, type) => {
    console.log("Type is : ", type);
    const width = 600;
    const height = 600;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;
    const data = {
      link: window.location.href,
    };
    const queryString = new URLSearchParams(data).toString();

    window.open(
      `https://apposlash.com/express?${queryString}&type=${type}`,
      "popupWindow",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  return (
    <div
      className={`flex flex-row w-full justify-center gap-1 items-center transition-all duration-500 bg-transparent`}
    >
      <LoadingScreen isLoading={loading} />
      <div
        className={`relative w-full max-w-4xl flex flex-col items-center p-2 rounded-2xl shadow-xl transition-all duration-500 ${
          msg[current]?.source === "donate"
            ? "bg-yellow-900 border-yellow-400"
            : msg[current]?.source === "sos"
            ? "bg-red-900 border-red-500"
            : "bg-gray-900 border-green-400"
        } border-2`}
      >
        {msg[current]?.source === "donate" && (
          <img
            src={fireworks}
            alt="Fireworks Celebration"
            className="absolute inset-0 w-full h-full object-cover opacity-70 z-0"
          />
        )}

        {msg[current]?.source === "sos" && (
          <img
            src={siren}
            alt="Siren Alert"
            className="absolute top-2 left-2 w-10 h-10 animate-pulse"
          />
        )}
        {msg[current]?.source === "donate" && (
          <div className="w-full text-center text-yellow-300 font-bold font-mono text-sm md:text-lg mb-2">
            ⭐ {msg[current]?.name} ⭐ donated ₹{msg[current]?.amount}
          </div>
        )}

        <div
          className={`w-full rounded-xl h-16 flex items-center justify-center text-md md:text-lg font-mono font-bold tracking-wide text-center transition-all duration-500 ease-in-out shadow-inner line-clamp-2 p-2 border-2 ${
            msg[current]?.source === "donate"
              ? "border-yellow-400 text-yellow-300 bg-yellow-950"
              : msg[current]?.source === "sos"
              ? "border-red-500 text-red-300 bg-black"
              : "border-green-400 text-green-400 bg-black"
          }`}
        >
          {msg[current]?.text || msg[current]}
        </div>

        <div className="flex items-center justify-between w-full mt-2">
          <button
            onClick={prev}
            className={`p-2 rounded-md border transition-colors duration-300 ${
              msg[current]?.source === "donate"
                ? "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                : msg[current]?.source === "sos"
                ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-black"
                : "border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
            }`}
          >
            <ChevronLeft size={12} />
          </button>

          <div className="flex space-x-1">
            {msg.map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  i === current
                    ? msg[current]?.source === "donate"
                      ? "bg-yellow-400"
                      : msg[current]?.source === "sos"
                      ? "bg-red-500"
                      : "bg-green-400"
                    : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className={`p-2 rounded-md border transition-colors duration-300 ${
              msg[current]?.source === "donate"
                ? "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                : msg[current]?.source === "sos"
                ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-black"
                : "border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
            }`}
          >
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => openPopup(true, "chat")}
          className="px-3 rounded-md bg-green-500 text-black text-sm font-mono font-bold tracking-wide shadow-lg active:translate-y-0.5 border-2 border-green-700 hover:bg-green-400 transition-colors duration-200 py-1"
        >
          Chat
        </button>
        <button
          onClick={() => openPopup(true, "donate")}
          className="px-3 rounded-md bg-yellow-500 text-black text-sm font-mono font-bold tracking-wide shadow-lg active:translate-y-0.5 border-2 border-yellow-700 hover:bg-yellow-400 transition-colors duration-200 leading-4 py-2"
        >
          Donate
        </button>
        <button
          onClick={() => openPopup(true, "sos")}
          className="px-3 rounded-md bg-red-500 text-black text-sm font-mono font-bold tracking-wide shadow-lg active:translate-y-0.5 border-2 border-red-700 hover:bg-red-400 transition-colors duration-200 leading-4 py-2"
        >
          SOS
        </button>
      </div>
    </div>
  );
};

export default PagerElement;
