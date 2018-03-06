import React from "react";

class References extends React.Component {
  render() {

    const references = [];

    let x=0;
    for (let reference of this.props.references) {
      const itemTitle = reference['Item title'];
      const URL = reference['Webpage'];
      let itemNotes = '';
      if (reference['Comment on reference']) {
        itemNotes = <span className="reference-comment">{reference['Comment on reference']}</span>;
      }

      x++;
      references.push(
        <li className="literature" key={x}>
          <a className="literature-title" href={URL}>{itemTitle}</a>
          {itemNotes}
        </li>
      );
    }

    return(
      <div className="letter-references">
        <h3>References to sources and secondary literature for this letter</h3>
        <ul>{references}</ul>
      </div>
    );
  }
}

export default References;