import React, { Component } from "react";

import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

import { connect } from "react-redux";
import { compose } from "redux";
import { uploadSuccess } from "../../store/actions/ansøgActions";

class FileForm extends Component {
  state = {
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };

  /* for upload file */

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });

    console.log("handle Upload Success started!");

    this.props.uploadSuccess(this.state);
  };

  render() {
    const { uid } = this.props.auth;

    return (
      <div
        className="row"
        /* style={{ marginBottom: "-70px", marginTop: "-70px" }} */
      >
        <div className="col">
          <FileUploader
            accept="pdf/*"
            name="avatar"
            storageRef={firebase.storage().ref(uid)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </div>
        <div
          className="col"
          /* style={{ marginBottom: "-20px", marginTop: "-15px" }} */
        >
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth // from authenticated profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadSuccess: file => dispatch(uploadSuccess(file))
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(FileForm);
