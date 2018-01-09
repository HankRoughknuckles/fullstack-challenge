import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../actions/index.js';
import './ComicDetail.css';

export class ComicDetail extends Component {
  render() {
    if(this.props.comicData === null) { return null }

    return (
      <div>
        <div className='backdrop' onClick={this.closeDetailsModal.bind(this)}></div>
        <div className='modal'>
          { this.renderCloseButton() }
          { this.renderTitle() }
          { this.renderCoverImage() }
          <div className="body">
            { this.renderIssueNumber() }
            { this.renderDescription() }
            { this.renderVariantDescription() }
            { this.renderIsbn() }
            { this.renderCreators() }
            { this.renderCharacters() }
          </div>
        </div>
      </div>
    )
  }

  renderTitle() {
    return (
      <div className='title'>{this.props.comicData.title}</div>
    )
  }

  renderCoverImage() {
    return (
      <img className='cover-image' alt={ this.props.comicData.title } src={ this.coverImage.call(this) } />
    )
  }

  renderCloseButton() {
    return (
      <span className='close-modal' onClick={this.closeDetailsModal.bind(this)}>X</span>
    )
  }

  renderIssueNumber() {
    if(this.props.comicData.issueNumber === ''){ return null; }

    return (
      <p className='issueNumber'>Issue #{this.props.comicData.issueNumber}</p>
    )
  }

  renderDescription() {
    return (
      <p className='description' dangerouslySetInnerHTML={{__html: this.props.comicData.description}}></p>
    )
  }

  renderVariantDescription() {
    if(this.props.comicData.variantDescription === ''){ return null; }

    return (
      <p className='variant-description'>
        Variant Description: {this.props.comicData.variantDescription}
      </p>
    )
  }

  renderIsbn() {
    if(this.props.comicData.isbn === ''){ return null; }

    return (
      <p className='isbn'>ISBN: {this.props.comicData.isbn}</p>
    )
  }

  renderCharacters() {
    if(this.props.comicData.characters.items.length === 0){ return null; }

    // TODO: check that this schema is correct
    let characterNames = this.props.comicData.characters.items.map(character => character.name)
    let text = characterNames.join(', ');
    return (
      <p className='characters'>Characters: { text }</p>
    )
  }

  renderCreators() {
    if(this.props.comicData.creators.items.length === 0){ return null; }

    let creatorNames = this.props.comicData.creators.items.map(creator => creator.name)
    let text = creatorNames.join(', ');
    return (
      <p className='creators'>Creators: { text }</p>
    )
  }


  coverImage() {
    if(this.props.comicData.images.length === 0){
      return 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_fantastic.jpg';
    }

    let image = this.props.comicData.images[0]
    return `${image.path}.${image.extension}`;
  }

  closeDetailsModal() {
    this.props.setDetailsModalData(null);
  }
}

function mapStateToProps(state) {
  return {
    comicData: state.details_modal_data
  };
 }

export default connect(mapStateToProps, actions)(ComicDetail)
