import React, { Component } from 'react';
import M from 'materialize-css';

class ModalConfirm extends Component {
  componentDidMount() {
    M.Modal.init(this.Modal);
  }

  render() {
    const { confirm } = this.props;

    return (
      <div>
        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id="modal-confirm"
          className="modal"
        >
          <div className="modal-content">
            <h4>Er du sikker på et bekræfte?</h4>
            <p>En email bliver automatisk sendt ud til ansøgeren</p>
          </div>
          <div className="modal-footer">
            <a
              data-key="confirm"
              onClick={confirm}
              className="modal-close waves-effect waves-green btn"
            >
              Ja
            </a>
            <a className="waves-effect waves-red modal-close red btn">Nej</a>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalConfirm;
