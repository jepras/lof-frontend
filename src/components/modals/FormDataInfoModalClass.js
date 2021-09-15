import React, { Component } from 'react';
import M from 'materialize-css';

class FormDataInfoModalClass extends Component {
  componentDidMount() {
    M.Modal.init(this.Modal);
  }

  render() {
    const { formData, bilagItems, sendData } = this.props;

    return (
      <div>
        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id="modal-expand"
          className="modal modal-fixed-footer"
        >
          {formData ? (
            <div className="modal-content">
              {sendData ? (
                <div>
                  <h5>Er du sikker på at sende ansøgningen afsted?</h5>{' '}
                  <p>Gennemtjek dine oplysninger først</p>
                </div>
              ) : (
                <h5>Alle informationer om {formData.fornavn}</h5>
              )}

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
                  <b>Banknavn: </b>
                  {formData.banknavn}
                </li>
                <li className="collection-item">
                  <b>Registreringsnummer: </b>
                  {formData.registreringsnummer}
                </li>
                <li className="collection-item">
                  <b>Kontonummer: </b>
                  {formData.kontonummer}
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
                  <b>Indtægt samlevende: </b>
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
          {sendData ? (
            <div className="modal-footer">
              <div className="row">
                <div className="col">
                  <a
                    className="btn z-depth-1 white-text waves-effect waves-light modal-close blue"
                    onClick={sendData}
                  >
                    Send til behandling{' '}
                    <i className="material-icons left">send</i>
                  </a>
                </div>
                <div className="col">
                  <a className="btn z-depth-1 white-text waves-effect waves-light modal-close red">
                    Afbryd
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="modal-footer">
              <a className="modal-close waves-effect waves-green btn">Luk</a>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default FormDataInfoModalClass;
