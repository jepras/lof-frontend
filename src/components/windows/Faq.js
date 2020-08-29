import React, { Component } from 'react';

class Faq extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      fields: [],
    };
  }

  async componentDidMount() {
    let response = await fetch(process.env.REACT_APP_API_URL + 'sporgsmals/1');
    if (!response.ok) {
      return;
    }

    let fields = await response.json();
    this.setState({ loading: false, fields: fields });
  }
  render() {
    console.log(this.state.fields);

    const { question } = this.state.fields;

    if (!this.state.loading) {
      return (
        <div>
          <div className="row about-row-top">
            <div className="col col-about s12 m6">
              <h1>Oftest stillede spørgsmål</h1>
              <div style={{ width: '98%' }}>
                <hr className="styleheader" />
              </div>
            </div>
            &nbsp;
            <div className="col s12 col-about">
              <ul
                className="collection"
                style={{ paddingRight: '10px', paddingLeft: '10px' }}
              >
                {question.map((field, index) => {
                  return (
                    <li className="collection-item" key={index}>
                      <div>
                        {field.text}
                        <span className="secondary-content">
                          {field.svar === 'ja' ? (
                            <i className="material-icons">check</i>
                          ) : (
                            <i className="material-icons">do_not_disturb</i>
                          )}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
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

export default Faq;
