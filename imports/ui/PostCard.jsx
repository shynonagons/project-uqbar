import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class PostCard extends Component {
    render () {
        let image = 'url(' + this.props.image + ')';
        return (
            <div className="flex-row">
    <div className="story">
     <Link className="story-card" to={this.props.slug}>
  <div className='story-header'>
    <div className="story-img" style={{backgroundImage: image}}></div>
    <div className="story-title">
      {this.props.title}
      <div className="story-author">by: {this.props.author}</div>
    </div>
    
    </div>
       
    <div className="story-preview">
      {this.props.preview}
       <div className="story-faves">
      <img src="/star.svg" /> {this.props.faves}
      </div>
      </div>
      
    </Link>
    </div>
  </div>
        )
    }
}

PostCard.propTypes = {
    title: PropTypes.string.isRequired
};