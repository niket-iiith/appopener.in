import React from "react";
import classes from "./Styles.module.css";
import {
  generateOpenShortLink,
  generateUserLink,
  checkIfUserExist,
} from "../helper/api";
import { Nav, Navbar, Container, Form } from "react-bootstrap";
/* import Header from "./Header";
import Login from "../components/login";
import Logout from "../components/logout"; */
import { Redirect } from "react-router-dom";
import { Component } from "react";
import { FaPaste, FaCircleNotch, FaTimesCircle } from "react-icons/fa";
import { get_Tag } from "../helper/helperfn";
import Modal from "react-awesome-modal";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import "../css/profile.css";
import logo from "../assets/logo.avif";
import skip from "../assets/skip.webp";
import LinkModal from "./LinkModal";
import SpaceBackground from "./spaceComponent";

class HeroSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      appname: "",
      old_original_url: "",
      errortext: "",
      loadingicon: false,
      urlexist: false,
      errortext_url: "",
      captchadone: false,
      copied: false,
      generatedlink: "",
      isLogin: false,
      googleuserID: "",
      GoogleAuthToken: "",
      displayemail: "",
      displayImage: "",
      displayname: "",
      screenWidth: window.innerWidth,
      selectedDomain: ".com",
      editWindow: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getLoginDetails = this.getLoginDetails.bind(this);
    this.updateScreenWidth = this.updateScreenWidth.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.closeEditWindow = this.closeEditWindow.bind(this);
    this.getShortIdFromLink = this.getShortIdFromLink.bind(this);
  }

  closeEditWindow = () => {
    this.setState({ editWindow: false });
  };

  getShortIdFromLink = (generatedLink) => {
    if (!generatedLink) return "";
    const urlParts = generatedLink.split("/");
    return urlParts[urlParts.length - 1]; // Get the last part (shortId)
  };

  componentDidMount() {
    // this.getLoginDetails()
    window.addEventListener("resize", this.updateScreenWidth);
    // this.detectTimeZone();
  }

  handleDomainChange = (e) => {
    this.setState({ selectedDomain: e.target.value });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenWidth);
  }

  updateScreenWidth() {
    this.setState({ screenWidth: window.innerWidth });
  }

  getLoginDetails(val) {
    /* console.log("Login Details Received:", {
      googleId: val.googleId,
      email: val.profileObj.email,
      name: val.profileObj.name,
      tokenId: val.tokenObj.id_token
    }); */
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
        toDash: "no",
      });

      checkIfUserExist(
        this.state.displayname,
        this.state.displayemail,
        this.state.googleuserID,
        this.state.GoogleAuthToken
      );
      /* console.log("Sending to checkIfUserExist:", {
        displayname: this.state.displayname,
        displayemail: this.state.displayemail,
        googleuserID: this.state.googleuserID,
        GoogleAuthToken: this.state.GoogleAuthToken
      }); */

      if (localStorage.getItem("loaded") === "ignoreOnce") {
        localStorage.removeItem("loaded");
      }
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });

    let appnames = "";
    appnames = get_Tag(event.target.value);
    this.setState({ appname: appnames });
  }

  handleSubmit(event) {
    /* console.log("Handle Submit Data:", {
      url: this.state.value,
      appName: this.state.appname,
      isLogin: this.state.isLogin,
      selectedDomain: this.state.selectedDomain
    }); */
    if (this.state.value == "") {
      this.setState({ errortext_url: "Please enter your link" });
    } else if (this.state.appname == "" || this.state.appname == " ") {
      this.setState({ errortext_url: "Invalid Link" });
    } else {
      this.setState({ urlexist: true, errortext_url: "" });
      if (this.state.isLogin) {
        //user is loginned then no captcha
        this.openModal();
      } else {
        this.openCaptchaModal();
      }
    }

    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  openModal() {
    this.setState({ visible: true, loadingicon: true });

    //check if same link is clicked again & again

    let appopener_app_url =
      "https://appopener" + this.state.selectedDomain + "/";

    /*  console.log(appopener_app_url); */
    if (this.state.value === this.state.old_original_url) {
      this.setState({
        loadingicon: false,
        generatedlink: this.state.generatedlink,
      });
    } else {
      //check if user is login or not
      if (this.state.isLogin) {
        this.setState({ generatedlink: "", copied: false });
        //check first whether to create new user account or not
        checkIfUserExist(
          this.state.displayname,
          this.state.displayemail,
          this.state.googleuserID,
          this.state.GoogleAuthToken
        );

        generateUserLink(
          this.state.appname,
          this.state.value,
          this.state.GoogleAuthToken
        ).then((res) => {
          /* console.log("generateUserLink Request Data:", {
            appName: this.state.appname,
            originalUrl: this.state.value,
            authToken: this.state.GoogleAuthToken
          }); */
          //console.log("status");
          console.log("generateUserLink Response:", res);

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
            // const videoIdIdx = original_url.search("v=")
            // const containsAnd=original_url.search("&t");
            // let videoId="";
            //   if(containsAnd!==-1){
            //     videoId=original_url.substring(videoIdIdx+2,containsAnd);
            //   }else{
            //     videoId=original_url.substring(videoIdIdx+2)
            //   }

            //   if(localStorage.getItem('videoId')===null){
            //     localStorage.setItem('videoId',videoId)
            //   }else{
            //     localStorage.removeItem('videoId')
            //     localStorage.setItem('videoId',videoId)
            // }
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
          } else if (tag === "docs") {
            tag = "docs";
          } else if (tag === "facebook") {
            tag = "fb";
          }
          // } else {
          //   tag = "web";
          // }
          let generated_url = appopener_app_url + tag + "/" + res.data.shortid;
          this.setState({
            loadingicon: false,
            old_original_url: original_url,
            generatedlink: generated_url,
          });
        });
      } else {
        this.setState({ generatedlink: "" });
        generateOpenShortLink(this.state.appname, this.state.value).then(
          (res) => {
            console.log("generateOpenShortLink Request Data:", {
              appName: this.state.appname,
              originalUrl: this.state.value,
            });
            // console.log("result is : ", res.data);
            let original_url = res.data.originalURL;
            let tag = res.data.tag.toLowerCase();
            console.log("generateOpenShortLink Response:", res);
            if (tag === "youtube") {
              // const videoIdIdx = original_url.search("v=")
              // const containsAnd=original_url.search("&t");
              // // console.log("containsAnd: ",containsAnd);
              // let videoId="";
              // if(containsAnd!==-1){
              //   videoId=original_url.substring(videoIdIdx+2,containsAnd);
              // }else{
              //   videoId=original_url.substring(videoIdIdx+2)
              // }

              // if(localStorage.getItem('videoId')===null){
              //   localStorage.setItem('videoId',videoId)
              // }else{
              //   localStorage.removeItem('videoId')
              //   localStorage.setItem('videoId',videoId)
              // }
              // console.log("videoId", videoId);
              // console.log("props of the video section are : ", this.props);
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
            } else if (tag === "docs") {
              tag = "docs";
            } else if (tag === "facebook") {
              tag = "fb";
            }
            // else {
            //   tag = "web";
            // }
            let generated_url =
              appopener_app_url + tag + "/" + res.data.shortid;
            //this.setState({intentvalue : res.data.app_intend});
            this.setState({
              loadingicon: false,
              old_original_url: original_url,
              generatedlink: generated_url,
            });
            console.log(this.state);
          }
        );
      }
    }
  }

  //   detectTimeZone = () => {
  //     const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //     if (
  //         userTimeZone.includes('Asia/Kolkata') ||
  //         userTimeZone.includes('Asia/Mumbai') ||
  //         userTimeZone.includes('Asia/Calcutta')
  //     ) {
  //         this.setState({ selectedDomain: '.in' });
  //     } else {
  //         this.setState({ selectedDomain: '.com' });
  //     }
  // };

  async timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  async handlePaste(input) {
    const text = await navigator.clipboard.readText();
    console.log(text);
    let appnames = "";
    appnames = get_Tag(text);
    this.setState({
      value: text,
      appname: appnames,
    });
  }

  async openCaptchaModal() {
    this.setState({
      visible_captcha: true,
      errortext: "",
      loadingicon: false,
    });
    await this.timeout(100);
    loadCaptchaEnginge(4, "black", "white");
  }
  closeCaptchaModal() {
    this.setState({
      visible_captcha: false,
    });
  }

  closeModal() {
    this.setState({
      visible: false,
    });
    this.closeCaptchaModal();
  }

  verifyCaptcha = () => {
    this.setState({
      errortext: "",
      loadingicon: false,
    });
    let user_captcha = document.getElementById("user_captcha_input").value;
    if (user_captcha === "" || user_captcha === " ") {
      this.setState({
        errortext: "Please enter captcha value",
      });
    } else {
      if (validateCaptcha(user_captcha) == true) {
        this.setState({
          errortext: "Verified Please wait ... ",
          loadingicon: true,
        });
        loadCaptchaEnginge(4, "black", "white");
        document.getElementById("user_captcha_input").value = "";
        this.openModal();
        this.setState({ visible_captcha: false });
      } else {
        this.setState({
          errortext: "Captcha not matched, Plz try again",
        });
        document.getElementById("user_captcha_input").value = "";
      }
    }
  };

  render() {
    if (this.state.toDash === "yes") {
      if (localStorage.getItem("loaded") !== "ignoreOnce") {
        return <Redirect to="/dashboard" />;
      }
    }
    let modal_captcha = <div></div>;

    if (this.state.visible_captcha) {
      modal_captcha = (
        <Modal
          style={{ position: "absolute" }}
          visible={this.state.visible_captcha}
          width="500"
          height="280"
          effect="fadeInDown"
          position="absolute"
          onClickAway={() => this.closeCaptchaModal()}
        >
          <div
            className="modal-content text-white relative"
            style={{
              border: "0"
            }}
          >
            <SpaceBackground />
            <div className="modal-header text-center relative z-10 p-6">
              <h5 className="modal-title">Verification for added Security</h5>
              <a
                className="color-white"
                href="javascript:void(0);"
                onClick={() => this.closeCaptchaModal()}
              >
                <FaTimesCircle size="25px" />
              </a>
            </div>
            <div className="modal-body">
              <center>
                <div>
                  {" "}
                  <LoadCanvasTemplate
                    reloadText="Reload Captcha"
                    reloadColor="white"
                  />
                  <input
                    placeholder="Enter Captcha Value"
                    id="user_captcha_input"
                    className="form-control"
                    name="user_captcha_input"
                    type="text"
                  ></input>
                  <p className="text-danger">{this.state.errortext}</p>
                  <button
                    className="btn btn-primary font-semibold"
                    type="button"
                    onClick={this.verifyCaptcha}
                  >
                    Verify
                    {this.state.loadingicon ? (
                      <FaCircleNotch className={classes.spinner} />
                    ) : (
                      ""
                    )}
                  </button>
                </div>
                <br></br>
                <i className="font-semibold">To avoid Captcha Please Login..</i>
              </center>
            </div>
          </div>
        </Modal>
      );
    } else {
      modal_captcha = <div></div>;
    }
    let modal_generatelink = <div></div>;
    if (this.state.visible) {
      modal_generatelink = (
        <LinkModal
          isOpen={this.state.visible}
          onClose={() => this.closeModal()}
          link={this.state.generatedlink}
          originalUrl={this.state.old_original_url}
          onClickAway={() => this.closeModal()}
        />
        //         <Modal
        //           style={{
        //             position: "absolute",
        //             display: "flex",
        //             justifyContent: "center",
        //             alignItems: "center",
        //           }}
        //           visible={this.state.visible}
        //           width="auto"
        //           maxwidth="90%"
        //           height="auto"
        //           maxHeight="80%"
        //           effect="fadeInDown"
        //           position="absolute"
        //           onClickAway={() => this.closeModal()}
        //         >
        //           <div
        //             className="modal-content"
        //             style={{
        //               border: "0",
        //               borderRadius: "10px",
        //               boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        //               overflow: "hidden",
        //             }}
        //           >
        //             {/* Header */}
        //             <div className="modal-header d-flex justify-content-between align-items-center px-4 py-3">
        //               <h5 className="modal-title mb-0 flex items-center justify-center">Step 3. Share your Super Story</h5>
        //               <a href="javascript:void(0);" onClick={() => this.closeModal()}>
        //                 <FaTimesCircle size="22px" color="#000000" />
        //               </a>
        //             </div>

        //             {/* Main Scrollable Body */}
        //             <div
        //               className="modal-body"
        //               style={{
        //                 padding: "1px",
        //                 maxHeight: "65vh",
        //                 overflowY: "auto",
        //                 backgroundColor: "#f9f9fb",
        //               }}
        //             >

        //             <EditLinkForm
        //               originalURL={this.state.old_original_url}
        //               shortId={this.getShortIdFromLink(this.state.generatedlink)}
        //               onCancel={() => this.closeEditWindow()}
        //               disabled={!this.state.editWindow}
        //             />
        //               {/* <InstaStory
        //                 download={false}
        //                 videoId="nQOescIkJns"
        //                 headline="Check out our latest video!"
        //                 /> */}
        //               {/* Link Preview Section */}
        //               <div className="mt-4">
        //                 <div className="input-group shadow-sm">
        //                   <span className="input-group-text bg-secondary text-white">
        //                     <FaLink />
        //                   </span>
        //                   <input
        //                     type="text"
        //                     className="form-control"
        //                     value={this.state.generatedlink}
        //                     disabled={true}
        //                   />
        //                 </div>

        //                 {/* Button actions */}
        //                 <div className="d-flex flex-wrap gap-2 mt-3">
        //                   {this.state.loadingicon ? (
        //                     <button className="btn btn-primary px-4 py-2" disabled>
        //                       <FaCircleNotch className={classes.spinner} /> Please wait
        //                     </button>
        //                   ) : (
        //                     <div className="flex flex-col gap-2 w-full">
        //                       <div className="flex gap-4 justify-between items-center">
        //                       <CopyToClipboard
        //                         text={this.state.generatedlink}
        //                         onCopy={() => this.setState({ copied: true })}
        //                       >
        //                         <button className="btn btn-primary px-2 py-2">
        //                           <FaCopy size="20px" /> Copy Link
        //                         </button>
        //                       </CopyToClipboard>
        // {/*                       <button
        //                         className="btn btn-secondary px-2 py-2"
        //                         onClick={() => this.setState({ editWindow: true })}
        //                       >
        //                         <FaEdit size="20px" /> Edit Link
        //                       </button> */}
        //                       <a href={`/visualShop/${this.state.VideoId}`}>
        //                       <button
        //                         className="btn btn-secondary px-2 py-2"
        //                       >
        //                         <FaShoppingBag size="20px" /> Super Story
        //                       </button>
        //                       </a>
        //                       </div>

        //                     </div>
        //                   )}
        //                 </div>

        //                 {this.state.copied && (
        //                   <p className="text-success mt-2">Link copied to clipboard!</p>
        //                 )}
        //               </div>
        //             </div>

        //             {/* Footer */}
        //             <div className="modal-footer px-4 py-3 bg-white text-black">
        //               <p
        //                 className="text-muted text-white mb-2"
        //                 style={{ fontSize: "0.9rem" }}
        //               >
        //               </p>
        //               {inapp.isMobile ? (
        //                 <ShareButton
        //                   className="mt-2"
        //                   title="AppOpener Smartlink"
        //                   url={this.state.generatedlink}
        //                 />
        //               ) : (
        //                 <div className="d-flex justify-content-center mt-3 w-100">
        //                   <ShareButtons
        //                     title="AppOpener Smartlink"
        //                     url={this.state.generatedlink}
        //                     tags="#appopener"
        //                   />
        //                 </div>
        //               )}
        //             </div>
        //           </div>
        //         </Modal>
      );
    } else {
      modal_generatelink = <div></div>;
    }

    return (
      <div className="relative min-h-screen bg-transparent overflow-visible z-10">
        {/* <StarAnimation count={50} /> */}

        <div className="header mb-0">
          <Navbar
            expand="lg"
            className={this.state.click ? classes.active : "navbar-dark"}
          >
            <Container>
              <div className="d-flex items-center justify-center w-full">
                <a
                  className="flex flex-row no-underline items-center ml-0"
                  href="/"
                  style={{
                    fontFamily: "Montserrat Alternates",
                    fontWeight: 600,
                    marginTop: "23px",
                    fontSize: "32px",
                    color: "white",
                  }}
                >
                  <img 
                    className="w-14 h-18" 
                    src={logo} 
                    alt="Logo" 
                  />
                  APPOPENER
                </a>
              </div>
              {/* <div className="d-flex justify-content-start ml-[-45px]">
                      {this.state.isLogin ? (
                        <Nav.Link
                          href="/dashboard"
                          style={{
                            color: "white",
                            "font-family": "Montserrat Alternates",
                            "font-weight": "800",
                            "font-size": "16px",
                          }}
                        >
                          Dashboard
                        </Nav.Link>
                      ) : (
                        ""
                      )}
                    </div> */}
              {/* <div className="flex items-center z-11">
                {this.state.screenWidth <= 655 ? (
                  <>
                    <SmallHam />
                  </>
                ) : (
                  <>
                    <HamburgerMenu />
                  </>
                )}
              </div> */}

              <div className="d-flex justify-content-end">
                <Nav>
                  <Form
                    className={classes.logingoogle}
                    style={{ width: "100%" }}
                  >
                    <div className={classes.btnSignGrp}>
                      {/*   <div className="flex items-center ">
                          
                              {this.state.screenWidth <= 655 ? (
                                <>
                                <Small_ham /> 
                                   
                                </>
                              ) : (
                                <>
                                   <HamburgerMenu /> 
                                </>
                              )}
                            </div> */}

                      {this.state.isLogin ? (
                        <>
                          {/*   <div
                                  className="container d-flex flex-row"
                                  style={{
                                    position: "relative",
                                    left: "-30px",
                                  }}
                                >
                                  <div className="top-container mr-[20px] ">
                                    <img
                                      className="img-responsive img-fluid profile-image w-12 xss:w-13 xs:w-13 sm:w-15 md:w-17 ml:w-18 lg:w-20 "
                                      src={this.state.displayImage}
                                      width="70"
                                      alt=""
                                    />
                                    <div className="">
                                      <p className="name d-none d-lg-block">
                                        {this.state.displayemail}
                                      </p>
                                      <div className="mail">
                                        <Logout />
                                      </div>
                                    </div>
                                  </div>
                                </div> */}
                        </>
                      ) : (
                        <>
                          {/*  <center>
                                  <Login sendData={this.getLoginDetails} />
                                </center> */}
                        </>
                      )}
                      {/*  <center className="flex items-center">
                              {this.state.screenWidth <= 655 ? (
                                <>
                                   <Small_ham /> 
                                </>
                              ) : (
                                <>
                                   <HamburgerMenu /> 
                                </>
                              )}
                            </center> */}
                      {/* <div */}
                      {/* className="flex justify-center items-center w-full px-4 py-2 border border-gray-700 rounded-md shadow-sm bg-[#121622] text-gray-300 hover:text-white hover:bg-[#1e2230] cursor-pointer font-extrabold data-[state=active]:text-blue-500 data-[state=active]:fill-blue-500" */}
                      {/* style={{ */}
                      {/* position: "relative", */}
                      {/* /* right: "80%", */}
                      {/* }} */}
                      {/* onClick={() => */}
                      {/* window.open("https://www.loginskip.com/", "_blank") */}
                      {/* } */}
                      {/* > */}
                      {/* Skip Login&nbsp;&nbsp; */}
                      {/* <FaFastBackward/> */}
                      {/* <img style={{ width: "12px" }} src={skip} alt="Logo" /> */}
                      {/* </div> */}
                    </div>
                  </Form>
                </Nav>
              </div>
            </Container>
          </Navbar>
        </div>

        <div className="relative flex items-center justify-center h-screen">
          <div className="relative top-[-75px] w-[300px] sm:w-[360px] rounded-[2.5rem] bg-gradient-to-br from-[#0d0d1c] to-[#1b1b2d] p-6 text-white shadow-inner border-4 border-orange-900">
            <div className="space-y-6">
              <h5 className="font-bold flex items-center justify-center">
                SECURE YOUR LINKS
              </h5>
              <div>
                <p className="text-sm mb-1 text-gray-400">⚡ Step 1</p>
                {/* <label className="block text-sm mb-1">
                  Paste your URL here:
                </label> */}
                <div className="flex justify-between items-center">
                  <input
                    className="form-control"
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder="Paste your Link ->"
                  />
                  <button
                    className="btn btn-secondary ml-1"
                    type="button"
                    onClick={() => this.handlePaste()}
                  >
                    <FaPaste size="24px" />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm mb-1 text-gray-400">⚡ Step 2</p>
                <div className="flex gap-2 mt-2">
                  <button
                    className="flex-1 py-2 rounded-md bg-violet-700 text-white shadow-md"
                    onClick={this.handleSubmit}
                  >
                    ⚡ SECURE
                  </button>
                  {/* <button className="flex-1 py-2 rounded-md bg-yellow-700 text-white shadow-md">
                    👑 Golden Link
                    <br />
                    $1
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          {modal_captcha}
          {modal_generatelink}
        </div>
      </div>
    );
  }
}

export default HeroSection;
