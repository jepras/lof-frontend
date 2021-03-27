import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { decide, downloadFile } from '../../store/actions/adminActions';
import FormDataInfoModal from '../modals/FormDataInfoModal';
import { Redirect } from 'react-router-dom';

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
    const { forms, downloadUrl, profile } = this.props;
    const { formData } = this.state;
    var data;

    if (forms) {
      data = Object.entries(forms);
    }

    const bilagItems = formData
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

    /* For admin usage only */
    if (!profile.role) return <Redirect to="/" />;

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

        <hr />

        {profile.role === 'admin' ? <h1>HEY</h1> : null}
        <h3>Nye ansøgniner</h3>
        <table className="highlight">
          <thead>
            <tr>
              <th>Ansøgning</th>
              <th>Navn</th>
              <th>CPR</th>
              <th>Dato</th>
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
                          className="modal-trigger waves-effect btn"
                          onClick={(e) => this.updateState(field[0])}
                        >
                          Læs
                        </button>
                      </td>
                      <td>
                        {field[1].fornavn} {field[1].efternavn}
                      </td>
                      <td>{field[1].cpr}</td>

                      <td>{field[1].savedAt}</td>

                      <td>
                        <button
                          href="#modal-confirm"
                          value="confirm"
                          className="modal-trigger green waves-effect btn-small"
                          onClick={(e) => this.openDecisionModal(field[0])}
                        >
                          Bekræft
                        </button>

                        <button
                          href="#modal-reject"
                          value="hello"
                          className="modal-trigger red waves-effect btn-small"
                          onClick={(e) => this.openDecisionModal(field[0])}
                        >
                          Afslå
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
              <th>Ansøgning</th>
              <th>Navn</th>
              <th>CPR</th>
              <th>Dato</th>
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
                          className="modal-trigger waves-effect btn"
                          onClick={(e) => this.updateState(field[0])}
                        >
                          Læs
                        </button>
                      </td>
                      <td>
                        {field[1].fornavn} {field[1].efternavn}
                      </td>
                      <td>{field[1].cpr}</td>

                      <td>{field[1].savedAt}</td>
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
              <th>Ansøgning</th>
              <th>Navn</th>
              <th>CPR</th>
              <th>Dato</th>
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
                          className="modal-trigger waves-effect btn"
                          onClick={(e) => this.updateState(field[0])}
                        >
                          Læs
                        </button>
                      </td>
                      <td>
                        {field[1].fornavn} {field[1].efternavn}
                      </td>
                      <td>{field[1].cpr}</td>
                      <td>{field[1].savedAt}</td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>

        <hr />

        {/* Modals */}

        <FormDataInfoModal bilagItems={bilagItems} formData={formData} />

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
  console.log('state from mapStateToProps', state);
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
