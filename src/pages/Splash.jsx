import { Component } from "react";
import React from "react";

import { getURLandredirect } from "../helper/api";
import "../css/splash.css";
import Avatar from '@mui/material/Avatar';
import CREATORS from "../assets/file.png";
import youtube from "../assets/youtube.svg";
import superprofile from "../assets/superprofile.png";
import video1 from "../assets/video1.avif";
import { MdOutlineIosShare } from "react-icons/md";
/* import { PiYoutubeLogoThin,PiTwitterLogoThin,PiInstagramLogoThin } from "react-icons/pi"; */
import { FaArrowRight } from "react-icons/fa";
import Carousel from '../components/Carousel';
import logo from "../assets/logo.avif";
import slogo from "../assets/slogo.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import appopeneryt from "../assets/appopeneryt.avif";


import ExpandableFooter from '../components/ExpandableFooter';

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
    } else {
      window.location.assign(app_intend);
    }
  }

  render() {
    const carouselItems = [
      {
        image: video1,
        link: "https://www.youtube.com/watch?v=ZAmiTLmmznw",
        alt: "Video Thumbnail",
        width: 300,
        height: 200,
        aspectRatio: "1280/720",
        title: "Appopener",
        description: "Your path to digital success starts here, with AppOpener",
      },
      {
        image: appopeneryt,
        link: "https://www.youtube.com/watch?v=ZAmiTLmmznw",
        alt: "Video Thumbnail",
        width: 300,
        height: 200,
        aspectRatio: "1280/720",
        title: "Appopener",
        description: "Your path to digital success starts here, with AppOpener",
      },
      {
        image: logo,
        link: "https://www.youtube.com/watch?v=ZAmiTLmmznw",
        alt: "Video Thumbnail",
        width: 300,
        height: 200,
        aspectRatio: "1280/720",
        title: "Appopener",
        description: "Your path to digital success starts here, with AppOpener",
      },
      {
        image: logo,
        link: "https://www.youtube.com/watch?v=ZAmiTLmmznw",
        alt: "Video Thumbnail",
        width: 300,
        height: 200,
        aspectRatio: "1280/720",
        title: "Appopener",
        description: "Your path to digital success starts here, with AppOpener",
      },
      {
        image: logo,
        link: "https://www.youtube.com/watch?v=ZAmiTLmmznw",
        alt: "Video Thumbnail",
        width: 300,
        height: 200,
        aspectRatio: "1280/720",
        title: "Appopener",
        description: "Your path to digital success starts here, with AppOpener",
      },
      // Add more items as needed
    ];
    return (
      <>
    <div className='main-container'>
      <div className='header'>
        <div className='user-details'>
          <Avatar alt="logo" src={logo} sx={{ width: 45, height: 45 }}/>
          <p className='user-tag'><span className='md-text'>Appopener</span><span>@Appopener</span></p>
        </div>
        <div className='subscribe-button bg-black'>
          <button className="bg-black  text-white">
            Subscribe
          </button>
        </div>
      </div>
      <div>
       
     <div className="stories-container flex space-x-2 mx-2 ">
    <div  className="story-item flex-row gap-3  items-center">
      <div className="story-avatar-wrapper">
      <a href="https://shop.creatorcosmos.com/" target="_blank" rel="noopener noreferrer">
        <img
          src={CREATORS}
          alt=" "
          className="story-avatar rounded-full border-4 border-black p-1 "
          style={{ width: '70px', height: '70px' }}
        />
</a>
      </div>

      <div className="story-avatar-wrapper">
      <a href="https://superprofile.bio/" target="_blank" rel="noopener noreferrer">
        <img
          src={superprofile}
          alt=" "
          className="story-avatar rounded-full border-4 border-black-500 p-1"
          style={{ width: '70px', height: '70px' }}
        />
        </a>
      </div>

      <div className="story-avatar-wrapper">
      <a href="https://spawnser.com/" target="_blank" rel="noopener noreferrer">
        <img
          src={slogo}
          alt=" "
          className="story-avatar rounded-full border-4 border-black-500 p-1"
          style={{ width: '70px', height: '70px' }}
        />
        </a>
      </div>
      <div className="story-avatar-wrapper">
      <a href="https://admin.loginskip.com/" target="_blank" rel="noopener noreferrer">
        <img
          src={CREATORS}
          alt=" "
          className="story-avatar rounded-full border-4 border-black-500 p-1"
          style={{ width: '70px', height: '70px' }}
        />
        </a>
      </div>
     {/*  <p className="text-sm mt-2">appopener</p> */}
    </div>
</div>  </div>
<div className="coming-soon-container">
        <p className="sliding-text">&bull;Coming Soon&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull;Trusted by 50M+ users &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &bull;Coming Soon&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull;Trusted by 50M+ users&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &bull;Coming Soon &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull;Trusted by 50M+ users </p>
      </div>
      
      <div className='hero-section'>
        <div className='latest-link '>
          <div className='latest-link-img  justify-center align-middle'>
            <img src={video1} alt="Cat thumbnail"></img>
            <div className="glass-effect">
  <p className='text-sm font-bold text-white'>Appopener</p>
</div>
            <button>
              <MdOutlineIosShare color='white' size='3x'/>
            </button> 
          </div>
          <div className='videoLinks flex flex-col justify-center pt-1 pb-3'>
            <div className='flex flex-col'>
            <a id="abcd" target="_blank">
          <button onClick={this.handleRedirect} className='flex gap-2 text-red-600  '>
           {/*  <PiYoutubeLogoThin  color='red' size='30px'/> */}
           <img
          src={youtube}
          alt=" "
          className="  flex "
          style={{ width: '30px', height: '30px' }}
        />
            <div className='pt-1 gap-2 text-red-500 '>
            Watch Now
            <FaArrowRight className=''color='red' size='15px'/>
            </div>
          </button>
          </a>
            </div>
              <div className='flex gap-2 mr-3'>
              <a href="https://shop.creatorcosmos.com/" target="_blank" rel="noopener noreferrer">
              <img
          src={twitter}
          alt=" "
          className="  flex "
          style={{ width: '30px', height: '30px' }}
        />
        </a>
        <a href="https://www.instagram.com/app.o.official/" target="_blank" rel="noopener noreferrer">
        <img
          src={instagram}
          alt=" "
          className="  flex mr-2"
          style={{ width: '30px', height: '30px' }}
        />
        </a>
             {/*  <PiTwitterLogoThin size='30px'/>
              <PiInstagramLogoThin size='30px'/> */}
            </div>  
          </div>
          {this.state.showRedirectText && (
            <div className="countdown-text flex justify-center">
              {`Redirecting in ${this.state.countdown}...`}
            </div>
          )}
        </div>
        
        <div className='ml-2 flex flex-col' style={{flexDirection: "column"}} >
       
        <div className='creator-details'>
          <div className='creator-name-tag'>
            <p><span className='creator-name'>Appopener</span> <span className='creator-tag'>@Appopener</span></p>
          </div>
          <button className='cd-subscribe mt-[-21px]'>
            Subscribe
          </button>
        </div>
        <div className='numbers'>
          <div>
            <p><span className='lg-text'>1.2M</span><span className='md-text'>Subscribers</span></p>
          </div>
          <div>
            <p><span className='lg-text'>120K</span><span className='md-text'>Views</span></p>
          </div>
          <div>
            <p><span className='lg-text'>500</span><span className='md-text'>Videos</span></p>
          </div>
        </div>
        <div className='video-desc'>
          <p className='md-text'>Appopener</p>
          <p>Your path to digital success starts here, with AppOpener</p>
         {/*  <a href={process.env.REACT_APP_APPSUITE_FEAT_PREFIX + data[0].smart_link}>
          <button>
            <PiYoutubeLogoThin color='red' size='30px'/>
            Watch Now
            <FaArrowRight color='red'/>
          </button>
          </a> */}
        </div>
      </div>
      </div>
       <div className='caro-container'>
        <Carousel items={carouselItems}/>
      </div> 
      <div className='expand-container'>
        <ExpandableFooter/>
      </div>
    </div>
  </>
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
   /*    <div className={classes.mainContainer}>
        <div className="App"> */

          /* <GoogleAd slot="6552881547" googleAdId="ca-pub-5645705217995911"/> */
/* 
          <div className="container-1"> */
            /* <img src={DeetLogo} alt="deet" />
            <span>{`deet.me`}</span>
            <a href="https://www.deet.me" target="_blank">
                {`Claim your free deetname now! ➟`}
            </a>
            <br/> */
           /*  <a id="abcd" target="_blank">
              <button onClick={this.handleRedirect}>{`Continue to the Link`}</button>
            </a>
          </div> */

          /* {this.state.showRedirectText && (
            <div className="countdown-text">
              {`Redirecting in ${this.state.countdown}...`}
            </div>
          )} */


          /* <GoogleAd slot="4955640795" googleAdId="ca-pub-5645705217995911"/> */

          /* <div className="container-2"> */
            /* <a
                href="https://www.instagram.com/er.dheet/"
                target="_blank"
                style={{ textDecoration: "none" }}
            >
                <img
                src={deetpng}
                alt="Win an iPhone14 Pro in just ₹150"
                style={{ width: "100%", height: "100%" }}
                />
            </a> */
         /*    <div> */
              /* <iframe width="360" height="270" src="https://www.youtube-nocookie.com/embed/zm6xa3ggt5A?controls=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */
              /* <iframe width="363" height="271" src="https://www.youtube.com/embed/zm6xa3ggt5A?autoplay=1" title="BB Ki Vines Productions- Taaza Khabar | Hotstar Specials | Official Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */
              /* <iframe width="360" height="270" src="https://www.youtube.com/embed/zm6xa3ggt5A?controls=0&amp;start=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */
              /* <iframe width="420" height="315" src="https://www.youtube.com/embed/1k3HXPRDvCo?autoplay=1&mute=1"></iframe> */
          /*   </div>
          </div>

        </div>
      </div> */
    );
  }
}


export default Splash;
