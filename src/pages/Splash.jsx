import { Component } from "react";
import React from "react";

import { getURLandredirect } from "../helper/api";
import "../css/splash.css";
import Avatar from '@mui/material/Avatar';
import CREATORS from "../assets/file.png";
/* import youtube from "../assets/youtube.svg"; */
import superprofile from "../assets/superprofile.png";
import video1 from "../assets/video1.avif";
import video2 from "../assets/video2.avif";
import video3 from "../assets/video3.avif";
import video4 from "../assets/video4.avif";
import creatoryt from "../assets/creatoryt.avif";
import { MdOutlineIosShare } from "react-icons/md";
/* import { PiYoutubeLogoThin,PiTwitterLogoThin,PiInstagramLogoThin } from "react-icons/pi"; */
import { FaArrowRight } from "react-icons/fa";
import Carousel from '../components/Carousel';
import BrandTray from '../components/BrandTray';
import logo from "../assets/logo.avif";
import slogo from "../assets/slogo.avif";
import loginskip from "../assets/loginskip.png";
/* import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png"; */
import appopeneryt from "../assets/appopeneryt.avif";
import { Link } from 'react-router-dom';
import { FaYoutube } from 'react-icons/fa';


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
      redirectCanceled: false,
    };
    this.handleRedirect = this.handleRedirect.bind(this); 
    this.stopRedirecting = this.stopRedirecting.bind(this);
  }

  stopRedirecting() {
    clearInterval(this.countdownInterval); // Stop the countdown
    this.setState({
      countdown: "",
      redirectCanceled: true,
      showRedirectText: false,  // Hide the countdown text
    });
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
    const carouselItems = [
      {
        image: video1,
        link: "https://appopener.in/ig/6cozddckl",
        alt: "Video Thumbnail",
        width: 300,
        height: 200,
        aspectRatio: "1280/720",
        title: "CreatorCosmos",
        description: "Go Beyond Creativity with AppOpener",
      },
      {
        image: appopeneryt,
        link: "https://appopener.in/yt/mvb5pq2tn",
        alt: "Video Thumbnail",
        width: 300,
        height: 200,
        aspectRatio: "1280/720",
        title: "Creator Cosmos",
        description: "Not an Ordinary URL Shortner - AppOpener.com - Intro",
      },
      {
        image: video2,
        link: "https://appopener.in/ig/32vlpkwoz",
        alt: "Video Thumbnail",
        width: 300,
        height: 200,
        aspectRatio: "1280/720",
        title: "AppOpener",
        description: "Join AppOpener Today!",
      },
      {
        image: video3,
        link: "https://appopener.in/ig/3s92ztb5f",
        alt: "Video Thumbnail",
        width: 300,
        height: 200,
        aspectRatio: "1280/720",
        title: "Appopener",
        description: "Let's learn about SEO in simple terms! 🚀",
      },
      {
        image: video4,
        link: "https://appopener.in/ig/mmunty2wp",
        alt: "Video Thumbnail",
        width: 300,
        height: 200,
        aspectRatio: "1280/720",
        title: "AppOpener",
        description: "The Evolution of Deep Linking",
      },
      // Add more items as needed
    ];
    const imageData = [
      {
        link: "https://shop.creatorcosmos.com/",
        imgSrc: CREATORS,
        alt: "Superprofile"
      },
      {
        link: "https://superprofile.bio/",
        imgSrc: superprofile,
        alt: "Superprofile"
      },
      {
        link: "https://spwnser.com/",
        imgSrc: slogo,
        alt: "Sponsor logo"
      },
      {
        link: "https://admin.loginskip.com/",
        imgSrc: loginskip,
        alt: "Login Skip"
      }
    ];
    return (
      <>
    <div className='main-container'>
      <div className='header'>
        <div className='user-details'>
        <Link to="/">
    <Avatar alt="logo" src={logo} sx={{ width: 65, height: 65 }} />
  </Link>
          <p className='user-tag'><span className=' pb-1 font-[40px]'>PPØ</span><span></span></p>
        </div>
        <a href="https://appopener.in/ig/jeapwpumh" target="_blank" rel="noopener noreferrer">
        <div className='subscribe-button bg-black'>
          <button className="bg-black  text-white">
            Contri
          </button>
        </div>
        </a>
      </div>
    
<div className="coming-soon-container mt-2">
        <p className="sliding-text">&bull;Coming Soon&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull;"Your path to digital success starts here, with AppOpener"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull;Trusted by 300M+ Users &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &bull;Coming Soon&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull;"Your path to digital success starts here, with AppOpener"&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull;Trusted by 300M+ Users&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &bull;Coming Soon &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull;"Your path to digital success starts here, with AppOpener"&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull;Trusted by 300M+ Users&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &bull;Coming Soon&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull;"Your path to digital success starts here, with AppOpener"&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull;Trusted by 300M+ Users&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &bull;Coming Soon&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull;"Your path to digital success starts here, with AppOpener" &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull;Trusted by 300M+ Users&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &bull;Coming Soon&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull;"Your path to digital success starts here, with AppOpener"&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull;Trusted by 300M+ Users&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &bull;Coming Soon&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull;"Your path to digital success starts here, with AppOpener" &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull;Trusted by 300M+ Users </p>
      </div>
      
      <div className='hero-section'>
        <div className='latest-link '>
   
          <div className='latest-link-img  '>
             <iframe className="vid"
             /* width="100%"
             height="auto" */
      
      src="https://www.youtube.com/embed/D3ulWU96yTs?autoplay=1&loop=1&playlist=D3ulWU96yTs&mute=1"
      title="Go Beyond Creativity with AppOpener | CreatorCosmos"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
           {/*  <img src={video1} alt="Video thumbnail"></img> */}
{/*             <div className="glass-effect">
  <p className='text-sm font-bold text-white'>AppOpener</p>
</div> */}
            {/* <button>
              <MdOutlineIosShare color='white' size='11px'/>
            </button>  */}

<div className='video-info flex'>
    <img className='channel-logo' src={creatoryt} alt='Channel Logo' />
    <div className='video-details'>
      <h4 className='video-title'>Go Beyond Creativity with AppOpener</h4>
      <p className='channel-name'>CreatorCosmos</p>
    </div>
  </div>


          </div>
          <a id="abcd" target="_blank">
          
          </a>  
       
        {/*   <div className='videoLinks flex-row    pb-3'>
            <div className='flex'>
            <p><span className='creator-name flex '>AppOpener</span> </p>
             
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
        <a href="https://appopener.ai/ig/jeapwpumh" target="_blank" rel="noopener noreferrer">
        <img
          src={instagram}
          alt=" "
          className="  flex mr-2"
          style={{ width: '30px', height: '30px' }}
        />
        </a>
             
            </div>  
          </div> */}
         {/*  <p>"Your path to digital success starts here, with AppOpener"</p> */}
          {this.state.showRedirectText && (
            <div className="countdown-text flex justify-center">
              {``}
            </div>
          )} 
        </div>
        <div className="conti">
        <div className="continueButton stickyButton bg-red-500 text-white">
          {this.state.showRedirectText ? (
            <p className="pt-3">Redirecting in {this.state.countdown} seconds...</p>
          ) : (
            <button onClick={this.handleRedirect} className='flex gap-2 flex-row  '>
            {/*  <PiYoutubeLogoThin  color='red' size='30px'/> */}
{/*             <img
           src={youtube}
           alt=" "
           className=" bg-black  "
           style={{ width: '40px', height: '40px' }}
         /> */}
         <FaYoutube style={{color:'white'}} size="32px"/>
             <div className=' gap-2 pt-1   text-red-500 flex '>
             
             Watch Now
             <FaArrowRight className='flex pt-1'color='white' size='20px'/>
             </div>
           </button>
          )}
          
        </div>

        {/* Cancel Button */}
        {this.state.showRedirectText && (
          <div className="cancel" id="cancel">
            <button
              style={{
                color: "white",
                fontWeight: "600",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
              onClick={this.stopRedirecting}
               >
              Cancel
            </button>
          </div>
        )}
       
        
        <div className='ml-2 flex '  >
     

<div  className="mt-4">
        <BrandTray items={imageData}/>
      </div> 
           
     
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

    );
  }
}


export default Splash;
