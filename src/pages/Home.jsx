import React from "react";
import classes from "../components/Styles.module.css";
import HeroSection from "../components/HeroSection";
import PageContent from "../components/PageContent";
import Footer from "../components/Footer";
import { Component } from "react";
import Float from "../components/floatingButton";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (  

      <>
      <div className={classes.mainContainer}>     
       
       <HeroSection />
       <Float/>
       <PageContent></PageContent>
       <Footer />
      </div>
    </>


    );
  }
}
 
export default Home;
