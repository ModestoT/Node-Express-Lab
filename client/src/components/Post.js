import React from 'react';

const Post = props => {
    return(
        <div className="post-wrapper">
            <h1>{props.post.title}</h1>
            <p>{props.post.contents}</p>
        </div>
    );
};

export default Post;