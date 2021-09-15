import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';

const Navbar = (props) => {
  const { auth, profile } = props;

  const admin =
    profile.role === 'admin' ? (
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
    <div>
      <nav className="grey lighten-3">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            Løfbergs og Fennings Fond
          </Link>
          <a href="" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">{links}</ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        {links}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Navbar);
