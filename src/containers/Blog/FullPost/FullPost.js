import React, { Component } from "react";
import axios from "axios";
import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };
  shouldComponentUpdate(nextprops, nextstate) {
    console.log("should component update");
    console.log(this.props);
    console.log(this.state.loadedPost);

    return true;
  }
  componentDidMount() {
    console.log("component did mount");
    this.loadData();
  }

  componentDidUpdate() {
    console.log("componentdidUpdate");
    this.loadData();
  }

  loadData() {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost &&
          this.state.loadedPost.id !== +this.props.match.params.id)
      ) {
        axios.get("/posts/" + this.props.match.params.id).then((response) => {
          this.setState({
            loadedPost: response.data,
          });
          console.log("response=>" + response);
          console.log(this.state.loadedPost);
        });
      }
    }
  }

  deletePostHandler = () => {
    axios
      .delete("/posts/" + this.props.match.params.id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log("render");
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.match.params.id) {
      post = <p style={{ textAlign: "center" }}>Loading...!</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
