import React, { Component } from "react";

import firebase from "../../config/fbConfig";

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
    this.props.uploadSuccess(this.state);
  };

  render() {
    const { uid } = this.props.auth;

    return (
      <div>
        <div>
          {!this.state.isUploading ? (
            <FileUploader
              accept="pdf/*"
              name="avatar"
              storageRef={firebase.storage().ref(uid)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
          ) : (
            <div className="progress">
              <div
                className="determinate"
                style={{ width: this.state.progress }}
              ></div>
            </div>
          )}
        </div>
        {/* <div className="col">
          <p>text test</p>
          {this.state.isUploading && <p> - Progress: {this.state.progress}</p>}
        </div> */}
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
