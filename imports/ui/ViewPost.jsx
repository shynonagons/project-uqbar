import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import  { Editor, EditorState, convertFromRaw } from 'draft-js'
import { Posts } from '../api/posts/posts.js'

class ViewPost extends Component {
    constructor (props) {
        super(props);  
        let body = convertFromRaw(JSON.parse(this.props.current.body));
        this.state = {
            editorState: EditorState.createWithContent(body)
        }
        this.fave = () => { 
            Meteor.call('updatePost', this.state.id, {$inc: {faves: 1}});
        }
    }
    
    componentWillMount () {
        if (this.props.current) {
            this.setState({
                id: this.props.current._id
            })
        }
    }
    
    render () {
      const {editorState} = this.state;
        return (
            <div className="flex-row view-post">
                <div className="h2">{this.props.current.title}</div>
                <p>by: {this.props.current.author}</p>
                <Editor editorState={editorState} readOnly='true' />
                <button className="fave" onClick={this.fave}>Favorite</button>
            </div>
        )
    }
}



ViewPost.PropTypes = {
    current: PropTypes.object.isRequired
};

export default createContainer(({params}) => {
    return {
        current: Posts.findOne({slug: params.username + '/' + params.slug})
    };
}, ViewPost);