import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = props => {
  return (
    <div>
      <li>
        <NavLink to="/" className="black-text">
          Om fonden
        </NavLink>
      </li>
      <li>
        <NavLink to="/faq">Ofte stillede spørgsmål</NavLink>
      </li>
      <li>
        <NavLink to="/ansøg">Ansøgningsskema</NavLink>
      </li>
      <li>
        <NavLink to="/privatliv">Privatlivspolitik</NavLink>
      </li>
      <li>
        <a onClick={props.signOut}>Log af</a>
      </li>
      {props.admin}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
