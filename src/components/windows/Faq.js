import React, { Component } from "react";

class Faq extends Component {
  render() {
    return (
      <div>
        <div className="row about-row-top">
          <div className="col col-about s12 m6">
            <h1>Oftest stillede spørgsmål</h1>
            <div style={{ width: "98%" }}>
              <hr className="styleheader" />
            </div>
          </div>
          &nbsp;
          <div className="col s12 col-about">
            <ul
              class="collection"
              style={{ paddingRight: "10px", paddingLeft: "10px" }}
            >
              <li class="collection-item">
                <div>
                  Kan jeg ansøge om legat, hvis jeg er under 18 år?
                  <span class="secondary-content">
                    <i class="material-icons">check</i>
                  </span>
                </div>
              </li>
              <li class="collection-item">
                <div>
                  Kan jeg ansøge på engelsk eller andre sprog?
                  <span class="secondary-content">
                    <i class="material-icons">do_not_disturb</i>
                  </span>
                </div>
              </li>
              <li class="collection-item">
                <div>
                  Kan jeg ansøge om legat, hvis jeg er bosiddende i udlandet?
                  <span class="secondary-content">
                    <i class="material-icons">do_not_disturb</i>
                  </span>
                </div>
              </li>
              <li class="collection-item">
                <div>
                  Kan jeg ansøge om legat igen, selvom jeg ikke fik legat sidst?
                  <span class="secondary-content">
                    <i class="material-icons">check</i>
                  </span>
                </div>
              </li>
              <li class="collection-item">
                <div>
                  Kan jeg søge om legat på vegne af andre?
                  <span class="secondary-content">
                    <i class="material-icons">check</i>
                  </span>
                </div>
              </li>
              <li class="collection-item">
                <div>
                  Kan jeg kontakte Fonden telefonisk eller pr. mail?
                  <span class="secondary-content">
                    <i class="material-icons">do_not_disturb</i>
                  </span>
                </div>
              </li>
              <li class="collection-item">
                <div>
                  Kan jeg få begrundet et afslag på min ansøgning?
                  <span class="secondary-content">
                    <i class="material-icons">do_not_disturb</i>
                  </span>
                </div>
              </li>
              <li class="collection-item">
                <div>
                  Kan jeg ansøge om legat både i begyndelsen og i slutningen af
                  året? 
                  <span class="secondary-content">
                    <i class="material-icons">check</i>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Faq;
