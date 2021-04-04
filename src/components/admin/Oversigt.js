import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { functions } from '../../config/fbConfig.js';

import {
  decide,
  downloadFile,
  deleteUserData,
} from '../../store/actions/adminActions';
import FormDataInfoModalClass from '../modals/FormDataInfoModalClass';
import ModalConfirm from '../modals/ModalConfirm';
import ModalReject from '../modals/ModalReject';
import ModalDelete from '../modals/ModalDelete';

class Oversigt extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.updateState = this.updateState.bind(this);
  }

  sendEmail = (e) => {
    var data = {
      mail: this.state.formData.email,
      receiver: this.state.formData.fornavn,
    };

    if (e.target.dataset.key === 'confirm') {
      const callable = functions.httpsCallable('confirmEmail');

      return callable(data)
        .then(console.log('success from confirmEmail function'))
        .catch((error) => {
          console.log('error: ', error);
        });
    } else {
      const callable = functions.httpsCallable('rejectEmail');

      return callable(data)
        .then(console.log('success from rejectEmail function'))
        .catch((error) => {
          console.log('error: ', error);
        });
    }
  };

  updateState = (e) => {
    this.setState({ currentRow: e });
    this.fetchModal(e);
  };

  fetchModal = (e) => {
    var formData = this.props.forms[e];
    this.setState({ formData });
  };

  plugFormIdToState = (e) => {
    this.setState({ formId: e });

    var formData = this.props.forms[e];
    this.setState({ formData });
  };

  makeDecision = (e) => {
    this.sendEmail(e);

    var decisionData = {
      formId: this.state.formId,
      decision: e.target.dataset.key,
    };
    this.props.decide(decisionData);
  };

  deleteUserData = (e) => {
    var userData = {
      formId: this.state.formId,
      selectedUser: this.state.formData.authorId,
      formData: this.state.formData,
    };
    console.log('deleting user data with: ', userData);
    this.props.deleteUserData(userData);
  };

  handleDownloadFile = (e) => {
    console.log('formData fra funktion: ', this.state.formData);
    var userData = {
      filNavn: e.currentTarget.parentNode.getAttribute('data-key'),
      selectedUser: this.state.formData.authorId,
      formData: this.state.formData,
    };

    this.props.downloadFile(userData);
  };

  render() {
    const {
      forms,
      downloadUrl,
      linkUpload,
      profile,
      deleteSuccess,
    } = this.props;
    const { formData } = this.state;

    // eslint-disable-next-line
    var data;

    if (forms) {
      data = Object.entries(forms);
    }

    if (formData) {
      var bilagItems = formData.uploads
        ? formData.uploads.map((upload, index) => (
            <li className="collection-item" data-key={upload} key={index}>
              {upload === linkUpload ? (
                <a className="btn green" href={downloadUrl} target={'_blank'}>
                  Download
                </a>
              ) : (
                <a onClick={this.handleDownloadFile} className="btn">
                  Opret download link
                </a>
              )}
              &nbsp; Bilag {index + 1}: {upload}
            </li>
          ))
        : null;
    }

    /* For admin usage only */
    if (!profile.role) return <Redirect to="/" />;

    return (
      <div>
        <h3>Nye ansøgniner</h3>
        <table className="highlight">
          <thead>
            <tr>
              <th>Ansøgning</th>
              <th>Navn</th>
              <th>CPR</th>
              <th>Dato</th>
              <th>Beslutning</th>
              <th>Slet</th>
            </tr>
          </thead>

          <tbody>
            {/* eslint-disable */}
            {/*  */}
            {forms &&
              Object.entries(forms)
                .filter((x) => x[1])
                .map((field, index) => {
                  /* delete forms[field[0]] */

                  if (!field[1].decision) {
                    return (
                      <tr key={index}>
                        <td>
                          <button
                            data-target="modal-expand"
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
                            data-target="modal-confirm"
                            value="confirm"
                            className="modal-trigger green waves-effect btn-small"
                            onClick={(e) => this.plugFormIdToState(field[0])}
                          >
                            Bekræft
                          </button>

                          <button
                            data-target="modal-reject"
                            value="hello"
                            className="modal-trigger red waves-effect btn-small"
                            onClick={(e) => this.plugFormIdToState(field[0])}
                          >
                            Afslå
                          </button>
                        </td>
                        <td>
                          <button
                            data-target="modal-delete"
                            value="hello"
                            className="modal-trigger red waves-effect btn-small"
                            onClick={(e) => this.plugFormIdToState(field[0])}
                          >
                            Slet
                          </button>
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
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
              <th>Slet</th>
            </tr>
          </thead>

          <tbody>
            {/* eslint-disable */}
            {forms &&
              Object.entries(forms)
                .filter((x) => x[1])
                .map((field, index) => {
                  if (field[1].decision === 'confirm') {
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
                            data-target="modal-delete"
                            value="hello"
                            className="modal-trigger red waves-effect btn-small"
                            onClick={(e) => this.plugFormIdToState(field[0])}
                          >
                            Slet
                          </button>
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
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
              <th>Slet</th>
            </tr>
          </thead>

          <tbody>
            {/* eslint-disable */}
            {forms &&
              Object.entries(forms)
                .filter((x) => x[1])
                .map((field, index) => {
                  if (field[1].decision === 'reject') {
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
                            data-target="modal-delete"
                            value="hello"
                            className="modal-trigger red waves-effect btn-small"
                            onClick={(e) => this.plugFormIdToState(field[0])}
                          >
                            Slet
                          </button>
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
          </tbody>
        </table>

        <hr />

        {/* Modals */}
        <FormDataInfoModalClass bilagItems={bilagItems} formData={formData} />
        <ModalConfirm confirm={this.makeDecision} />
        <ModalReject reject={this.makeDecision} />
        <ModalDelete
          deleteUserData={this.deleteUserData}
          deleteSuccess={deleteSuccess}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    forms: state.firestore.data.forms,
    downloadUrl: state.admin.downloadUrl,
    linkUpload: state.admin.linkUpload,
    deleteSuccess: state.admin.deleteSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    decide: (info) => dispatch(decide(info)),
    downloadFile: (file) => dispatch(downloadFile(file)),
    deleteUserData: (userData) => dispatch(deleteUserData(userData)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'forms', orderBy: ['createdAt', 'desc'] }])
)(Oversigt);
