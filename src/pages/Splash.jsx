import { Component } from "react";
import React from "react";
import classes from "../components/Styles.module.css";
import { getURLandredirect } from "../helper/api";
import "../css/splash.css";
import logo from "../assets/logo.png";
import new_logo from "../assets/Omni-logo.png";
import deetmelogo from "../assets/deet-me-logo.png";
import DeetLogo from "../assets/deet-logo.png";
import AdUI from "../assets/ui.png";
import deetbg from "../assets/deet.png"
import appopener_text from "../assets/ac.png";
import GoogleAd from "../components/GoogleAd";
import ScriptLoader from '../components/ScriptLoader';
//import splash_adv from "../assets/splash/splash_adv.png";


class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intentvalue: "",
      original_url: "",
      ostype: "", 
      countdown: 3,
      showRedirectText: true,
    };
    this.handleRedirect = this.handleRedirect.bind(this); 
  }


  componentDidMount() {
    let apptag = this.props.match.params.apptype;
    let shortstring = this.props.match.params.shorturl;
    getURLandredirect(apptag, shortstring).then((res) => {
      this.setState({ intentvalue: res.data.app_intend });
      this.setState({ original_url: res.data.originalURL });
      this.setState({ ostype: res.data.os_type });
      let app_intend = this.state.intentvalue;
      let originalURL = this.state.original_url;

      const click_link = document.getElementById("abcd");
      console.log(app_intend);
      if (app_intend === "Desktop" || app_intend === "Mobile") {
        app_intend = originalURL;
        /* console.log(app_intend) */
      }
      let countdownInterval = setInterval(() => {
        this.setState((prevState) => ({
          countdown: prevState.countdown - 1,
        }));

        
        if (this.state.countdown === 0) {
          clearInterval(countdownInterval); 
          this.setState({ showRedirectText: false }); 
          this.handleRedirect(); 
        }
      }, 1000); 
    });
  }
  
  handleRedirect() {
      const app_intend = this.state.intentvalue === "Desktop" || this.state.intentvalue === "Mobile"
        ? this.state.original_url
        : this.state.intentvalue;
  
      if (this.state.ostype === "windows") {
          const click_link = document.getElementById("abcd");
          click_link.setAttribute("href", app_intend);
          click_link.click();
      } 
      else {
          window.location.assign(app_intend);
      }
  }


  render() {
    return (
     
      <div className={classes.mainContainer}>
        <div className="App">

          {/* <GoogleAd slot="6552881547" googleAdId="ca-pub-5645705217995911"/> */}

          <div className="container-1">
            {/* <img src={DeetLogo} alt="deet" />
            <span>{`deet.me`}</span>
            <a href="https://www.deet.me" target="_blank">
                {`Claim your free deetname now! ➟`}
            </a>
            <br/> */}
            <a id="abcd" target="_blank">
              <button onClick={this.handleRedirect}>{`Continue to the Link`}</button>
            </a>
          </div>

          {this.state.showRedirectText && (
            <div className="countdown-text">
              {`Redirecting in ${this.state.countdown}...`}
            </div>
          )}

          <div className="container-2">
            {/* <a
                href="https://www.instagram.com/er.dheet/"
                target="_blank"
                style={{ textDecoration: "none" }}
            >
                <img
                src={deetpng}
                alt="Win an iPhone14 Pro in just ₹150"
                style={{ width: "100%", height: "100%" }}
                />
            </a> */}
            <div>
              {/* <iframe width="360" height="270" src="https://www.youtube-nocookie.com/embed/zm6xa3ggt5A?controls=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
              {/* <iframe width="363" height="271" src="https://www.youtube.com/embed/zm6xa3ggt5A?autoplay=1" title="BB Ki Vines Productions- Taaza Khabar | Hotstar Specials | Official Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
              {/* <iframe width="360" height="270" src="https://www.youtube.com/embed/zm6xa3ggt5A?controls=0&amp;start=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
              {/* <iframe width="420" height="315" src="https://www.youtube.com/embed/1k3HXPRDvCo?autoplay=1&mute=1"></iframe> */}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Splash;
