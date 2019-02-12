import React from 'react';

import Post from './Post';

const PostList = props => {
    return (
        <div className="posts-list-wrapper">
            {props.posts.map(post => {
                return <Post post={post} key={post.id} />
            })}
        </div>
    );
};

export default PostList;