import React, { Component } from 'react';
import M from 'materialize-css';

class ModalDelete extends Component {
  componentDidMount() {
    M.Modal.init(this.Modal);
  }

  render() {
    const { deleteUserData, deleteSuccess } = this.props;

    return (
      <div>
        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id="modal-delete"
          className="modal"
        >
          {!deleteSuccess ? (
            <div>
              <div className="modal-content">
                <h4>Vil du slette brugeren og alt associeret data?</h4>
                <p>Dette kan ikke fortrydes</p>
              </div>
              <div className="modal-footer">
                <a
                  onClick={deleteUserData}
                  className="waves-effect waves-green btn green modal-close"
                >
                  Ja
                </a>
                <a className="waves-effect waves-red modal-close red btn">
                  Nej
                </a>
              </div>
            </div>
          ) : (
            <div>
              <div className="modal-content">
                <h4>Success</h4>
              </div>
              <div className="modal-footer">
                <a className="modal-close waves-effect waves-green btn">Luk</a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ModalDelete;
