import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="right">
        <li>
          <NavLink to="/">Om Fonden</NavLink>
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
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SignedOutLinks;
