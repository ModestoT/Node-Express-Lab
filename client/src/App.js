import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import PostList from './components/PostList';

class App extends Component {
  state = {
    posts: []
  };

  componentDidMount(){
    axios
      .get('http://localhost:4000/api/posts')
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <PostList posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
