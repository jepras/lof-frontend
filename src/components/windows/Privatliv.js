import React, { Component } from 'react';

class Privatliv extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      fields: [],
    };
  }

  async componentDidMount() {
    let response = await fetch(
      process.env.REACT_APP_API_URL + 'privatlivspolitiks/1'
    );
    if (!response.ok) {
      return;
    }

    let fields = await response.json();
    this.setState({ loading: false, fields: fields });
  }

  render() {
    const { undertekst, kontakt, sektion } = this.state.fields;

    if (!this.state.loading) {
      return (
        <div>
          <div className="row about-row-top">
            <h1>Privatlivspolitik</h1>
            <div className="col col-about s12 m6">
              <h6>
                {kontakt.navn}
                <br />
                CVR-nr. {kontakt.cvr}
                <br />
                {kontakt.addresse}
                <br />
                {kontakt.postnummer}
              </h6>
              &nbsp;
              <hr className="styleheader" />
            </div>
            <div className="col col-about s12">
              <h6>{undertekst}</h6>
            </div>
          </div>
          <hr className="style1" />

          <div className="row about-row">
            {sektion.map((field, index) => {
              return (
                <div key={index}>
                  <h5>{field.overskrift}</h5>
                  {field.paragraf.map((subfield, subindex) => {
                    return (
                      <div key={subindex}>
                        {subfield.overskrift ? (
                          <h6 key={subindex}>
                            <br />
                            {subfield.text}
                          </h6>
                        ) : (
                          <p key={subindex}>{subfield.text}</p>
                        )}
                      </div>
                    );
                  })}
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <h2 className="ProductList-title">
        Venter på at informationen bliver indlæst...
      </h2>
    );
  }
}

export default Privatliv;
