import React, { Component } from 'react';

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      fields: [],
    };
  }

  async componentDidMount() {
    let response = await fetch(process.env.REACT_APP_API_URL + 'omfondens/1');
    if (!response.ok) {
      return;
    }

    let fields = await response.json();
    this.setState({ loading: false, fields: fields });
  }

  render() {
    const { formaal, omfonden, hvordan } = this.state.fields;

    if (!this.state.loading) {
      return (
        <div>
          <div className="row about-row-top">
            <h1>Om Fonden</h1>
            <div className="col col-about s12 m6">
              <h6>{omfonden}</h6>
              &nbsp;
              <div style={{ width: '98%' }}>
                <hr className="styleheader" />
              </div>
            </div>
          </div>
          <div className="row about-row">
            <h2>Hvad fonden støtter</h2>

            <h4>Legatets formål:</h4>
            <blockquote>
              <ol>
                {formaal.map((field, index) => {
                  return <li key={index}>{field.punkter}</li>;
                })}
              </ol>
            </blockquote>
          </div>
          <hr className="style1" />
          <div className="row about-row">
            <h2>Hvem kan ansøge og hvordan</h2>
            <blockquote>
              <ol>
                {hvordan.map((field, index) => {
                  return <li key={index}>{field.punkter}</li>;
                })}
              </ol>
            </blockquote>
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

export default About;
