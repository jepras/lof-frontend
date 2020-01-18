import React from "react";
import { NavLink, Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

const Footer = props => {
  return <div className="footer valign center">© 2020. CVR: 11111111</div>;
};

export default Footer;
