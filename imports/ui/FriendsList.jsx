import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'
import { Profiles } from '../api/users/users'
import Avatar from './Avatar'


class FriendsList extends Component {
    friends () {
        if (this.props.friends) {
            let userProfile = 'profile/';
        return this.props.friends.map(friend => (
            userProfile = 'profile/' + friend.user,
            <Link to={userProfile}><Avatar key={friend.user} username={friend.user} /></Link>
        ));
        } else {
            return <div>no friends yet</div>
        }
    }
    
    render () {
        return (
            <div>
                <div className="h2">Your Friends</div>
                {this.friends()}
            </div>
        )
    }
}

FriendsList.propTypes = {
  friends: PropTypes.array,
};

export default createContainer(() => {
    let username = Meteor.user().username;
    return {
        friends: Profiles.findOne({username: username}, {fields: {'friends': 1}}).friends
    };
}, FriendsList);