import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class Oversigt extends Component {
  render() {
    const { profile } = this.props;
    if (!profile.role === "admin") return <Redirect to="/" />;

    if (profile.role === "admin")
      return (
        <div className="container">
          <div className="row">Access allowed</div>
        </div>
      );

    return (
      <div className="container">
        <div className="row">ingen adgang</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "projects", orderBy: ["createdAt", "desc"] }])
)(Oversigt);
