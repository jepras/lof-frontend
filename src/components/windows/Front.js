import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div>
        <div className="row about-row-top">
          <h1 className="center-align">Løfbergs og Fennings Fond</h1>
          <div style={{ width: '98%' }}>
            <hr className="styleheader" />
          </div>
          <div className="col s12">
            <h6 className="center-align">
              Velkommen til Løfbergs og Fennings fonds hjemmeside.
            <br />
            <h6 className="center-align">
              Pr. 4. december 2023:
              Fonden oplyser, at der til uddelingen ultimo året 2023 har været begrænsede midler, hvilket
              beklageligvis har medført, at en række legatarer i år ikke er blevet tildelt et legat.
            </h6>
            </h6>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
