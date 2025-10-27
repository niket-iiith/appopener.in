import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import ContactDialog from "../components/ContactDialog.jsx";
import { useParams } from "react-router-dom";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import GenerateLinkButton from "../components/SmartLink.jsx";
import VideoCard from "../components/TopVideo.jsx";
import Float from "../components/side_button";
import Floattwo from "../components/side_button2";
import { getURLandredirect } from "../helper/api";
import PageHead from "../components/Splash/PageHead";
import { getSuggestions, GetLatestBlogs } from "../helper/api";
import ytLogo from "../assets/yt-logos.avif";
import { Trophy } from "lucide-react";
import homeImage from "../assets/footer-space-man.avif";
import UserProfile from "../components/UserProfile";
/* import ChristmasLights from "../components/ChristmasLights"; */
import Footer from "../components/Footer";
import AdsterraAd from "../components/Adsterads";
import G13Ads from "../components/g13ads";
import StoryCarousel from "../components/Corousel.jsx";
import LoadingScreen from "../components/Loader.jsx";
import logo from "../assets/AppOpener.png"
import FeaturedSection from "../components/FeaturedSection.jsx";
import PagerElement from "../components/pager.jsx";
import book1 from "../assets/affiliation/book1.webp"
import book2 from "../assets/affiliation/book2.webp"
import book3 from "../assets/affiliation/book3.webp"
import book4 from "../assets/affiliation/book4.webp"
/* import Snowfall from "react-snowfall"; */
/* import tree from "../assets/tree.avif";
import Snowman from "../assets/SnowMan.avif"; */
/* import light from "../assets/Glight.avif"; */

const getUserAgent = () => {
  let agent = navigator.userAgent.toLowerCase();
  let result = "";
  if (agent.includes("android")) {
    result = "android";
  } else if (agent.includes("iphone")) {
    result = "ios";
  } else {
    result = "desktop";
  }
  return result;
};
const Splash = () => {
  const [buttonVisible, setButtonVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonText, setButtonText] = useState("Redirecting in 3");
  const [top10, settop10] = useState([]);
  const [showTop, setshowTop] = useState(false);
  const [TopVideo, setTopVideo] = useState([]);
  const [Dom, setDom] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ChannelName, setChannelName] = useState("");
  const [Feature, setFeatured] = useState([]);
  const [VideoId, setVideoId] = useState("");
  const [link, setLink] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [showCancelButton, setShowCancelButton] = useState(true); 
  const [Profile, setProfile] = useState("");
  const [ytChannelDetails, setytChannelDetails] = useState({});
  const [pagermsg, setpagermsg] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setState] = useState({
    intentvalue: "",
    original_url: "",
    linkMetadata: {},
    seconds: 8,
    redirectText: "Redirecting in ",
    video_id: "",
    showImage: false,
  });
  const [videos, setvideos] = useState({
    suggestions: { links: [] },
    loading: true,
  });
  const timerIntervalRef = useRef(null);
  const continueButtonRef = useRef(null);
  const showTopref = useRef(null);
  const { apptype, shorturl } = useParams();

  const [activeItem, setActiveItem] = useState("Home");
  const [showGenerateLink, setShowGenerateLink] = useState(false);
  const history = useHistory();
  const location = useLocation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const books = [
    {
    title: "Benito’s Devil Whip (Katrina the Teen Vampire Series)",
    url: "https://bookscape.com/product-details/benitos-devil-whip-katrina-the-teen-vampire-series-9780996463171?utm_source=appopener.com&utm_medium=affiliate&utm_campaign=campaign_4&utm_term=book&utm_content=book4",
    image: book4
  },
  {
    title: "Letters to Milena",
    url: "https://bookscape.com/product-details/letters-to-milena-9781784874001?utm_source=appopener.com&utm_medium=affiliate&utm_campaign=campaign_3&utm_term=book&utm_content=book3",
    image: book3
  },
  {
    title: "Star Wars #1: Bounty Hunter",
    url: "https://bookscape.com/product-details/star-wars-1-bounty-hunter-9781425797041?utm_source=appopener.com&utm_medium=affiliate&utm_campaign=campaign_2&utm_term=book&utm_content=book2",
    image: book2
  },
  {
    title: "Dynamite Thor Complete Hardcover",
    url: "https://bookscape.com/product-details/dynamite-thor-complete-hardcover-9781951837174?utm_source=appopener.com&utm_medium=affiliate&utm_campaign=campaign_1&utm_term=book&utm_content=book1",
    image: book1
  }
];


useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % books.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [books.length]);

  const navItems = [
    {
      name: "Imagine",

      route: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path d="M12 5c-7.633 0-12 7-12 7s4.367 7 12 7 12-7 12-7-4.367-7-12-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
        </svg>
      ),
    },
    {
      name: "Top 10",
      route: null,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      name: "Club",
      route: null, // No route since it triggers a component
      icon: <img src={Profile} alt="Profile" className="w-10 h-10 border-2 border-[#9D4EDD] hover:border-[#FF00A0] rounded-full" />,
    },
    {
      name: "FreeBee",
      route: "/blog",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
    },

    {
      name: "Spill",
      route: "/contact-us",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const currentRoute = location.pathname;
    setDom(currentRoute);
    const activeNavItem = navItems.find((item) => item.route === currentRoute);
    if (activeNavItem) {
      setActiveItem(activeNavItem.name);
    }
  }, [location.pathname, navItems]);

  const handleNavigation = (route, name) => {
    if (name === "Club") {
      setDialogOpen(true);
    } else if (name === "Top 10") {
      setshowTop(!showTop);
      showTopref.current.focus();
    } else if (route?.startsWith("http")) {
      window.location.href = route;
    } else {
      history.push(route);
    }
  };

  const updateScreenSize = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isSmallScreen: window.innerWidth <= 655,
    }));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const debouncedResize = setTimeout(() => {
        updateScreenSize();
      }, 200);

      return () => clearTimeout(debouncedResize); // Clear timeout if the resize happens before 200ms
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateScreenSize]);

  const startTimer = useCallback((app_intend, click_link) => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      setState((prevState) => {
        if (prevState.seconds <= 1) {
          clearInterval(timerIntervalRef.current);
          setShowCancelButton(false);
          click_link.setAttribute("href", app_intend);
          const agent = getUserAgent();
          if (agent === "desktop") {
            const newTab = window.open("", "_blank");
            if (newTab) {
              newTab.document.write(
                `
                <html>
                <head>
                <title>Redirecting...</title>
                <body>
                <a id="redirectLink" href="${app_intend}">Click here if not redirected</a>
                <script>
                document.getElementById('redirectLink').click();
                </script>
                <script data-cfasync="false" type="text/javascript" id="clever-core">
 /* <![CDATA[ */
     (function (document, window) {
         var a, c = document.createElement("script"), f = window.frameElement;
 
         c.id = "CleverCoreLoader89618";
         c.src = "https://scripts.cleverwebserver.com/b808f0a1150069f8ab4947f2d536ab0a.js";
 
         c.async = !0;
         c.type = "text/javascript";
         c.setAttribute("data-target", window.name || (f && f.getAttribute("id")));
         c.setAttribute("data-callback", "put-your-callback-function-here");
         c.setAttribute("data-callback-url-click", "put-your-click-macro-here");
         c.setAttribute("data-callback-url-view", "put-your-view-macro-here");
         
 
         try {
             a = parent.document.getElementsByTagName("script")[0] || document.getElementsByTagName("script")[0];
         } catch (e) {
             a = !1;
         }
 
         a || (a = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
         a.parentNode.insertBefore(c, a);
     })(document, window);
 /* ]]> */
 </script>
                </body>
                </html>
              `
              );
              newTab.document.close();
            }
          } else {
            click_link.click();
          }
          console.log(prevState);
          return {
            ...prevState,
            seconds: 0,
            redirectText: "Redirecting...",
            showImage: true,
          };
        }

        return { ...prevState, seconds: prevState.seconds - 1 };
      });
    }, 1000);

    // Trigger manual click in case automatic click fails
    setTimeout(() => {
      click_link.onclick = (e) => {
        e.preventDefault();
        window.open(app_intend, "_self");
      };
    }, 5000);
  }, []);

  const handleApiDataLoaded = useCallback(() => {
    setLoading(false);
    // Hide loader once data is loaded
  }, []);

  useEffect(() => {
    setLoading(true); // Show loader when API starts fetching
    let app_intend = "";
    const click_link = document.getElementById("abcd");
    getURLandredirect(apptype, shorturl)
      .then((res) => {
        if (!res) return;
        const linkMeta = res.data.smartUrl.data.metadata || {};
        const videoId = extractVideoId(res.data.smartUrl.data.originalURL);
        /*  console.log("API Response:", res.data); */
        if (linkMeta) {
          const metadata = {
            title: linkMeta.title || "Get Smart Links with AppOpener",
            image: linkMeta.image || linkMeta.thumbnail || homeImage,
            description:
              linkMeta.description || "Generate Smart Links with AppOpener",
            videoId: linkMeta.videoId,
          };

          /*   console.log("Link Metadata:", metadata); */

          setState((prevState) => ({
            ...prevState,
            linkMetadata: metadata,
            intentvalue: res.data.app_intend,
            original_url: res.data.originalURL,
            video_id: videoId,
          }));
          if (res.data.sugLinks.data?.links?.length) {
            res.data.sugLinks.data.links.sort((a, b) => b.clicks - a.clicks);
          }
          setvideos({
            suggestions: res.data.sugLinks.data || { links: [] },
            loading: false,
          });

          setytChannelDetails(res.data.ytChannelDetails);
          setProfile(res.data.ytChannelDetails?.data.avatar);
          setpagermsg(res.data.messages || []);
          console.log(res.data.messages);
          /* 
          console.log("Intent Value:", res.data.app_intend);
          console.log("Original URL:", res.data.originalURL);
          console.log("Video ID:", videoId); */
        }
        app_intend = res.data.smartUrl.data.app_intend;

        if (app_intend === "Desktop" || app_intend === "Mobile") {
          app_intend = res.data.smartUrl.data.originalURL;
        }

        setButtonVisible(true);
      })
      .finally(() => {
        setLoading(false);
        if (app_intend && 
          click_link) {
          startTimer(app_intend, click_link);
        }
      });
  }, [apptype, shorturl, startTimer]);

  const extractVideoId = (url) => {
    const urlObj = new URL(url);
    if (url.includes("youtu.be")) {
      return urlObj.pathname.substr(1);
    }
    if (url.includes("live") || url.includes("shorts")) {
      return urlObj.pathname.split("/")[2];
    }
    return urlObj.searchParams.get("v");
  };
  const handleCancel = () => {
    clearInterval(timerIntervalRef.current);
    setButtonText("Press to Continue");
    setShowCancelButton(false);
  };

  const handleButtonClick = () => {
    if (buttonText === "Press to Continue") {
      const click_link = document.getElementById("abcd");
      click_link.click();
    }
  };

  useEffect(() => {
    if (videos?.suggestions?.links?.length > 0) {
      const TopVideos = videos.suggestions.links.slice(0, 15);
      const top10 = videos.suggestions.links.slice(0, 10);
      setFeatured(top10.slice(0,4));
      setTopVideo(TopVideos); // Start from the first video
      settop10(top10);
    }
  }, [videos]);

  const redirectContent = useMemo(() => {
    const commonClass = "flex flex-row items-center justify-center space-x-2";

    if (buttonText === "Press to Continue") {
      return (
        <>
          <img src={logo} alt="App Logo" className="w-10 h-10 rotate-90 drop-shadow-[0_0_10px_#3b82f6]"/>
            Press to Continue
        </>
      );
    }

    return state.showImage ? (
      <>
        <img src={ytLogo} alt="App Logo" className="w-8 h-8" />
        <p className="text-white text-center font-semibold text-base pt-3">
          Press to Continue
        </p>
      </>
    ) : (
      <p className="text-white text-center font-semibold text-base">
        {state.redirectText} {state.seconds}
      </p>
    );
  }, [buttonText, state.showImage, state.redirectText, state.seconds]);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <AdsterraAd />
      {loading && <LoadingScreen />}
      {state.linkMetadata && <PageHead metadata={state.linkMetadata} />}

      {/* Navbar */}
      <nav className="backdrop-blur-xl bg-black/40 border-b border-[#9D4EDD] shadow-[0_0_15px_#9D4EDD]/50">
        {ytChannelDetails.data && (
        <UserProfile
          url={state.original_url}
          video_id={state.video_id}
          onApiDataLoaded={handleApiDataLoaded}
          onSetShowGenerateLink={setShowGenerateLink}
          onCancelRedirect={handleCancel}
          ytChannelDetails={ytChannelDetails}
        />)}
      </nav>

      {/* Stories Section */}
    <div>
      <div className="flex items-center justify-center space-x-4 overflow-x-auto px-2">
        {pagermsg.data && <PagerElement pagermsg={pagermsg?.data?.data} />}
      </div>

      <div className="flex flex-col items-center px-2">
        <div className="w-full max-w-4xl mx-auto mt-2 mb-2">
          {state.video_id && (
            <div className="relative group overflow-hidden rounded-xl shadow-[0_0_25px_#00F5FF]/60">
             <div className="relative -z-1 aspect-video overflow-hidden bg-black rounded-xl border border-[#9D4EDD]">
              {state.linkMetadata.image && (
               <iframe
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                 src={`https://www.youtube.com/embed/${
                 state.linkMetadata.videoId || state.video_id
                 }?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=${
                 state.linkMetadata.videoId || state.video_id
                 }&wmode=transparent`}
                 frameBorder="0"
                 allow="autoplay; encrypted-media; fullscreen"
                 allowFullScreen
              ></iframe>
             )}
            </div>
           </div>
          )}

          {/* Continue Button */}
          <div className="w-full flex flex-col items-center">
            <a
              className="w-full max-w-4xl no-underline"
              id="abcd"
              ref={continueButtonRef}
            >
              <button
                onClick={handleButtonClick}
                className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-bold h-10 px-4 py-2 mt-2 w-full
                       bg-[#9D4EDD] hover:bg-[#FF00A0] text-white 
                       shadow-[0_0_15px_#9D4EDD] hover:shadow-[0_0_20px_#FF00A0]
                       transition"
              >
                {redirectContent}
              </button>
            </a>

            {buttonVisible && showCancelButton && (
              <button
                onClick={handleCancel}
                className="mt-2 border-2 border-[#00F5FF] px-3 rounded-lg text-[#00F5FF] font-semibold shadow-[0_0_10px_#00F5FF] hover:bg-[#00F5FF]/10 transition"
                id="cancel"
              >
                Cancel
              </button>
            )}
          </div>

          {/* Bottom Nav */}
          <nav className="bg-black/40 text-white w-full mb-2 mt-2 rounded-lg shadow-[0_0_20px_#00F5FF]/50">
            <div className="flex justify-around items-center h-16 px-2">
              {navItems.map((item) => {
                const isActive = activeItem === item.name;
                return (
                  <div
                    key={item.name}
                    className={`flex flex-col justify-center items-center px-2 ${
                      isActive
                        ? "text-[#00F5FF] font-semibold drop-shadow-[0_0_10px_#00F5FF]"
                        : "text-[#9D4EDD] hover:text-[#FF00A0] cursor-pointer"
                    }`}
                    onClick={() => handleNavigation(item.route, item.name)}
                  >
                    <button className="flex items-center justify-center p-1 rounded-full">
                      {item.icon}
                    </button>
                    <span className="text-xs font-bold sm:text-sm">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </nav>
          {showGenerateLink && (
            <div className="bg-white p-4 md:p-6">
              <GenerateLinkButton />
            </div>
          )}
        </div>
        {/* Leaderboard */}
        <div className="w-full max-w-4xl flex flex-col items-center mb-4">
          <div className="flex w-full items-center justify-between mb-2">
            {isOn ? (
              <div className="flex flex-row font-extrabold text-xl sm:text-2xl items-center">
                <Trophy size={28} className="text-[#FF00A0]" />
                  <p className="ml-2 text-[#00F5FF]">Leaderboard</p>
              </div>
            ) : (
              <>
              <h2 className="text-xl sm:text-3xl font-bold text-[#FFFF33]">
                ⭐️ Featured
              </h2>
              </>
            )}
            <div className="flex flex-col items-center justify-center text-md font-bold">
              Show
            <button
              onClick={() => setIsOn(!isOn)}
              className={`relative w-16 h-6 rounded-full flex items-center px-2 transition-colors duration-300 ${
              isOn ? "bg-[#00F5FF]" : "bg-[#FFFF33]"
              }`}
            >
              <div
                className={`absolute left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                isOn ? "translate-x-9" : "translate-x-0"
                }`}
              />
              <span
                className={`w-full text-center text-xs font-semibold transition-colors duration-300 text-black`}
              >
                {isOn ? "On" : "Off"}
              </span>
            </button>
            </div>
          </div>
          {isOn ? (

            <div className="w-full bg-[#0A0A0A] text-white rounded-xl shadow-[0_0_25px_#9D4EDD]/70 overflow-hidden">
              <div className="grid grid-cols-12 items-center px-4 py-3 bg-[#1A1A1A] border-b border-[#9D4EDD]">
                <div className="col-span-2 font-semibold">Rank</div>
                <div className="col-span-7 font-semibold">Video</div>
                <div className="col-span-3 font-semibold text-right">
                  Points
                </div>
              </div>
              {/* Table Rows */}
              {TopVideo.map((item, index) => (
                <a
                  key={index}
                  href={item["smart_link"]}
                  className="no-underline block transition hover:bg-[#9D4EDD]/20"
                >
                  <div className="grid grid-cols-12 items-center px-4 py-3 border-b border-gray-800">
                    <div className="col-span-2 flex items-center justify-start">
                      <div
                        className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded-full shadow-lg ${
                          index === 0
                            ? "bg-[#FFD700] text-black"
                            : index === 1
                            ? "bg-gray-400 text-white"
                            : index === 2
                            ? "bg-[#9D4EDD] text-white"
                            : "bg-[#FF00A0] text-white"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>

                    <div className="col-span-7 truncate text-sm sm:text-base font-bold">
                      {item.metadata.title}
                    </div>

                    {/* Points */}
                    <div className="col-span-3 text-right font-semibold text-[#00F5FF] font-mono">
                      {item.clicks * 3}
                    </div>
                  </div>
                </a>
              ))}
            </div>
      ) : (
<div className="grid grid-cols-3 gap-4 w-full border-2 border-[#FFFF33] rounded-md p-3">
  {/* Main Book */}
  <a
    href={books[currentIndex]?.url}
    target="_blank"
    rel="noopener noreferrer"
    className="relative group col-span-2 rounded-2xl overflow-hidden shadow-lg no-underline"
  >
    <img
      src={books[currentIndex]?.image}
      alt={books[currentIndex]?.title}
      className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
      <div className="bg-red-600 p-3 sm:p-4 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 sm:w-8 sm:h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
    <h3 className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-sm sm:text-xl font-semibold text-yellow-300">
      {books[currentIndex]?.title}
    </h3>
  </a>

  {/* Sidebar list of all books */}
  <div className="flex flex-col gap-2 sm:gap-4 max-h-[72] overflow-y-auto">
    {books.map((book, idx) => (
      <a
        key={idx}
        href={book.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setCurrentIndex(idx)}
        className={`flex items-center gap-2 sm:gap-4 p-1 sm:p-3 rounded-xl transition no-underline ${
          idx === currentIndex
            ? "bg-gray-800 border border-yellow-400"
            : "bg-gray-900 hover:bg-gray-800"
        }`}
      >
        <img
          src={book.image}
          alt={book.title}
          className="w-12 h-18 sm:w-20 sm:h-28 rounded-lg object-cover flex-shrink-0"
        />
        <p className="font-medium text-white text-xs sm:text-base truncate">
          {book.title}
        </p>
      </a>
    ))}
  </div>
</div>

      )}
    </div>
                <div ref={showTopref} className="w-full px-2" tabIndex={0}>
          {showTop &&
            top10.map((item, index) => (
              <a href={item.smart_link} key={index} className="no-underline">
                <VideoCard
                  rank={index + 1}
                  title={item.metadata.title}
                  thumbnail={item.metadata.image}
                  description={item.metadata.description}
                />
              </a>
            ))}
        </div>
        <ContactDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          Creator1={ChannelName}
          Video={state.video_id}
          LInk={state.original_url}
        />
      </div>
      <Float />
      <Floattwo />
    </div>
    </div>
  );
};

export default Splash;
