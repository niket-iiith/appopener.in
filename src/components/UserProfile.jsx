import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/logo.avif";
import Boot from "../components/Boot";
import banner from "../assets/default_banner.png";
import ContactDialog from "../components/ContactDialog";
import ShareTray from "../components/ShareTray";
import GenerateLinkButton from "./SmartLink.jsx";

// Default Metadata for fallback
const DEFAULT_METADATA = {
  bio: "Appopener",
  truncatedBio: "Default truncated bio",
  channelName: "appø",
  banner: banner,
  avatar: logo,
  channelLink: "https://www.youtube.com/@creatorcosmos",
  links: [],
};

const UserProfile = (props) => {
  const videoId = props.video_id;
  const [showPopup, setShowPopup] = useState(false);
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [showThirdPopup, setShowThirdPopup] = useState(false);
  const [data, setChannelData] = useState(DEFAULT_METADATA);
  const [loading, setloading] = useState(false);
  const [completed, setcompleted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [shareTrayOpen, setShareTrayOpen] = useState(false);
  const [showGeneratedLink, setShowGeneratedLink] = useState(false);

  const handleSubscribeClick = () => {
    window.location.href = data.channelLink;
  };

  const handleBootClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setShowSecondPopup(false);
  };

  const showSecondPopupHandler = () => {
    setShowSecondPopup(true);
  };

  const backToFirstPopup = () => {
    setShowSecondPopup(false);
    setShowThirdPopup(false);
  };

  const handleProfileClick = () => {
    setShowThirdPopup(true);
  };

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const fetchedData = props.ytChannelDetails?.data || {};
        setChannelData({
          bio: fetchedData.channelDescription || DEFAULT_METADATA.bio,
          truncatedBio:
            (fetchedData.channelDescription || DEFAULT_METADATA.bio).slice(
              0,
              65
            ) + "...",
          channelName: fetchedData.channelName || DEFAULT_METADATA.channelName,
          banner: fetchedData.banner || DEFAULT_METADATA.banner,
          avatar: fetchedData.avatar || DEFAULT_METADATA.avatar,
          channelLink: fetchedData.channelLink || DEFAULT_METADATA.channelLink,
          links: fetchedData.links || DEFAULT_METADATA.links,
        });

        setloading(true);
        setTimeout(() => {
          setcompleted(true);
          props.onApiDataLoaded();
        }, 0);
      } catch (error) {
        console.error("Error fetching channel data:", error);
        setChannelData(DEFAULT_METADATA);
        setloading(true);
        setTimeout(() => {
          setcompleted(true);
          props.onApiDataLoaded();
        }, 0);
      }
    };

    fetchChannelData();
  }, [videoId, props.onApiDataLoaded]);

  return (
    <>
      {!completed ? (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#0A0A0A] text-white">
          {!loading ? (
            <div className="flex flex-col items-center gap-4">
              <img
                src={logo}
                alt="AppOpener Logo"
                className="w-20 h-20 drop-shadow-[0_0_15px_#00F5FF]"
              />
              <span className="text-lg text-[#00F5FF] drop-shadow-[0_0_10px_#00F5FF]">
                Please Wait...
              </span>
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#FF00A0] drop-shadow-[0_0_8px_#FF00A0]"></div>
            </div>
          ) : (
            <div className="text-4xl text-[#42b883] drop-shadow-[0_0_10px_#42b883]">
              &#x2713;
            </div>
          )}
        </div>
      ) : (
        <header className="flex flex-row justify-between items-center px-4 py-2 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#9D4EDD]/40 shadow-[0_0_15px_#9D4EDD]/40">
          {/* Avatar + Channel */}
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              {/* <img
                src={data.avatar}
                alt="Profile Avatar"
                className="relative flex shrink-0 overflow-hidden rounded-full h-10 w-10 border-2 border-[#FF00A0] shadow-[0_0_10px_#FF00A0]"
              /> */}
              <div className="text-lg md:text-xl font-bold text-[#00F5FF] drop-shadow-[0_0_8px_#00F5FF] mx-2">
                {data.channelName}
                <div className="flex flex-wrap gap-2 mt-1">
                  {data.links &&
                    data.links.map((link, index) => (
                      <a
                        key={index}
                        href={`https://${link.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-125 transition-transform duration-200"
                      >
                        <img
                          src={link.favicon[0]?.url}
                          alt={`Favicon for ${link.title}`}
                          className="w-5 h-5 drop-shadow-[0_0_8px_#9D4EDD]"
                        />
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setShareTrayOpen(true);
                props.onCancelRedirect();
              }}
              className="relative overflow-hidden rounded-lg transition-all duration-300 flex items-center justify-center bg-[#FF00A0] hover:bg-[#FF4DC8] shadow-[0_0_12px_#FF00A0] hover:shadow-[0_0_18px_#FF00A0] text-white font-medium px-4 py-2"
            >
              Login
            </button>
            <button
              onClick={() => {
                props.onSetShowGenerateLink(true);
              }}
              className="relative overflow-hidden rounded-lg transition-all duration-300 flex items-center justify-center bg-[#00F5FF] hover:bg-[#00D4E0] shadow-[0_0_12px_#00F5FF] hover:shadow-[0_0_18px_#00F5FF] text-black font-semibold px-4 py-2"
            >
              Tick.it
            </button>
          </div>
        </header>
      )}

      {/* Popups + Dialogs */}
      <ContactDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        Creator1={data.channelName}
        Video={props.video_id}
        LInk={props.url}
      />
      <ShareTray open={shareTrayOpen} onOpenChange={setShareTrayOpen} />
      <Boot
        show={showPopup}
        onClose={closePopup}
        onNextPopup={showSecondPopupHandler}
        onBack={backToFirstPopup}
        showSecondPopup={showSecondPopup}
        showThirdPopup={showThirdPopup}
        onProfileClick={handleProfileClick}
      />
    </>
  );
};

export default UserProfile;
