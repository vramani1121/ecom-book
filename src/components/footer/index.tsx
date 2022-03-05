import React from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { footerStyle } from "./style";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import androidImg from "../../assets/images/android.png";
import appstoreImg from "../../assets/images/appstore.png";
import facebookIcon from "../../assets/images/facebook.png";
import linkedinIcon from "../../assets/images/linkedin.png";
import googleplusIcon from "../../assets/images/googleplus.png";
import twitterIcon from "../../assets/images/twitter.png";
import youtubeIcon from "../../assets/images/youtube.png";
import emailIcon from "../../assets/images/email.png";
import callIcon from "../../assets/images/call.png";
import siteLogo from "../../assets/images/site-logo.svg";

const Footer: React.FC = () => {
  const classes = footerStyle();
  return (
    <div className={classes.footerWrapper}>
      <footer className="site-footer" id="footer">
        <div className="bottom-footer">
          <div className="container">
            <div className="text-center">
              <div className="footer-logo">
                <Link to="/" title="logo">
                  <img src={siteLogo} alt="sitelogo" />
                </Link>
              </div>
              <p className="copyright-text">
                © 2022 Tatvasoft.com. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
