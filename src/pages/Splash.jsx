import { Component } from "react";
import React from "react";
import classes from "../components/Styles.module.css";
import { GetLatestBlogs, getSuggestions, getURLandredirect } from "../helper/api";
import "../css/splash.css";
// import logo from "../assets/logo.png";
// import new_logo from "../assets/Omni-logo.png";
// import deetmelogo from "../assets/deet-me-logo.png";
// import DeetLogo from "../assets/deet-logo.png";
// import AdUI from "../assets/ui.png";
// import deetbg from "../assets/deet.png";
// import appopener_text from "../assets/ac.png";
// import GoogleAd from "../components/GoogleAd";
// import O from "../assets/O.png";
// import P from "../assets/P.png";
// import SaveUserCredentials from "../components/SaveUserCredentials";
import PageHead from "../components/Splash/PageHead";
// import AdsComponent from "../components/Ads/AdsComponent";
//import splash_adv from "../assets/splash/splash_adv.png";
import appOpnr from "../assets/AppOpener.png";
import star from "../assets/star.png";
import star1 from "../assets/star1.png";
import rocket from "../assets/services/Rocket.png";
import redbutton from "../assets/redbutton.png";
import homeImage from "../assets/footer-space-man.avif"
import ShareButtons from "../components/share";
import {
  Button,
} from "react-bootstrap";

import Modal from "react-awesome-modal";

import {
  generateOpenShortLink,
  generateUserLink,
  checkIfUserExist,
} from "../helper/api";

import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";

import {
  FaCircleNotch,
  FaCopy,
  FaTimesCircle,
} from "react-icons/fa";
import { FaLink } from "react-icons/fa";

import ShareButton from "react-web-share-button";

import { CopyToClipboard } from "react-copy-to-clipboard";
import "../css/profile.css";
import InApp from "detect-inapp";

import Login from "../components/login";
import HamburgerMenu from "../components/hamburger";
import Small_ham from "../components/small_ham";
import axios from "axios";
import Suggest from "../components/Splash/Suggest";
import Blog from "../components/Splash/Blog";
import AdSterraBanner from "../components/Ads/AdSterraBanner300x250";
import AdSterraBanner300x250 from "../components/Ads/AdSterraBanner300x250";
import AdSterraBanner320x50 from "../components/Ads/AdSterraBanner320x50";
import AdSterraNativeBanner from "../components/Ads/AdSterraNativeBanner";
import AdSterraBanner160x300 from "../components/Ads/AdSterraBanner160x300";
import AdSterraBanner468x60 from "../components/Ads/AdSterraBanner468x60";

import AdxBanner250x250 from "../components/Ads/Adx/AdxBanner250x250";
import AdxBanner320x50 from "../components/Ads/Adx/AdxBanner320x50";

// import { log } from "console";




