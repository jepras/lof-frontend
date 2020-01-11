import React from "react";
import { NavLink, Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

const Navbar = props => {
  const { auth, profile } = props;
  // console.log(auth);

  const admin =
    profile.role === "admin" ? (
      <li>
        <NavLink to="/oversigt">Oversigt</NavLink>
      </li>
    ) : null;

  const links = auth.uid ? (
    <SignedInLinks profile={profile} admin={admin} />
  ) : (
    <SignedOutLinks />
  );

  return (
    <nav className="nav-wrapper white">
      <div className="container navwidth">
        <ul>
          <li>
            <Link to="/" className="brand-logo black-text">
              <h5 className="">Løfberg og Fennings Fond</h5>
            </Link>
          </li>
        </ul>

        {links}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Navbar);
