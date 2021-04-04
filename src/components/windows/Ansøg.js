import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  send,
  save,
  uploadSuccess,
  deleteFile,
} from '../../store/actions/ansøgActions';

import FileForm from './FileForm';
import Loader from '../layout/Loader';
import FormDataInfoModalClass from '../modals/FormDataInfoModalClass';

class Ansøg extends Component {
  state = {};

  /* for form updates */
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  /* handle functions */
  handleSend = (e) => {
    this.props.send(this.state);
  };

  handleSave = (e) => {
    this.props.save(this.state);
  };

  handledeleteFile = (e) => {
    let filNavn = e.currentTarget.parentNode.getAttribute('data-key');
    this.props.deleteFile(filNavn);
  };

  profileStatus = (param) => {
    switch (param) {
      case 'sendt':
        return (
          <div>
            <p>
              Din ansøgning er sendt afsted og under behandling. Vi vender
              snarest tilbage.{' '}
            </p>
            <p>Se din ansøgning nedenunder</p>
          </div>
        );
      default:
        return (
          <div>
            <p>Hej!</p>
            <p>
              På denne side kan du udfylde din ansøgningen til fonden. Løbende
              kan du gemme din ansøgningen (nederst til højre på siden) og vende
              tilbage til ansøgningen en anden dag. Når ansøgningen er fuldendt
              med personlige informationer, økonomiske forhold og bilag, kan du
              sende den afsted på knappen "Send".
            </p>
          </div>
        );
    }
  };