class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intentvalue: "", original_url: "", ostype: "", showFullText: false, setPageHead: false, linkMetadata: {}, isSmallScreen: false,
      thumbUrl: "",
      description: "",
      video_id: "",
      video_title: "",
      channel_title: "",
      yt_dp_url: "",
      seconds: "3",
      redirectText: "Redirecting in",
      show_description: false,
      suggestions: {},
      showSuggestion: false,
      blogs: {},
      showBlogs: false,
      googleuserID: "",
      GoogleAuthToken: "",
      isLogin: false,
      visible_captcha: false,
      errortext: "",
      loadingicon: false,
      generateModalVisibe: false,
      old_original_url: "",
      generateURL: "",
      captchadone: false,
      copied: false,
      generatedlink: "",
      userURL: "",
      displayemail: "",
      displayImage: "",
      displayname: "",
      url:''
    };

    this.getLoginDetails = this.getLoginDetails.bind(this);
    this.openCaptchaModal = this.openCaptchaModal.bind(this);
  }



  fetchData = async () => {
    // console.log(this.state.video_id)
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${this.state.video_id}&key=AIzaSyDmdJlLHLNXXrcziAnfmZ0PfL7Pl7Reza0`
      );

      const videoInfo = response.data.items[0].snippet;

      const yt_dp = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?key=AIzaSyDmdJlLHLNXXrcziAnfmZ0PfL7Pl7Reza0&id=${videoInfo.channelId}&part=snippet`
      );
      // console.log("dp",yt_dp.data)
      // console.log("pro",yt_dp.data.items[0].snippet.thumbnails.high.url)

      const thumbnail = videoInfo.thumbnails.high.url;
      const videoDescription = videoInfo.description;
      const channel_title = videoInfo.channelTitle;
      // console.log("videoinfo", videoInfo);

      this.setState({
        thumbUrl: thumbnail,
        video_description: videoDescription,
        video_title: videoInfo.title,
        channel_title: videoInfo.channelTitle,
        yt_dp_url: yt_dp.data.items[0].snippet.thumbnails.high.url
      });

      // console.log('description',typeof(this.state.video_description));
    } catch (error) {
      // console.error("Error fetching YouTube data:", error);
    }
  };

  getSugBlog = async () => {
    try {
      let suggestions = await getSuggestions();
      if (suggestions !== undefined) {
        this.setState({
          suggestions: suggestions
        });

        this.setState({
          showSuggestion: true
        });
      }

      let blogs = await GetLatestBlogs(10);
      console.log(blogs);
      if (blogs !== undefined) {
        this.setState({
          blogs: blogs
        });

        this.setState({
          showBlogs: true
        });
      }
    } catch (err) {
      console.log("Error fetching suggesstions");
    }
  }

  componentDidMount() {
    let apptag = this.props.match.params.apptype;
    let shortstring = this.props.match.params.shorturl;
    getURLandredirect(apptag, shortstring).then((res) => {
      if (res === undefined) {
        return
      }
      const linkMeta = res.data.metadata;
      var linkMetaTag = linkMeta.tag || "";
      linkMetaTag = linkMetaTag.trim();
      linkMetaTag = linkMetaTag + "appopener app0 appo smart links urlshortener url shortener opnr opener spawnser";
      linkMetaTag = linkMetaTag.replace(/ /g, ", ")
      this.setState({
        linkMetadata: {
          title: linkMeta.title || "AppO: My 0pen PWAs",
          image: linkMeta.image || homeImage,
          description: linkMeta.description || "AppOpener Official creates your smart, secure and personalised web app in 0th second to help you monitor and monetise your data, userflow and deeplink choices on the web & social media platforms for influencers, creators, startups and online communities.",
          embedUrl: linkMeta.embedUrl || "",
          tag: linkMetaTag
        }
      })


      this.setState({ setPageHead: true })
      this.setState({ intentvalue: res.data.app_intend });
      this.setState({ original_url: res.data.originalURL });
      this.setState({ ostype: res.data.os_type });
      let app_intend = this.state.intentvalue;
      let originalURL = this.state.original_url;
      // Extract video ID from both YouTube URL and youtu.be URL
      let videoId = "";
      if (originalURL.includes("youtu.be")) {
        // For youtu.be URL
        const urlParams = new URL(originalURL);
        videoId = urlParams.pathname.substr(1);
      } else {
        // For regular YouTube URL
        const urlParams = new URL(originalURL);
        videoId = urlParams.searchParams.get("v");
      }
      // setting videoId to fetch video data
      this.setState({ video_id: videoId }, () => {
        // console.log("State has been updated:", this.state.video_id);
      });

      // Move fetchData outside the setState callback
      this.fetchData();

      this.getSugBlog();

      const click_link = document.getElementById("abcd");
      // console.log(app_intend);
      if (app_intend === "Desktop" || app_intend === "Mobile") {
        app_intend = originalURL;
      }

      this.timerInterval = setInterval(() => {
        this.setState(prevState => ({
          seconds: prevState.seconds - 1
        }), () => {
          if (this.state.seconds === 0) {
            this.setState({ seconds: "", redirectText: "Click here to Continue" })
            if (this.state.ostype == "windows") {
              click_link.setAttribute("href", app_intend);
              click_link.click();
              //console.log("hello")
            }
            const cancel = document.getElementById("cancel");
            cancel.style.display = "none";
            clearInterval(this.timerInterval);
            // Perform action after 5 seconds (e.g., trigger a click event)
          }
        });
      }, 1000); // Update every second


      setTimeout(() => {
        if (this.state.ostype == "windows") {
          click_link.setAttribute("href", app_intend);
          // click_link.click();
          //console.log("hello")
        } else {
          click_link.setAttribute("href", app_intend);
          window.location.assign(app_intend);
        }
      }, 5000);


    });

    window.addEventListener("resize", this.updateScreenSize);
    // Call updateScreenSize once to set initial state based on screen size
    this.updateScreenSize();

  }
  componentWillUnmount() {
    // Cleanup listener on unmount
    window.removeEventListener("resize", this.updateScreenSize);
    clearInterval(this.timerInterval);
  }
  updateScreenSize = () => {
    // Update isSmallScreen state based on screen width
    this.setState({ isSmallScreen: window.innerWidth <= 655 });
  };

  stopRedirecting() {
    this.setState({ seconds: "", redirectText: "Click here to Continue" });
    clearInterval(this.timerInterval);
    const cancel = document.getElementById("cancel");
    cancel.style.display = "none";
  }

  getLoginDetails(val) {
    // alert("hi");
    // do not forget to bind getData in constructor
    //console.log("hello - ",val);
    //console.log("userID herosection - ", val.googleId);
    // console.log("email herosection - ",val.profileObj.email);
    if (val.googleId) {
      this.setState({
        googleuserID: val.googleId,
        isLogin: true,
        displayemail: val.profileObj.email,
        displayImage: val.profileObj.imageUrl,
        displayname: val.profileObj.name,
        GoogleAuthToken: val.tokenObj.id_token,
      });

      checkIfUserExist(
        this.state.displayname,
        this.state.displayemail,
        this.state.googleuserID,
        this.state.GoogleAuthToken
      );

      if (localStorage.getItem('loaded') === 'ignoreOnce') {
        localStorage.removeItem('loaded');
      }
    }
  }

  async timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  async openCaptchaModal(event) {
    this.setState({
      visible_captcha: true,
      errortext: "",
      loadingicon: false,
    });
    await this.timeout(1000);
    if (!this.state.isLogin) {
      console.log("Here");
      loadCaptchaEnginge(4, "black", "white");
    }


    event.preventDefault();
  }

  closeCaptchaModal() {
    this.setState({
      visible_captcha: false,
    });
  }

  handleGenerateModal() {
    console.log(this.state.userURL);
    this.setState({ generateModalVisibe: true, loadingicon: true });

    //check if same link is clicked again & again
    let appopener_app_url = process.env.REACT_APP_SMART_LINK_PREFIX;
    if (this.state.userURL === this.state.old_original_url) {
      this.setState({
        loadingicon: false,
        generatedlink: this.state.generatedlink,
      });
    } else {
      //check if user is login or not

      console.log("Generating Link");
      if (this.state.isLogin) {
        this.setState({ generatedlink: "", copied: false });
        //check first whether to create new user account or not
        checkIfUserExist(
          this.state.displayname,
          this.state.displayemail,
          this.state.googleuserID,
          this.state.GoogleAuthToken
        );

        console.log(this.state.GoogleAuthToken);
        generateUserLink(
          this.state.appname,
          this.state.userURL,
          this.state.GoogleAuthToken
        ).then((res) => {

          console.log("Here");


          //console.log("status");
          //console.log(res.status);
          if (res.status == 401) {
            alert("Invalid Token Please try again");
            window.location.reload();
            return;
          }
          let tag = res.data.tag.toLowerCase();
          //console.log(tag);
          let original_url = res.data.originalURL;

          if (tag === "youtube") {
            tag = "yt";
          } else if (tag === "instagram") {
            tag = "ig";
          } else if (tag === "spotify") {
            tag = "sp";
          } else if (tag === "telegram") {
            tag = "tg";
          } else if (tag === "twitter") {
            tag = "tw";
          } else if (tag === "linkedin") {
            tag = "lk";
          } else if (tag === "playstore") {
            tag = "ps";
          } else {
            tag = "web";
          }
          let generated_url = appopener_app_url + tag + "/" + res.data.shortid;
          this.setState({
            loadingicon: false,
            old_original_url: original_url,
            generatedlink: generated_url,
          });
        });
      } else {
        this.setState({ generatedlink: "" });
        generateOpenShortLink(this.state.appname, this.state.userURL).then(
          (res) => {


            console.log("Here1");
            console.log(res);


            //console.log(res);
            let tag = res.data.tag.toLowerCase();
            if (tag === "youtube") {
              tag = "yt";
            } else if (tag === "instagram") {
              tag = "ig";
            } else if (tag === "spotify") {
              tag = "sp";
            } else if (tag === "telegram") {
              tag = "tg";
            } else if (tag === "twitter") {
              tag = "tw";
            } else if (tag === "linkedin") {
              tag = "lk";
            } else if (tag === "playstore") {
              tag = "ps";
            } else {
              tag = "web";
            }
            let original_url = res.data.originalURL;
            let generated_url =
              appopener_app_url + tag + "/" + res.data.shortid;
            //this.setState({intentvalue : res.data.app_intend});
            this.setState({
              loadingicon: false,
              old_original_url: original_url,
              generatedlink: generated_url,
            });
          }
        );
      }
    }
  }
  // updateGeneratedUrl = (generatedUrl) => {
  //   this.setState({ url: generatedL });
  // };

  submitForm = () => {
    this.setState({
      errortext: "",
      loadingicon: false,
    });
    let origLink = document.getElementById("user_link_input").value;
    let user_captcha;

    if (this.state.isLogin) {
      user_captcha = "LoggedIn"
    } else {
      user_captcha = document.getElementById("user_captcha_input").value;
    }

    if (origLink === "" || origLink === " ") {
      this.setState({
        errortext: "Please enter correct link",
      });
    } else if (user_captcha === "" || user_captcha === " ") {
      this.setState({
        errortext: "Please enter captcha value",
      });
    } else {
      if (this.state.isLogin || validateCaptcha(user_captcha) == true) {
        this.setState({
          userURL: origLink,
          errortext: "Verified Please wait ... ",
          loadingicon: true,
        });
        this.state.userURL = origLink;

        if (!this.state.isLogin) {
          loadCaptchaEnginge(4, "black", "white");
          document.getElementById("user_captcha_input").value = "";
        }
        this.handleGenerateModal();
      } else {
        this.setState({
          errortext: "Captcha not matched, Plz try again",
        });
        document.getElementById("user_captcha_input").value = "";
      }
    }
  }

  closeModal() {
    this.setState({
      generateModalVisibe: false,
    });
    this.closeCaptchaModal();
  }

  updateGeneratedUrl = (generatedURL) => {
    this.setState({ url: generatedURL });
  };

  
  render() {



    let apptag = this.props.match.params.apptype;
    let shortstring = this.props.match.params.shorturl;



    const useragent = navigator.userAgent || navigator.vendor || window.opera;
    const inapp = new InApp(useragent);

    // const {generated_url}=this.state;



    const handleCLick = (event) => {
      this.setState({ generateURL: "" });
    };

    let modal_captcha = <div></div>;

    if (this.state.visible_captcha) {
      modal_captcha = (
        <Modal
          style={{ position: "absolute" }}
          visible={this.state.visible_captcha}
          width="500"
          height="300"
          effect="fadeInDown"
          position="absolute"
          onClickAway={() => this.closeCaptchaModal()}
        >
          <div className="modal-content" style={{ border: "0" }}>
            <div className="modal-header text-center">
              <h5 className="modal-title">Generate Smart Links</h5>
              <a
                href="javascript:void(0);"
                onClick={() => this.closeCaptchaModal()}
              >
                <FaTimesCircle size="25px" />
              </a>
            </div>
            <div className="modal-body">
              {this.state.isLogin ? (
                <>
                  <center>
                    <div>
                      <input
                        placeholder="Enter Link to Smartify"
                        id="user_link_input"
                        className="form-control"
                        name="user_link_input"
                        type="text"
                      ></input>
                      {" "}
                      <p className="text-danger">{this.state.errortext}</p>
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={this.submitForm}
                      >
                        Submit
                        {this.state.loadingicon ? (
                          <FaCircleNotch className={classes.spinner} />
                        ) : (
                          ""
                        )}
                      </button>
                    </div>
                    <br></br>
                  </center>
                </>
              ) : (
                <>
                  <center>
                    <Login sendData={this.getLoginDetails} />
                  </center>

                  <center>
                    <h3>OR</h3>
                  </center>

                  <center>
                    <div>
                      <input
                        placeholder="Enter Link to Smartify"
                        id="user_link_input"
                        className="form-control"
                        name="user_link_input"
                        type="text"
                      ></input>
                      {" "}
                      <>
                        <LoadCanvasTemplate
                          reloadText="Reload Captcha"
                          reloadColor="green"
                        />
                        <input
                          placeholder="Enter Captcha Value"
                          id="user_captcha_input"
                          className="form-control"
                          name="user_captcha_input"
                          type="text"
                        ></input>
                      </>


                      <p className="text-danger">{this.state.errortext}</p>
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={this.submitForm}
                      >
                        Submit
                        {this.state.loadingicon ? (
                          <FaCircleNotch className={classes.spinner} />
                        ) : (
                          ""
                        )}
                      </button>
                    </div>
                    <br></br>
                  </center>
                </>
              )}
            </div>
          </div>
        </Modal>
      );
    } else {
      modal_captcha = <div></div>;
    }
    let modal_generatelink = <div></div>;
    if (this.state.generateModalVisibe) {
      modal_generatelink = (
        <Modal
          style={{ position: "absolute" }}
          visible={this.state.generateModalVisibe}
          width="90%"
          height="50%"
          effect="fadeInDown"
          position="absolute"
          onClickAway={() => this.closeModal()}
        >
          <div className="modal-content" style={{ border: "0" }}>
            <div className="modal-header text-center">
              <h5 className="modal-title">Smarten your Links</h5>
              <a href="javascript:void(0);" onClick={() => this.closeModal()}>
                <FaTimesCircle size="25px" />
              </a>
            </div>
            <div className="modal-body">
              <div className="input-group mt-3">
                <button
                  className="btn btn-secondary"
                  disabled={true}
                  type="button"
                  style={{ padding: "10px" }}
                  onClick={handleCLick}
                >
                  <FaLink size="20px" />
                </button>
                <input
                  type="text"
                  className="form-control"
                  style={{ padding: "10px" }}
                  value={this.state.generatedlink}
                  disabled={true}
                />
                <div className="input-group-append">
                  {this.state.loadingicon ? (
                    <>
                      {" "}
                      <button
                        className="btn btn-primary"
                        type="button"
                        style={{ padding: "11px" }}
                      >
                        <FaCircleNotch className={classes.spinner} /> Please
                        wait
                      </button>
                    </>
                  ) : (
                    <>
                      <CopyToClipboard
                        text={this.state.generatedlink}
                        onCopy={() => this.setState({ copied: true })}
                      >
                        <button
                          className="btn btn-primary"
                          type="button"
                          style={{ padding: "11px" }}
                        >
                          <FaCopy size="25px" /> Copy Link
                        </button>
                      </CopyToClipboard>
                    </>
                  )}
                </div>
              </div>
              {this.state.copied ? (
                <p style={{ color: "red", padding: "5px" }}>link copied</p>
              ) : (
                ""
              )}

              <hr />
            </div>
            <div
              className="modal-footer"
              style={{ display: "block", borderTop: "0" }}
            >
              {inapp.isMobile ? (
                <ShareButton
                  className=""
                  title="AppOpener Smartlink"
                  url={this.state.generatedlink}
                />
              ) : (
                <>
                  <center>
                    <ShareButtons
                      title="AppOpener Smartlink"
                      url={this.state.generatedlink}
                      tags="#appopener"
                    />
                  </center>
                </>
              )}
            </div>
          </div>
        </Modal>
      );
    } else {
      modal_generatelink = <div></div>;
    }

   
    
    

return (


      // <div className={classes.mainContainer}>

      //     {/* <h1>Splash page - {this.props.match.params.apptype}</h1>
      //     <a href={this.state.intentvalue}>{this.state.intentvalue}</a> */}

      //     <div className = 'heading'>
      //         <a href="https://midas.appopener.com/">
      //             <img src={new_logo} style={{"width": "210px"}} alt="AppOpener" />
      //         </a>
      //     </div>
      //     <div className= 'heading'>
      //         <h1 style={{color:"#fd5331", "margin-top": "1px"}}>Name is verse, Omniverse!</h1>
      //     </div>
      //     <div className='heading'>
      //         <p className="title-text" style={{fontFamily:"monospace",fontSize:"17px", "margin-top": ".05px"}}>Building towards Web 3.0</p>
      //     </div>

      //     <center style={{"margin-top": "22px"}}>
      //     <a id="abcd" target="_blank" style={{"text-decoration": "none", "font-size": "30px", "font-family": "monospace","backgroundColor":"#ffc107","padding":"10px 20px 10px 20px"}}>Continue</a>
      //     </center>
      //     <center style={{"margin-top": "33px"}}>
      //         {/* <a href="https://www.appopener.com/open">
      //             <img class="rotate" id="sticker" src={appopener_text} alt="AppOpener" />
      //             </a> */}

      //         <p style={{fontFamily:"monospace",fontSize:"16px"}}>"Genie, You are free!"<br/>Date: 27.12.2022<br/>Time: 12:29:29 - 0:00:00<br/>Speed: 90000 sec/day</p>
      //         <br/>

      //         <p style={{fontFamily:"monospace",fontSize:"15px"}}>Click below for more!</p>
      //         <a href="https://deet.me/dheet">
      //             <img src={deetmelogo} style={{"width": "180px"}} alt="AppOpener" />
      //         </a>
      //         <br/>
      //         <h1 style={{color:"#fd5331"}}>deet.me for ढीट</h1>

      //     </center>

      //     {/* <center>
      //         <p class="text" style={{"margin-top": "50px"}}>Boosting Your Link ....</p>
      //         </center> */}

      //     {/* <div className="poster_container">
      //         <center>
      //         <a href="https://yellowdiary.appopener.com/" target="_blank">
      //                 <img class="splash_poster img-responsive" src={splash_adv} alt="AppOpener" />
      //             </a>
      //             </center>
      //         </div> */}

      //     {/* <center>
      //         <p class="footer">
      //             <br /><br/>
      //             <p style={{"float":"left","marginLeft":"10px",fontFamily:"monospace",fontSize:"15px"}}>Click here -></p>
      //         </p>
      //     </center> */}

      // </div>

      // </>
      <>
        {this.state.setPageHead && <PageHead metadata={this.state.linkMetadata} />}



        {/* <AdsComponent dataAdSlot="6552881547" setClass="fullAds" /> */}

        <div className={classes.mainContainer}>

          <div className="App">
            <div className="w-screen h-[80px] flex items-center justify-center strip">
              <div className="logo">
                <a href="/"><img src={appOpnr} alt="" /></a>
              </div>
              <div style={{ marginLeft: "77%", marginBottom: "2%", whiteSpace: "nowrap" }}>
                {/* Conditionally render based on screen size */}
                {this.state.isSmallScreen ? <Small_ham /> : <HamburgerMenu />}
              </div>
            </div>

            {/* <iframe src="//www.topcreativeformat.com/watchnew?key=bc044563c60b844ce3eeda25f90893ae" width="468" height="60" frameborder="0" scrolling="no"></iframe> */}


            {/* <div className="Glass" style={{marginBottom: "20px"}}> */}

            {/* <h1 style={{color:"white",fontWeight:"900",marginTop: "20px"}}>What is AppOpener?</h1>
              <p style={{color:"white", fontSize: "30px"}}>And how much of it do I need?</p>


              <h2 style={{marginTop: "50px",fontWeight:"900"}}>Elevate Your Online Presence and Monetize Effectively</h2>
              <p>In today's rapidly evolving digital landscape, it's imperative to adapt and evolve continually. As the online realm becomes increasingly competitive, businesses and individuals alike must explore innovative solutions to enhance their online presence and drive engagement. At our platform, we offer a comprehensive suite of services tailored to meet diverse needs and elevate your digital journey to new heights.</p>
              {this.state.showFullText ? (<>

              <h2 style={{fontWeight:"900"}}> Explore a Range of Additional Services:</h2>
              <p>Our platform provides a diverse array of solutions designed to streamline app redirection processes and enhance user engagement seamlessly. With our suite of services, you can navigate the complexities of the digital sphere with ease and efficiency.</p>

              <h2 style={{fontWeight:"900"}}>Social Media App Redirection:</h2>  
              <p>Effortlessly direct users to specific apps, driving engagement and optimizing conversion rates with our Social Media App Redirection service. Seamlessly integrate your social media presence with targeted app experiences to maximize impact and foster meaningful interactions.</p>

              <h2 style={{fontWeight:"900"}}>Analytics and Tracking:</h2>
              <p>Gain valuable insights into key metrics such as click-through rates and app installations with our Analytics and Tracking tools. Armed with actionable data, you can make informed marketing decisions and refine your strategies for optimal performance and results.</p>

              <h2 style={{fontWeight:"900"}}>Custom App Links:</h2> 
              <p>Personalize your social media profiles with tailored links for platforms like YouTube, Facebook, Instagram, and Twitter. Enjoy the benefits of direct app access, simplifying the user journey and enhancing your online visibility and accessibility.</p>  
                
              <h2 style={{fontWeight:"900"}}>Smart Links:</h2>  
              <p>Streamline navigation for your audience with Smart Links, ensuring a seamless transition from social media platforms to the app of their choice. Simplify the user experience and maximize engagement opportunities across diverse digital channels.</p>

              <h2 style={{fontWeight:"900"}}>Branded Links:</h2>  
              <p>Elevate your brand's PR efforts with branded links that offer a competitive edge in the digital arena. Customize web page linked sub-domains to establish credibility and foster brand recognition among your target audience.</p>  
  
              <h2 style={{fontWeight:"900"}}>Deet Links:</h2>  
              <p>Showcase your online presence effortlessly with Deet Links, eliminating the hassle of web development. Personalize your platform to captivate your audience and express your brand identity with ease.</p>
               
              <h2 style={{fontWeight:"900"}}>Choice Links:</h2>  
              <p>Recognize the unique preferences of every user with Choice Links, enhancing satisfaction and engagement by providing personalized navigation options. Cater to individual needs and foster deeper connections with your audience.</p>
                
              <h2 style={{fontWeight:"900"}}>Form Links:</h2>
              <p>Simplify navigation and optimize user journeys with Form Links, offering multiple destinations through a single link. Tailor the online experience for each visitor and maximize conversion opportunities with ease.</p>  
                
              <h2 style={{fontWeight:"900"}}>QR Code Generation:</h2>
              <p>Enhance accessibility and engagement with QR Code Generation, providing users with a convenient way to share custom app links. Expand your reach and foster deeper connections with your audience across various digital platforms.</p>  
                
              <h2 style={{fontWeight:"900"}}>Monetize Your Online Presence:</h2>  
              <p>In addition to elevating your digital presence, our platform offers effortless monetization strategies to maximize your online potential.</p>
                
              <h2 style={{fontWeight:"900"}}>Sales:</h2>
              <p>Partner with beloved brands and generate revenue through affiliate sales of your favorite products and services. Monetize your influence and create valuable partnerships that drive growth and success.</p>
                
              <h2 style={{fontWeight:"900"}}>Promotional Deals:</h2>  
              <p>Address distribution challenges for businesses by connecting audiences with exceptional deals and promotions through our platform. Maximize exposure and drive sales while providing value to your audience.</p>  
                
              <h2 style={{fontWeight:"900"}}>Services:</h2>
              <p>Share your expertise and offer online consultations to help others achieve their goals. Monetize your knowledge and skills while making a positive impact on your community.</p>  
                
              <h2 style={{fontWeight:"900"}}>Analytics:</h2>
              <p>Harness the power of data with our analytics tool, enabling you to make informed decisions and optimize your online performance effectively. Track your progress, identify areas for improvement, and stay ahead of the competition.</p>  
                
              <h2 style={{fontWeight:"900"}}>Merchandises:</h2>
              <p>Showcase your products and creations with a personalized brand touch through our merchandising platform. Reach a wider audience and capitalize on new opportunities for growth and expansion.</p>  
                
              <h2 style={{fontWeight:"900"}}>Community:</h2>
              <p>Join our thriving community to expand your network, share insights, collaborate with like-minded individuals, and discover new avenues for online success. Engage with fellow users, exchange ideas, and unlock the full potential of your digital journey.</p> */}
            {/* <a className="splashButton loveButton" href="https://love.spawnser.com" target="_blank">SEND YOUR LOVE LETTER</a>
              <a className="splashButton linkButton" id="abcd" target="_blank">CONTINUE TO LINK</a> */}

            {/* <div className="rocketlogo">
                
                <img src={rocket} alt="" />

              </div> */}
            {/* </>):(<>
              <button onClick={() => {this.setState({showFullText: true})}} className="text-gray-400 text-xl py-3">...Read More</button>
              
              </>)} */}

            {/* </div> */}

            <a className="continueButton" id="abcd" target="_blank">
              <button style={{ color: "white", fontWeight: "600" }}><span style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>{this.state.redirectText} {this.state.seconds}</span></button>
            </a>

            <div className="cancel" id="cancel">
              <button style={{ color: "white", fontWeight: "600", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }} onClick={() => {
                this.stopRedirecting()
              }}>Cancel</button>
            </div>

            <br/>
{/*             <AdxBanner320x50 /> */}
            {/* <iframe src="//www.topcreativeformat.com/watchnew?key=6fbb1ac3837ccbcbdff1ce71edea4011" width="320" height="50" frameborder="0" scrolling="no"></iframe> */}

            <div className="Glass" style={{ margin: '1%', marginTop: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "10px" }}>
              {this.state.setPageHead ? (<>
                <div className="thumb">

                  <img src={this.state.linkMetadata.image} />


                </div>

                <div style={{ color: "white", padding: "15px", fontWeight: "700", wordWrap: "break-word", maxWidth: "500px" }}>
                  {this.state.linkMetadata.title}
                </div>

                {/* <div style={{ display: 'flex', alignItems: 'center', marginTop: "10px" }}>

                  <div style={{ width: '70px', height: '70px', overflow: 'hidden', borderRadius: '50%' }}>
                    <img src={this.state.yt_dp_url} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>

                  <div style={{ color: "white", fontSize: "20px", fontWeight: "700", marginLeft: '10px' }}>
                    {this.state.channel_title}
                  </div>

                </div> */}

                <div style={{ color: "white", maxWidth: "600px", margin: "10px auto" }}>
                  <span className="hover:cursor-pointer" onClick={() => this.setState({ show_description: !this.state.show_description })}>
                    {this.state.linkMetadata.description && this.state.show_description ?
                      (this.state.linkMetadata.description ?
                        this.state.linkMetadata.description :
                        this.state.linkMetadata.description
                      ) :

                      (this.state.linkMetadata.description ?
                        this.state.linkMetadata.description.split(' ').slice(0, 15).join(' ') + '. . .read more' :
                        this.state.linkMetadata.description
                      )
                    }
                  </span>
                </div>

              </>) : (<></>)}
            </div>



            

            {/* <AdSterraNativeBanner /> */}

            {/*             <div className="tag">
              <h1 style={{ fontSize: "20px", fontFamily: "Palatino" }}>"Unlock the wisdom of HARSH BENIWAL in their latest YouTube masterpiece - a must-watch for every enthusiast out there!"</h1>
            </div> */}

            {
              (process.env.REACT_APP_BOSS_TITLE.length) ?
                <>
                  <Suggest data={{
                    "smart_link": process.env.REACT_APP_BOSS_SMART_LINK,
                    metadata: {
                      "title": process.env.REACT_APP_BOSS_TITLE,
                      "image": process.env.REACT_APP_BOSS_IMAGE
                    }
                  }} key="boss1" />
                </> : <></>
            }

            <br />

            <div className="tag">
              <h3 style={{ fontSize: "30px", fontFamily: "Palatino" }}>"Scroll down for the latest trending videos!"</h3>
            </div>


            {/*             <GoogleAd slot="6702308324" googleAdId="ca-pub-1132813264748714" /> */}

{/*             <AdxBanner250x250 /> */}

{/*             <GoogleAd slot="6702308324" googleAdId="ca-pub-1132813264748714" /> */}


            {/* -------------------------------------------------- */}

            {this.state.showSuggestion ? <>
              {this.state.suggestions["links"].map((item, index) => {
                let key = `suggest${index}`
                return (
                  <>
                    <Suggest data={item} key={key} />
                  </>)
              })}
            </> : <></>}

            {/* -------------------------------------------------- */}

            {/* <iframe src="//www.topcreativeformat.com/watchnew?key=2e4a20b282be2769a30cda4b91c76921" width="300" height="250" frameborder="0" scrolling="no"></iframe> */}


            {/* -------------------------------------------------- */}


            {this.state.showBlogs ? <>
              <div className="tag">
                <h1 style={{ fontSize: "30px", fontFamily: "Palatino" }}>"Why AppOpener?"</h1>
              </div>

              {this.state.blogs["data"].map((item, index) => {
                let key = `blog${index}`
                return (<Blog data={item} key={key} />)
              })}
            </> : <></>}


            {/* -------------------------------------------------- */}

            {/* <iframe src="//www.topcreativeformat.com/watchnew?key=2a4e10e4117c8012643ebfd25ab6aa24" width="160" height="300" frameborder="0" scrolling="no"></iframe> */}

            <div className="tag">
              <h1 style={{ fontSize: "30px", fontFamily: "Palatino" }}>"Your path to digital success starts here, with AppOpener"</h1>
            </div>

            {/* <div className="Glass" style={{ marginBottom: "20px" }}>
              <div className="star">
                <img src={star} alt="" />
              </div>

              <div className="star1">
                <img src={star1} alt="" />
              </div>

              <div className="rowcontainer">

                <div style={{ display: 'flex', justifyContent: 'center' }}>

                  <a href={process.env.REACT_APP_SPONSORED_LINK}>
                    <img src={redbutton} alt="" style={{ maxWidth: '240px' }} />
                  </a>

                </div>
                <div>

                  <h1>Enjoy something special !</h1>
                  <p style={{ textAlign: "center" }}>Check out something we have to show use which you will find interesting.</p>

                </div>

              </div>

            </div> */}


            {/* <div className="lastcontainer">
              <h6>Try yourself!</h6>
              <p>Keep growing,keep smart linking</p>
              <div className="TryButton">
               <a href="https://www.appopener.co.in/" target="_blank" ><button style={{color: "white", fontWeight: "600"}}>Try AppOpener</button></a>
              </div>
            </div> */}
            {/* <GoogleAd slot="6702308324" googleAdId="ca-pub-1132813264748714" /> */}
          </div>]
        </div >



        <div className="container-btn">
          <div className="btn_wrap">

            <span className="btn-sr">Share</span>
            <div class="btn-container">

              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(process.env.REACT_APP_SMART_LINK_PREFIX + apptag + "/" + shortstring)}`} target="_blank">
                <i class="fa-2xl fab fa-facebook-f" style={{ color: "#3b5998" }}></i>
              </a>

              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(process.env.REACT_APP_SMART_LINK_PREFIX + apptag + "/" + shortstring)}&text=${encodeURIComponent("Use appopener")}`} target="_blank">
                <i class="fa-2xl fab fa-x-twitter"></i>
              </a>

              <a href={`whatsapp://send?text=${encodeURIComponent('Use appopener')}%20-%20${encodeURIComponent(process.env.REACT_APP_SMART_LINK_PREFIX + apptag + "/" + shortstring )}`} target="_blank">
                <i class=" fa-2xl fab fa-whatsapp" style={{ color: '#25D366' }}></i>
              </a>

              <a href={`mailto:?subject=Check%20this%20out&body=${encodeURIComponent('Use appopener')}%20-%20${encodeURIComponent(process.env.REACT_APP_SMART_LINK_PREFIX + apptag + "/" + shortstring)}`} target="_blank">
                <i class="fa-2xl far fa-envelope"></i>
              </a>




            </div>
          </div>
        </div>




        <Button
          className={classes.btnSignUp}
          variant="primary"
          type="submit"
          onClick={this.openCaptchaModal}
          style={{ position: "fixed", bottom: "5px", width: "95%", left: "2.5%" }}
        >
          Generate Smart Link
        </Button>

        {/* -----Modal for Captcha---------- */}
        {modal_captcha}
        {/* -----Modal for Captcha---END------- */}
        {modal_generatelink}

      </>
    );
  }
}

export default Splash;
