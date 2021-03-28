import React, { Component } from 'react';
import M from 'materialize-css';

class ModalReject extends Component {
  componentDidMount() {
    M.Modal.init(this.Modal);
  }

  render() {
    const { reject } = this.props;

    return (
      <div>
        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id="modal-reject"
          className="modal"
        >
          <div className="modal-content">
            <h4>Er du sikker på at afvise ansøgeren?</h4>
            <p>En email bliver automatisk sendt ud til ansøgeren</p>
          </div>
          <div className="modal-footer">
            <a
              data-key="reject"
              onClick={reject}
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

export default ModalReject;
