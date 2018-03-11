import React from "react";
import NiceDate from '../../NiceDate/NiceDate';

class LetterVersion extends React.Component {
  render() {

    const type = this.props.type;
    const version = this.props.version;
    const updated = this.props.version['Version last updated'];
    const numberOfVersions = this.props.numberofversions;
    const number = this.props.number;

    /**
     * Convert URL's to links. Total rip-off from somewhere on the internet.
     */
    function URLToLink(text) {
      const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
      const text1 = text.replace(exp, "<a href='$1'>$1</a>");
      let exp2 =/(^|[^/])(www\.[\S]+(\b|$))/gim;
      return (text1.replace(exp2, '$1<a href="http://$2">$2</a>'));
    }

    /**
     * Handle missing text and/or publishing permission
     */

    let content = `There is registered a version of the letter of the type <em>${this.props.type}</em>. Unfortunately, it may not be published here due to copyright issues. You may try to contact the owner.`;

    if (version.Public === 'true') {
      content = typeof version.Text !== 'undefined'
        ? URLToLink(version.Text)
        : 'There is no text or description of this version of the letter. However, the information about the source may be useful:'
    }

    // Create version header
    const versionHeader = [type];
    // If it is a text, and there is more than one version
    if (numberOfVersions > 1 && type === 'text') {
      versionHeader.push(
        <span className="metasuffix" key={number}> (version {number})</span>
      );
    }

    /**
     * Get and add meta information
     * Todo: add keys that make you look smart
     */

    const meta = [];

    if (version['Source name']) {
      meta.push(
        <p key="1">Source/owner: {version['Source name']}</p>
      );

      if(version['Item number in source']) {
        meta.push(
          <p key="2">Item number in source: {version['Item number in source']}</p>
        );
      }
    }

    meta.push(
      <p key="3">Last updated on <NiceDate date={updated} format={"compact"} /></p>
    );

    /**
     * Language(s)
     * Languages is an array, as a letter may contain passages in multiple
     * languages. There should be added a language attribute to the element
     * holding the letter content, as it is very often in a foreign language.
     * The first entry in the array will be used. That will be correct in most
     * cases.
     *
     * The language codes are in ISO 639-2 and must be replaced with ISO 639-1
     * values. The translation list in `ISOMap` contains the currently used
     * languages in the letter database (2 March, 2018).
     */

    const language = this.props.version.Languages[0];
    const ISOMap = {
      eng: 'en',
      dut: 'nl',
      fre: 'fr',
      spa: 'es',
      ger: 'de',
      ita: 'it',
      swe: 'sv',
      dan: 'da',
      hca: 'da' // proprietary lang value for Danish at Andersen's time
    };
    const replace = new RegExp(Object.keys(ISOMap).join('|'),'gi');
    const lang = language.replace(replace, (matched) => ISOMap[matched]);

    /**
     * Output
     */
    const letterClasses = `letter-version ${this.props.type}`;

    return(
      <div className={letterClasses}>
        <h3 className="version-header">{versionHeader}</h3>
        <div className="letter-text" lang={lang} dangerouslySetInnerHTML={{__html: content}} />
        <div className="letter-meta">{meta}</div>
      </div>
    );
  }
}

export default LetterVersion;