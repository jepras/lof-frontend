import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { send, save, uploadSuccess } from "../../store/actions/ansøgActions";

import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

class Ansøg extends Component {
  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };

  /* for upload file */
  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });

    console.log("handle Upload Success started!");
    /* filename.preventDefault(); */
    this.props.uploadSuccess(this.state);
  };

  /* for form updates */
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSend = e => {
    e.preventDefault();
    this.props.send(this.state);
    this.props.history.push("/");
  };
  handleSave = e => {
    console.log("handle save started!");
    e.preventDefault();
    this.props.save(this.state);
  };

  render() {
    const { auth, profile, authError } = this.props;

    // if not logged in
    if (!auth.uid)
      return (
        <div className="dashboard container">
          <div className="row">
            <p>
              For at sende en ansøgning, så skal de oprette en bruger{" "}
              <NavLink to="/opret">her</NavLink>.
            </p>
            <p>
              Hvis du allerede har en bruger, så login{" "}
              <NavLink to="/login">her</NavLink>.
            </p>
          </div>
        </div>
      );

    // if logged in
    return (
      <div className="container">
        {/* FILE FORM */}
        <div>
          <form>
            <label>Username:</label>
            <input
              type="text"
              value={this.state.username}
              name="username"
              onChange={this.handleChangeUsername}
            />
            <label>Avatar:</label>
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
            {this.state.avatarURL && <img src={this.state.avatarURL} />}
            <FileUploader
              accept="pdf/*"
              name="avatar"
              randomizeFilename
              storageRef={firebase.storage().ref("pdf")}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
          </form>
        </div>

        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Send formular</h5>
          <p>Du er logget ind med emailen: {auth.email}</p>
          <div>
            {" "}
            <h5 className="grey-text text-darken-3">Personligt</h5>
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="cpr" class={profile.cpr ? "active" : null}>
                  CPR Nummer
                </label>
                <input
                  type="text"
                  id="cpr"
                  onChange={this.handleChange}
                  placeholder={profile.cpr}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <label
                  htmlFor="fornavn"
                  class={profile.fornavn ? "active" : null}
                >
                  Fornavn
                </label>
                <input
                  type="text"
                  id="fornavn"
                  onChange={this.handleChange}
                  placeholder={profile.fornavn}
                />
              </div>
              <div className="input-field col s6">
                <label
                  htmlFor="efternavn"
                  class={profile.efternavn ? "active" : null}
                >
                  Efternavn
                </label>
                <input
                  type="text"
                  id="efternavn"
                  onChange={this.handleChange}
                  placeholder={profile.efternavn}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="adresse"
                  class={profile.adresse ? "active" : null}
                >
                  Adresse
                </label>
                <input
                  type="text"
                  id="adresse"
                  onChange={this.handleChange}
                  placeholder={profile.adresse}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s4">
                <label
                  htmlFor="postnummer"
                  class={profile.postnummer ? "active" : null}
                >
                  Postnummer
                </label>
                <input
                  type="text"
                  id="postnummer"
                  onChange={this.handleChange}
                  placeholder={profile.postnummer}
                />
              </div>
              <div className="input-field col s8">
                <label htmlFor="by" class={profile.by ? "active" : null}>
                  By
                </label>
                <input
                  type="text"
                  id="by"
                  onChange={this.handleChange}
                  placeholder={profile.by}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">mail</i>
                <label htmlFor="Email" class={profile.email ? "active" : null}>
                  Email
                </label>
                <input
                  type="text"
                  id="Email"
                  onChange={this.handleChange}
                  placeholder={profile.email}
                />
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">phone</i>

                <label htmlFor="mobil" class={profile.mobil ? "active" : null}>
                  Mobil
                </label>
                <input
                  type="text"
                  id="mobil"
                  onChange={this.handleChange}
                  placeholder={profile.mobil}
                />
              </div>
            </div>
            <div className="input-field col s12">
              <select
                className="browser-default"
                id="civilstand"
                value={profile.civilstand}
                onChange={this.handleChange}
              >
                <option value="" disabled selected>
                  Vælg civilstand
                </option>
                <option value="gift">Gift</option>
                <option value="ugift">Ugift</option>
                <option value="samlever">Samlever</option>
              </select>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="børn" class={profile.børn ? "active" : null}>
                  Antal børn og alder
                </label>
                <input
                  type="text"
                  id="børn"
                  onChange={this.handleChange}
                  placeholder={profile.børn}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="formål"
                  class={profile.formål ? "active" : null}
                >
                  Ansøgt formål
                </label>
                <textarea
                  id="formål"
                  className="materialize-textarea"
                  type="text"
                  onChange={this.handleChange}
                  placeholder={profile.formål}
                ></textarea>
              </div>
            </div>
          </div>
          <div>
            <h5 className="grey-text text-darken-3">Økonomiske forhold</h5>
            <h6>Nettooindtægt per måned i kroner</h6>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="formueibank"
                  class={profile.formueibank ? "active" : null}
                >
                  Indestående formue i bank
                </label>
                <input
                  type="text"
                  id="formueibank"
                  onChange={this.handleChange}
                  defaultValue={profile.formueibank}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="indtægtansøger"
                  class={profile.indtægtansøger ? "active" : null}
                >
                  Nettoindtægt for ansøger
                </label>
                <input
                  type="text"
                  id="indtægtansøger"
                  onChange={this.handleChange}
                  defaultValue={profile.indtægtansøger}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="indtægtsamlever"
                  class={profile.indtægtsamlever ? "active" : null}
                >
                  Nettoindtægt for eventuel ægtefælle/samlever
                </label>
                <input
                  type="text"
                  id="indtægtsamlever"
                  onChange={this.handleChange}
                  defaultValue={profile.indtægtsamlever}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="boligsikring"
                  class={profile.boligsikring ? "active" : null}
                >
                  Boligsikring
                </label>
                <input
                  type="text"
                  id="boligsikring"
                  onChange={this.handleChange}
                  defaultValue={profile.boligsikring}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="huslejetilskud"
                  class={profile.huslejetilskud ? "active" : null}
                >
                  Huslejetilskud
                </label>
                <input
                  type="text"
                  id="huslejetilskud"
                  onChange={this.handleChange}
                  defaultValue={profile.huslejetilskud}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="børnebidrag"
                  class={profile.børnebidrag ? "active" : null}
                >
                  Børnebidrag
                </label>
                <input
                  type="text"
                  id="børnebidrag"
                  onChange={this.handleChange}
                  defaultValue={profile.børnebidrag}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="børnetilskud"
                  class={profile.børnetilskud ? "active" : null}
                >
                  Børnetilskud
                </label>
                <input
                  type="text"
                  id="børnetilskud"
                  onChange={this.handleChange}
                  defaultValue={profile.børnetilskud}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="familieydelse"
                  class={profile.familieydelse ? "active" : null}
                >
                  Familieydelse
                </label>
                <input
                  type="text"
                  id="familieydelse"
                  onChange={this.handleChange}
                  defaultValue={profile.familieydelse}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="totalindtægt"
                  class={profile.totalIndtægt ? "active" : null}
                >
                  Total indtægt (udfyldes automatisk når formen gemmes)
                </label>
                <input
                  type="number"
                  id="totalindtægt"
                  onChange={this.handleChange}
                  placeholder={profile.totalIndtægt}
                  readOnly
                />
              </div>
            </div>
          </div>{" "}
          <h6>Nettoudgifter per måned i kroner</h6>
          <div className="row">
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="udgift1"
                  class={profile.udgift1 ? "active" : null}
                >
                  Anden udgift (specificeret)
                </label>
                <input
                  type="number"
                  id="udgift1"
                  onChange={this.handleChange}
                  defaultValue={profile.udgift1}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="udgift2"
                  class={profile.udgift2 ? "active" : null}
                >
                  Anden udgift (specificeret)
                </label>
                <input
                  type="number"
                  id="udgift2"
                  onChange={this.handleChange}
                  defaultValue={profile.udgift2}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="udgift3"
                  class={profile.udgift3 ? "active" : null}
                >
                  Anden udgift (specificeret)
                </label>
                <input
                  type="number"
                  id="udgift3"
                  onChange={this.handleChange}
                  defaultValue={profile.udgift3}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="totaludgift"
                  class={profile.totalUdgift ? "active" : null}
                >
                  Total udgift (udfyldes automatisk når formen gemmes)
                </label>
                <input
                  type="number"
                  id="totaludgift"
                  onChange={this.handleChange}
                  placeholder={profile.totalUdgift}
                  readOnly
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="resttilunderhold"
                  class={profile.resttilunderhold ? "active" : null}
                >
                  Rest til underhold (udfyldes automatisk når formen gemmes)
                </label>
                <input
                  type="number"
                  id="resttilunderhold"
                  onChange={this.handleChange}
                  placeholder={profile.resttilunderhold}
                  readOnly
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="total"
                  class={profile.totalKroner ? "active" : null}
                >
                  Total kr.
                </label>
                <input
                  type="number"
                  id="total"
                  onChange={this.handleChange}
                  placeholder={profile.totalKroner}
                  readOnly
                />
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="row">
            <div className="input-field col s1">
              <button className="btn lighten-1 z-depth-0 green black-text">
                Send
              </button>
              <div className="center red-text">
                {authError ? <p>{authError}</p> : null}
              </div>
            </div>

            <div className="input-field col s1">
              <button
                onClick={this.handleSave}
                className="btn lighten-1 z-depth-0 blue black-text"
              >
                Gem
              </button>
              <div className="center red-text">
                {authError ? <p>{authError}</p> : null}
              </div>
            </div>
          </div>
        </form>

        {/* check */}
        {profile ? (
          <p>profilen er opdateret med navnet: {profile.fornavn}</p>
        ) : (
          <p>Ikke gemt endnu</p>
        )}
        {profile.savedAt ? <p>Og sidst gemt {profile.savedAt}</p> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    // projects: state.firestore.ordered.projects, // from database
    auth: state.firebase.auth, // from auth
    profile: state.firebase.profile, // from authenticated profile
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    send: info => dispatch(send(info)),
    save: info => dispatch(save(info)),
    uploadSuccess: file => dispatch(uploadSuccess(file))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "users", orderBy: ["createdAt", "desc"] }])
)(Ansøg);
