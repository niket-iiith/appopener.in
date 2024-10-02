import React, { useState } from "react";
import classes from "./Styles.module.css";
import {generateOpenShortLink,generateUserLink,checkIfUserExist,} from "../helper/api";
import {Row,Col,Nav,Navbar,NavDropdown,Container,Form,FormControl,Button,} from "react-bootstrap";
import Header from "./Header";
import Login from "../components/login";
import Logout from "../components/logout";
import { Component } from "react";
import {FaAndroid, FaCircleNotch,FaClosedCaptioning,FaCopy,FaGlobe,FaGooglePay,FaGooglePlay,FaLinkedin,FaSleigh,FaSpinner,FaSpotify,FaTelegram,FaTimesCircle,FaTwitter,FaYoutube,} from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { get_Tag, validURL } from "../helper/helperfn";
import Modal from "react-awesome-modal";
import ShareButton from "react-web-share-button";
import ShareButtons from "../components/share";
import {loadCaptchaEnginge,LoadCanvasTemplate,LoadCanvasTemplateNoReload,validateCaptcha,} from "react-simple-captcha";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../css/profile.css";
import InApp from "detect-inapp";

const HeroPrivacyPolicySection = () => {
    const [click, setClick] = useState();
    return (
      <>
        <div className={classes.heroBanner} style={{minHeight: "110vh"}}>
          <div className={classes.overflowHidden}>
            <div className={classes.topHeader}>
              <div className="header">
                <Navbar
                  
                  expand="lg"
                //   className={this.state.click ? classes.active : "navbar-dark"}
                
                className={"navbar-dark"}
                >
                  <Container>
                    <div className="d-flex justify-content-start">
                    <Navbar.Brand href="/" className="navbar-logo">
                      <img
                        className={classes.logo}
                        src={require("../assets/logo.avif").default}
                        alt="Logo"
                      />
                     
                    </Navbar.Brand>
                   
                    <a
                      class="navbar-brand d-none d-lg-block"
                      href="/"
                      style={{
                        "font-family": "Roboto",
                        "font-weight": "900",
                        marginTop: "10px",
                        "font-size": "20px",
                      }}
                    >
                      APPOPENER
                    </a>
                    </div>                   
                  </Container>
                </Navbar>
              </div>
            </div>
            <div>
              <div className={classes.stars}></div>
              <div className={classes.stars2}></div>
              <div className={classes.stars3}></div>
            </div>

            <div className={classes.innerContent}>
              <Container>
                <Row>
                  <Col xs={12} md={12} lg={6} style={{alignSelf:'center', alignItems:'center'}}>
                    <h1 className={classes.title}> APPOPENER's <br />Privacy <br/>Policy </h1>
                    <br/>
                    <p className={classes.subTitle}>
                    Know the manner of information we collect
                    </p>
                    
                  </Col>
                  <Col xs={12} md={12} lg={6} className="d-none d-lg-block">
                    <img className={classes.helmetanimate}
                      style={{
                        width: "350px",
                        right: "-24%",
                        bottom: "-12%",
                        position: "relative",
                      }}
                      src={require("../assets/helmet.avif").default}
                      alt="company Logo"
                    />
                  </Col>
                </Row>
              </Container>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 1680 40"
              class="position-absolute width-full z-1"
            >
              <path
                d="M0 40h1680V30S1340 0 840 0 0 30 0 30z"
                fill="#000"
              ></path>
            </svg>
        </div>
        </div>
        <div></div>
        {/* --------Calling Login component just to get state value google obj.profile----------- */}
        <div style={{ display: "none" }}></div>
      </>
    );
}

export default HeroPrivacyPolicySection;