  render() {
    const { auth, profile, authError, ansøg } = this.props;

    if (profile) {
      var bilagItems = profile.uploads
        ? profile.uploads.map((upload, index) => (
            <li className="collection-item" data-key={upload} key={index}>
              Bilag {index + 1}: {upload}
            </li>
          ))
        : null;
    }

    // if not logged in
    if (!auth.uid)
      return (
        <div className="dashboard">
          <div className="row">
            <p>
              For at sende en ansøgning, så skal du oprette en bruger på knappen
              nedenfor under
            </p>
            <NavLink
              to="/opret"
              className="btn-large z-depth-1 white-text waves-effect blue"
            >
              Opret bruger
            </NavLink>
            <p>
              Hvis du allerede har en bruger, så brug knappen til at logge ind
            </p>
            <NavLink
              to="/login"
              className="btn-large z-depth-1 white-text waves-effect blue"
            >
              Login her
            </NavLink>
          </div>
        </div>
      );

    // if logged in
    return (
      <div>
        <form className="white" onSubmit={this.handleSend}>
          <div className="row about-row-top">
            <div className="col col-about s12 m7">
              <h1>Indsend ansøgningsskema</h1>
              <div style={{ width: '98%' }}>
                <hr className="styleheader" />
              </div>
            </div>
            &nbsp;
            <div className="col col-about s12">
              {this.profileStatus(profile.status)}
            </div>
          </div>
          <div>
            {' '}
            {/* PERSONLIGT */}
            <h5>Personligt</h5>
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="cpr" className={profile.cpr ? 'active' : null}>
                  CPR Nummer
                </label>
                <input
                  type="text"
                  id="cpr"
                  onChange={this.handleChange}
                  placeholder={profile.cpr}
                  className="validate"
                  maxLength="100"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <label
                  htmlFor="fornavn"
                  className={profile.fornavn ? 'active' : null}
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
                  className={profile.efternavn ? 'active' : null}
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
                  className={profile.adresse ? 'active' : null}
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
                  className={profile.postnummer ? 'active' : null}
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
                <label htmlFor="by" className={profile.by ? 'active' : null}>
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
                <label
                  htmlFor="Email"
                  className={profile.email ? 'active' : null}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="Email"
                  onChange={this.handleChange}
                  placeholder={profile.email}
                  className="validate"
                />{' '}
                <span
                  className="helper-text"
                  data-error="Ikke en korrekt email"
                ></span>
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">phone</i>

                <label
                  htmlFor="mobil"
                  className={profile.mobil ? 'active' : null}
                >
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
                value={profile.civilstand ? profile.civilstand : 'ikke-valgt'}
                onChange={this.handleChange}
              >
                <option value="ikke-valgt" disabled>
                  Vælg civilstand
                </option>
                <option value="gift">Gift</option>
                <option value="ugift">Ugift</option>
                <option value="samlever">Samlever</option>
              </select>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="børn"
                  className={profile.børn ? 'active' : null}
                >
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
                  className={profile.formål ? 'active' : null}
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
          {/* ØKONOMISKE FORHOLD */}
          <div className="row" style={{ paddingTop: '100px' }}>
            <h5>Økonomiske forhold</h5>
            <h6>Nettooindtægt per måned i kroner</h6>
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="formueibank"
                  className={profile.formueibank ? 'active' : null}
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
                  className={profile.indtægtansøger ? 'active' : null}
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
                  className={profile.indtægtsamlever ? 'active' : null}
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
                  className={profile.boligsikring ? 'active' : null}
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
                  className={profile.huslejetilskud ? 'active' : null}
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
                  className={profile.børnebidrag ? 'active' : null}
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
                  className={profile.børnetilskud ? 'active' : null}
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
                  className={profile.familieydelse ? 'active' : null}
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
                  className={profile.totalIndtægt ? 'active' : null}
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
          </div>{' '}
          <h6>Nettoudgifter per måned i kroner</h6>
          <div className="row">
            <div className="row">
              <div className="input-field col s12">
                <label
                  htmlFor="udgift1"
                  className={profile.udgift1 ? 'active' : null}
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
                  className={profile.udgift2 ? 'active' : null}
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
                  className={profile.udgift3 ? 'active' : null}
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
                  className={profile.totalUdgift ? 'active' : null}
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
                  className={profile.resttilunderhold ? 'active' : null}
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
                  className={profile.totalKroner ? 'active' : null}
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
            {/* BILAG */}
            <div className="row">
              <h5>Vedhæft bilag</h5>
              <h6>
                Indsend gerne kopi af årsopgørelse, forskudsopgørelse, andre
                skattepapirer, eventuel udtalelse fra læge, kommune,
                sagsbehandler, pensionsmeddelelser, bankkontodetaljer
              </h6>

              <div className="row bilag-row-top">
                <ul
                  className="collection"
                  style={{ paddingRight: '10px', paddingLeft: '10px' }}
                >
                  <li className="collection-item">
                    <FileForm />
                    {ansøg.uploadError && ansøg.uploadErrorMsg}
                  </li>
                  {/* {profile.uploads &&
                    profile.uploads.map((fil, index) => (
                      <div>
                        <li className="collection-item">
                          <FileForm />
                        </li>
                      </div>
                    ))} */}
                </ul>
                <ul className="collection">
                  <li className="collection-item">
                    <h6>Gemte Filer</h6>
                    {ansøg.deleteError && ansøg.deleteErrorMsg}
                  </li>

                  {profile.uploads &&
                    profile.uploads.map((fil, index) => (
                      <div key={index}>
                        <li
                          key={index}
                          data-key={fil}
                          className="collection-item"
                        >
                          {fil}
                          <a onClick={this.handledeleteFile}>
                            <span className="secondary-content">
                              <i className="material-icons">delete</i>
                            </span>
                          </a>
                        </li>
                      </div>
                    ))}
                </ul>
              </div>
            </div>

            {/* Check gemt version */}

            {profile.status === 'gemt' ? (
              <p>Profilen er sidst gemt d. {profile.savedAt}</p>
            ) : null}
            {profile.status === 'sendt' ? (
              <h3>Ansøgningen er sendt ind d. {profile.savedAt}</h3>
            ) : null}
          </div>
        </form>

        {profile.status === 'sendt' ? null : (
          <div>
            <div className="fixed-action-btn">
              {ansøg.saveLoading === false ? (
                <a
                  className="btn-floating btn-large white-text blue lighten-3"
                  style={{ backgroundColor: '#000000' }}
                  onClick={this.handleSave}
                >
                  GEM
                </a>
              ) : (
                <Loader />
              )}
            </div>
          </div>
        )}

        {profile.status === 'sendt' ? null : (
          <div>
            <div className="row">
              <div className="input-field col s12">
                <a
                  href="#modal-expand"
                  className="btn-large z-depth-1 white-text waves-effect modal-trigger blue"
                  onClick={this.handleSave}
                >
                  Send til behandling{' '}
                  <i className="material-icons left">send</i>
                </a>

                <div className="center red-text">
                  {authError ? <p>{authError}</p> : null}
                </div>
              </div>

              <div className="col s12">
                <a
                  className="btn-large z-depth-1 white-text waves-effect waves-light blue lighten-3"
                  onClick={this.handleSave}
                >
                  Gem oplysninger til senere{' '}
                  <i className="material-icons left">save</i>
                </a>
              </div>
            </div>

            <div className="center red-text">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        )}

        {/* Pop up modals */}

        <FormDataInfoModalClass
          formData={profile}
          bilagItems={bilagItems}
          sendData={this.handleSend}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // projects: state.firestore.ordered.projects, // from database
    auth: state.firebase.auth, // from auth
    profile: state.firebase.profile, // from authenticated profile
    authError: state.auth.authError,
    ansøg: state.ansøg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    send: (info) => dispatch(send(info)),
    save: (info) => dispatch(save(info)),
    uploadSuccess: (file) => dispatch(uploadSuccess(file)),
    deleteFile: (file) => dispatch(deleteFile(file)),
  };
};

/* export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "users", orderBy: ["createdAt", "desc"] }])
)(Ansøg); */

export default connect(mapStateToProps, mapDispatchToProps)(Ansøg);
