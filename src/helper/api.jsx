import axios from "axios";
import InApp from "detect-inapp";

const api_url = "https://appopener-backend-1klr.onrender.com/";

async function safeAxiosRequest(config) {
  try {
    const res = await axios(config);

    if (res && res.status === 200 && res.data) {
      return res.data;
    } else {
      console.warn("Empty or unexpected API response:", res);
      return { error: true, message: "Empty or invalid response" };
    }
  } catch (err) {
    if (err.response) {
      console.error("API error:", err.response.status, err.response.data);
      return {
        error: true,
        message: `API returned ${err.response.status}`,
        details: err.response.data || null,
      };
    } else if (err.request) {
      console.error("No response received:", err.request);
      return { error: true, message: "No response from server" };
    } else {
      console.error("Axios config error:", err.message);
      return { error: true, message: err.message };
    }
  }
}

export async function getURLandredirect(tag, shorturl) {
  const useragent = navigator.userAgent || navigator.vendor || window.opera;
  const inapp = new InApp(useragent);

  const devicetype = inapp.isDesktop ? "Desktop" : inapp.isMobile ? "Mobile" : "none";
  const ostype = getMobileOperatingSystem();
  const BrowserType = inapp.browser;

  return safeAxiosRequest({
    url: `${api_url}goto/${tag}/${shorturl}`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: { DeviceType: devicetype, OsType: ostype, BrowserType },
  });
}

export async function generateOpenShortLink(tag, original_link) {
  return safeAxiosRequest({
    url: `${api_url}createOpenURL`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: { link: original_link, apptype: tag },
  });
}

export async function generateUserLink(tag, original_link, Auth_token) {
  const res = await safeAxiosRequest({
    url: `${api_url}createUserURL`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: { link: original_link, apptype: tag, authtoken: Auth_token },
  });

  if (res.error && res.message.includes("401")) return "Invalid Token";
  return res;
}

export async function checkIfUserExist(name, email, user_id) {
  return safeAxiosRequest({
    url: `${api_url}checkUserExist`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: { name, email, userid: user_id },
  });
}

export async function getUserDashboard(Auth_token) {
  const res = await safeAxiosRequest({
    url: `${api_url}userdata`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: { authtoken: Auth_token },
  });

  if (res.error && res.message.includes("401")) return "Invalid Token";
  return res;
}

function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/windows phone/i.test(userAgent)) return "Windows";
  if (/android/i.test(userAgent)) return "Android";
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";

  return "Other";
}