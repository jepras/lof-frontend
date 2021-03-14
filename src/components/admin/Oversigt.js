import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { decide, downloadFile } from '../../store/actions/adminActions';
import adminReducer from '../../store/reducers/adminReducer';
/* import ApplicationTable from './ApplicationTable'; */

class Oversigt extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.updateState = this.updateState.bind(this);
  }

  updateState = (e) => {
    this.setState({ currentRow: e });
    this.fetchModal(e);
  };

  fetchModal = (e) => {
    var formData = this.props.forms[e];
    this.setState({ formData });
  };

  openDecisionModal = (e) => {
    this.setState({ formId: e });
  };

  makeDecision = (e) => {
    var decisionData = {
      formId: this.state.formId,
      decision: e.target.dataset.key,
    };
    this.props.decide(decisionData);
  };

  handleDownloadFile = (e) => {
    let filNavn = e.currentTarget.parentNode.getAttribute('data-key');
    console.log('filNavn', filNavn);
    this.props.downloadFile(filNavn);
  };

  render() {
    const { forms, downloadUrl } = this.props;
    const { formData } = this.state;
    var data;

    if (forms) {
      data = Object.entries(forms);
    }

    const bilagItems = this.state.formData
      ? formData.uploads.map((upload, index) => (
          <li className="collection-item" data-key={upload} key={index}>
            Bilag {index + 1}: {upload}
            {downloadUrl ? (
              <a className="btn" href={downloadUrl} target={'_blank'}>
                Download
              </a>
            ) : (
              <a onClick={this.handleDownloadFile} className="btn">
                Opret download link
              </a>
            )}
          </li>
        ))
      : null;

    /* For admin usage only
    
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
    ); */

    return (
      <div>
        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s3">
                <a href="#test1">2020</a>
              </li>
              <li className="tab col s3">
                <a className="active" href="#test2">
                  2021
                </a>
              </li>
              <li className="tab col s3 disabled">
                <a href="#test3">2022</a>
              </li>
              <li className="tab col s3">
                <a href="#test4">2023</a>
              </li>
            </ul>
          </div>
          <div id="test1" className="col s12">
            2020
          </div>
          <div id="test2" className="col s12">
            2021
          </div>
          <div id="test3" className="col s12">
            2022
          </div>
          <div id="test4" className="col s12">
            2023
          </div>
        </div>

        {/* <ApplicationTable
          bilagItems={bilagItems}
          data={data}
          formData={formData}
        /> */}

        <hr />

        <h3>Nye ansøgniner</h3>
        <table className="highlight">
          <thead>
            <tr>
              <th>Se mere</th>
              <th>Navn</th>
              <th>CPR</th>
              <th>Formål</th>
              <th>Rådighedsbeløb</th>
              <th>Dato</th>
              <th>Noter</th>
              <th>Bedømmelse</th>
              <th>Beslutning</th>
            </tr>
          </thead>

          <tbody>
            {/* eslint-disable */}
            {data &&
              data.map((field, index) => {
                if (!field[1].decision) {
                  {
                    /* eslint-enable */
                  }
                  return (
                    <tr key={index}>
                      <td>
                        <button
                          href="#modal-expand"
                          value="hello"
                          className="modal-trigger waves-effect waves-light btn"
                          onClick={(e) => this.updateState(field[0])}
                        >
                          Mere info
                        </button>
                      </td>
                      <td>
                        {field[1].fornavn} {field[1].efternavn}
                      </td>
                      <td>{field[1].cpr}</td>
                      <td>{field[1].formål}</td>
                      <td>{field[1].resttilunderhold}</td>
                      <td>{field[1].savedAt}</td>
                      <td>{field[1].noter}</td>
                      <td>{field[1].bedømmelse}</td>
                      <td>
                        <button
                          href="#modal-confirm"
                          value="confirm"
                          className="modal-trigger green waves-effect waves-light btn-small"
                          onClick={(e) => this.openDecisionModal(field[0])}
                        >
                          Bekræft
                        </button>
                        <hr />
                        <button
                          href="#modal-reject"
                          value="hello"
                          className="modal-trigger red waves-effect waves-light btn-small"
                          onClick={(e) => this.openDecisionModal(field[0])}
                        >
                          Afslag
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>

        <h3>Bekræftede ansøgninger</h3>
        <table className="highlight">
          <thead>
            <tr>
              <th>Se mere</th>
              <th>Navn</th>
              <th>CPR</th>
              <th>Formål</th>
              <th>Rådighedsbeløb</th>
              <th>Dato</th>
              <th>Noter</th>
              <th>Bedømmelse</th>
            </tr>
          </thead>

          <tbody>
            {/* eslint-disable */}
            {data &&
              data.map((field, index) => {
                if (field[1].decision === 'confirm') {
                  {
                    /* eslint-enable */
                  }
                  return (
                    <tr key={index}>
                      <td>
                        <button
                          href="#modal-expand"
                          value="hello"
                          className="modal-trigger waves-effect waves-light btn"
                          onClick={(e) => this.updateState(field[0])}
                        >
                          Mere info
                        </button>
                      </td>
                      <td>
                        {field[1].fornavn} {field[1].efternavn}
                      </td>
                      <td>{field[1].cpr}</td>
                      <td>{field[1].formål}</td>
                      <td>{field[1].resttilunderhold}</td>
                      <td>{field[1].savedAt}</td>
                      <td>{field[1].noter}</td>
                      <td>{field[1].bedømmelse}</td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>
        <h3>Ansøgninger med afslag</h3>
        <table className="highlight">
          <thead>
            <tr>
              <th>Se mere</th>
              <th>Navn</th>
              <th>CPR</th>
              <th>Formål</th>
              <th>Rådighedsbeløb</th>
              <th>Dato</th>
              <th>Noter</th>
              <th>Bedømmelse</th>
            </tr>
          </thead>

          <tbody>
            {/* eslint-disable */}
            {data &&
              data.map((field, index) => {
                if (field[1].decision === 'reject') {
                  {
                    /* eslint-enable */
                  }
                  return (
                    <tr key={index}>
                      <td>
                        <button
                          href="#modal-expand"
                          value="hello"
                          className="modal-trigger waves-effect waves-light btn"
                          onClick={(e) => this.updateState(field[0])}
                        >
                          Mere info
                        </button>
                      </td>
                      <td>
                        {field[1].fornavn} {field[1].efternavn}
                      </td>
                      <td>{field[1].cpr}</td>
                      <td>{field[1].formål}</td>
                      <td>{field[1].resttilunderhold}</td>
                      <td>{field[1].savedAt}</td>
                      <td>{field[1].noter}</td>
                      <td>{field[1].bedømmelse}</td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>

        <hr />

        {/* Modals */}

        <div id="modal-expand" className="modal modal-fixed-footer">
          {this.state.formData ? (
            <div className="modal-content">
              <p>Alle informationer om {formData.fornavn}</p>

              <ul className="collection">
                <li className="collection-header">
                  <h4>Personlig information</h4>
                </li>

                <li className="collection-item">
                  <b>CPR: </b>
                  {formData.cpr}
                </li>
                <li className="collection-item">
                  <b>Navn: </b>
                  {formData.fornavn} + {formData.efternavn}
                </li>
                <li className="collection-item">
                  <b>Adresse: </b>
                  {formData.adresse}
                </li>
                <li className="collection-item">
                  <b>Postnummer: </b>
                  {formData.postnummer}
                </li>
                <li className="collection-item">
                  <b>By: </b>
                  {formData.by}
                </li>
                <li className="collection-item">
                  <b>Email: </b>
                  {formData.email}
                </li>
                <li className="collection-item">
                  <b>Mobil: </b>
                  {formData.mobil}
                </li>
                <li className="collection-item">
                  <b>Civilstand: </b>
                  {formData.civilstand}
                </li>
                <li className="collection-item">
                  <b>Formål: </b>
                  {formData.formål}
                </li>

                <li className="collection-header">
                  <h4>Indtægter</h4>
                </li>
                <li className="collection-item">
                  <b>Indestående formue: </b>
                  {formData.formueibank}
                </li>
                <li className="collection-item">
                  <b>Indtægt ansøger: </b>
                  {formData.indtægtansøger}
                </li>
                <li className="collection-item">
                  <b>Indtægt samlever: </b>
                  {formData.indtægtsamlever}
                </li>
                <li className="collection-item">
                  <b>Boligsikring: </b>
                  {formData.boligsikring}
                </li>
                <li className="collection-item">
                  <b>Huslejetilskud: </b>
                  {formData.huslejetilskud}
                </li>
                <li className="collection-item">
                  <b>Børnebidrag: </b>
                  {formData.børnebidrag}
                </li>
                <li className="collection-item">
                  <b>Børnetilskud: </b>
                  {formData.børnetilskud}
                </li>
                <li className="collection-item">
                  <b>Familieydelse: </b>
                  {formData.familieydelse}
                </li>
                <li className="collection-item">
                  <b>Total indtægt: </b>
                  {formData.totalIndtægt}
                </li>

                <li className="collection-header">
                  <h4>Udgifter</h4>
                </li>
                <li className="collection-item">
                  <b>Udgift 1: </b>
                  {formData.udgift1}
                </li>
                <li className="collection-item">
                  <b>Udgift 2: </b>
                  {formData.udgift2}
                </li>
                <li className="collection-item">
                  <b>Udgift 3: </b>
                  {formData.udgift3}
                </li>
                <li className="collection-item">
                  <b>Total udgift: </b>
                  {formData.totalUdgift}
                </li>
                <li className="collection-item">
                  <b>Rest til underhold: </b>
                  {formData.resttilunderhold}
                </li>
                <li className="collection-item">
                  <b>Total kroner: </b>
                  {formData.totalKroner}
                </li>

                <li className="collection-header">
                  <h4>Bilag</h4>
                </li>
                {bilagItems}
              </ul>
            </div>
          ) : (
            <p>Form data kan ikke vises</p>
          )}
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Luk
            </a>
          </div>
        </div>

        <div id="modal-confirm" className="modal">
          <div className="modal-content">
            <h4>Er du sikker på et bekræfte?</h4>
            <p>En email bliver automatisk sendt ud til ansøgeren</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              data-key="confirm"
              onClick={this.makeDecision}
              className="modal-close waves-effect waves-green btn"
            >
              Ja
            </a>
          </div>
        </div>
        <div id="modal-reject" className="modal">
          <div className="modal-content">
            <h4>Er du sikker på at afvise ansøgeren?</h4>
            <p>En email bliver automatisk sendt ud til ansøgeren</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              data-key="reject"
              onClick={this.makeDecision}
              className="modal-close waves-effect waves-green btn"
            >
              Ja
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state from map', state.admin.downloadUrl);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    forms: state.firestore.data.forms,
    downloadUrl: state.admin.downloadUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    decide: (info) => dispatch(decide(info)),
    downloadFile: (file) => dispatch(downloadFile(file)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'forms', orderBy: ['createdAt', 'desc'] }])
)(Oversigt);
