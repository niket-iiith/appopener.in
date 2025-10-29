import React from "react";
import { useState, useEffect } from "react";
import { FaEdit, FaLink } from "react-icons/fa";
import { Pencil, X } from "lucide-react";
import InApp from "detect-inapp";
import ShareButton from "react-web-share-button";
import ShareButtons from "./share";
import StoryModal from "./StoryModal";
import { ToastContainer, toast } from "react-toastify";
import LoadingScreen from "./Loader";
import SpaceBackground from "./spaceComponent";

const LinkModal = ({ isOpen, onClose, link, originalUrl, onClickAway }) => {
  const [editable, setEditable] = useState(false);
  const [copied, setCopied] = useState(false);
  const [updatedShortId, setUpdatedShortId] = useState("");
  const [updatedLink, setUpdatedLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumbnail, setThumbnail] = useState("");
  const [newThumbnanil, setNewThumbnail] = useState("");
  const [error, setError] = useState("");
  const [shortId, setShortId] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setloading] = useState(true);
  const [Success, setSuccess] = useState(false);
  const [Story, setStory] = useState(false);

  useEffect(() => {
    const fetchPreview = async () => {
      setloading(true);
      try {
        const url = new URL(link);
        const extractedShortId = url.pathname.split("/").pop();
        setShortId(extractedShortId);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}yt/preview/${extractedShortId}`
        );
        if (!response.ok) {
          toast.error("Failed to fetch preview");
          throw new Error("Failed to fetch preview");
        }

        const { title, description, thumbnail } = await response.json();
        setTitle(title);
        setThumbnail(thumbnail);
        setloading(false);
      } catch (error) {
        console.error("Error fetching preview:", error);
        setloading(false);
        toast.error("Error fetching preview");
      }
    };

    if (link) {
      fetchPreview();
    }
  }, [link]);

  const validateDomainSafeShortId = (id) => {
    if (!id) {
      return { isValid: false, message: "Short ID is required" };
    }

    // Check length (reasonable limits for domain usage)
    if (id.length < 1) {
      return {
        isValid: false,
        message: "Short ID must be at least 1 character long",
      };
    }

    if (id.length > 63) {
      return {
        isValid: false,
        message: "Short ID must be 63 characters or less",
      };
    }

    // Check for domain-safe characters only (alphanumeric and hyphens)
    const domainSafeRegex = /^[a-zA-Z0-9-]+$/;
    if (!domainSafeRegex.test(id)) {
      return {
        isValid: false,
        message: "Short ID can only contain letters, numbers, and hyphens",
      };
    }

    // Cannot start or end with hyphen (domain rule)
    if (id.startsWith("-") || id.endsWith("-")) {
      return {
        isValid: false,
        message: "Short ID cannot start or end with a hyphen",
      };
    }

    // Cannot have consecutive hyphens (domain rule)
    if (id.includes("--")) {
      return {
        isValid: false,
        message: "Short ID cannot contain consecutive hyphens",
      };
    }

    // Reserved words that should not be used as short IDs
    const reservedWords = [
      "www",
      "mail",
      "ftp",
      "localhost",
      "admin",
      "root",
      "api",
      "app",
      "blog",
      "shop",
      "store",
      "news",
      "support",
      "help",
      "about",
      "contact",
      "login",
      "register",
      "signup",
      "signin",
      "logout",
      "dashboard",
      "profile",
      "settings",
      "config",
      "assets",
      "static",
      "cdn",
      "img",
      "images",
      "js",
      "css",
      "fonts",
      "media",
      "uploads",
      "downloads",
      "files",
      "docs",
      "legal",
      "privacy",
      "terms",
      "tos",
      "dmca",
      "security",
      "ssl",
      "tls",
      "http",
      "https",
      "ftp",
      "sftp",
      "ssh",
      "telnet",
      "smtp",
      "pop",
      "imap",
      "dns",
      "mx",
      "ns",
      "cname",
      "txt",
      "spf",
      "dkim",
      "dmarc",
    ];

    if (reservedWords.includes(id.toLowerCase())) {
      return {
        isValid: false,
        message: "This short ID is reserved and cannot be used",
      };
    }

    return { isValid: true, message: "Short ID is domain-safe" };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateDomainSafeShortId(shortId);
    if (!validation.isValid) {
      console.error("Invalid Short ID:", validation.message);
      toast.error(`Invalid Short ID: ${validation.message}`);
      setSuccess(false);
      return;
    }

    setloading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("link", originalUrl);
      if (updatedShortId) {
        formData.append("customShortId", updatedShortId);
      }

      formData.append("image", selectedFile);

      const response = await fetch(
        process.env.REACT_APP_API_URL + "createOpenURL",
        {
          method: "POST",
          body: formData, // DO NOT set Content-Type manually
        }
      );

      const updatedData = await response.json();

      if (!response.ok) {
        console.error("Error creating link:", response.error);
        toast.error(updatedData.error || "Failed to create link");
        throw new Error(updatedData.message || "Failed to create link");
      }

      setSuccess(true);
      toast.success("Link updated successfully!");
      setShortId(updatedShortId);
      setUpdatedLink(link.replace("yt/", `yt/${updatedShortId}`));
      setError("");
      setEditable(false);

      if (updatedData.thumbnail) {
        setThumbnail(updatedData.thumbnail);
      }

      // Trigger success callbac
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.error || "Something went wrong.");
      setSuccess(false);
    } finally {
      setloading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target?.files?.[0]; // Safely access the first file
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        setSuccess(false);
        return;
      }

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit");
        setSuccess(false);
        return;
      }

      setSelectedFile(file);
      setError("");
      setSuccess(false);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewThumbnail(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError("No File Selected");
    }
  };

  if (!isOpen) return null;
  return (
    <div className="z-10">
      <ToastContainer />
      {loading && <LoadingScreen isLoading={loading} />}
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={() => {
          if (!Story) (onClickAway || onClose)();
        }}
      >
        <div
          className="shadow-lg p-1 m-2 md:w-[450px] max-h-[80vh] overflow-y-auto relative rounded-xl text-white border-white border-2"
          onClick={(e) => e.stopPropagation()}
        >
          <SpaceBackground />
          <div className="relative z-10">
          <div className="flex justify-between items-center pt-1">
            <h2 className="text-lg font-semibold">BRAND YOUR LINKS</h2>
            <button
              onClick={() => onClose()}
              className="flex items-center justify-center font-extrabold text-lg border-1 border-white rounded px-2"
            >
              <X size={20} />
            </button>
          </div>

          <div className="w-full h-auto bg-gray-100 rounded-md">
            <img
              src={newThumbnanil ? newThumbnanil : thumbnail}
              alt="Preview"
              className="w-full h-full ascept-16/9 max-h-[300px] object-cover z-100"
            />
            {/* {editable && (
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {selectedFile && (
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedFile.name} (
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
            )} */}
          </div>

          {!editable ? (
            <div className="flex flex-col items-center justify-center mb-1">
              <div className="flex items-center justify-between input-group shadow-sm mb-2 w-full">
                <span className="p-2 rounded-l border-1 border-white bg-secondary text-white">
                  <FaLink size={16}/>
                </span>
                <label
                  className="text-white border-white text-center p-1 w-auto"
                  id="myLinkInput"
                >
                  {(() => {
                      const text = updatedShortId
                        ? `${link.replace(/(.*yt\/).*/, "$1")}${updatedShortId}`
                        : link;

                      return text.length > 35
                        ? text.slice(0, 32) + "..."
                        : text;
                    })()}
                </label>
                <span className="p-2 rounded-r border-1 border-white bg-secondary text-white hover:cursor-pointer"onClick={() => setEditable(true)}>
                  <Pencil size={16} />
                </span>
              </div>
              <p className="w-full text-left -mb-0 text-yellow-100">⚡ Step 3: Copy Link</p>
              <div className="flex items-center gap-2 w-full mb-2">
                <button
                  className="flex-1 border border-gray-300 rounded p-2 hover:bg-gray-100"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      updatedShortId
                        ? `${link.replace(/(.*yt\/).*/, "$1")}${updatedShortId}`
                        : link
                    );
                    setCopied(true);
                    toast.info("Link copied to clipboard! 📋");
                  }}
                >
                  Copy Link
                </button>
                <ShareButton
                  title="AppOpener Smartlink"
                  url={link}
                  buttonStyle={{
                    backgroundColor: "white",
                    color: "black",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #EDE5E3",
                    cursor: "pointer",
                    width: "50%",
                    textAlign: "center",
                    hover: { backgroundColor: "#f3f4f6" },
                  }}
                />
              </div>
              <p className="w-full text-left -mb-0 text-yellow-100">
                ⚡ Step 4: Create Your Super Story
              </p>
              <button
                className="w-full border text-white font-extrabold text-lg border-gray-300 rounded p-2 bg-green-500 hover:bg-green-600 [text-shadow:_2px_2px_6px_rgba(255,0,0,1)]"
                onClick={() => setStory(true)}
              >
                SUPER STORY
              </button>
            </div>
          ) : (
            <>
              <div className="input-group flex items-center border rounded-lg overflow-hidden mb-2">
                {/* Fixed Part */}
                {/* <span className="input-group-text bg-secondary text-white">
                  <FaLink />
                </span> */}
                <span className="bg-gray-200 py-2 text-gray-700 text-sm whitespace-nowrap text-left mr-1">
                  https://appopener.in/yt/
                </span>

                {/* Editable Part */}
                <input
                  type="text"
                  value={updatedShortId}
                  onChange={(e) => setUpdatedShortId(e.target.value.toLowerCase())}
                  className="input-group flex-1 py-2 outline-none border-white text-sm text-black px-2"
                  placeholder=" Boost SEO & Search Ranking"
                />
              </div>
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button
                  className="flex-1 border border-gray-300 rounded p-2 hover:bg-gray-100"
                  onClick={() => {
                    setEditable(false);
                    setNewThumbnail("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
        <StoryModal
          isOpen={Story}
          onClose={() => setStory(false)}
          link={updatedLink ? updatedLink : link}
          shortId={shortId}
          title={title}
          thumbnail={thumbnail}
            className="fixed inset-0 z-[9999]"
          />
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
