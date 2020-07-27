import React, { Component } from "react";
// import axios from 'axios';
// import axios from '../../axios'
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import "./Blog.css";
import Posts from "./Posts/Posts";
import asyncComponent from "../../hoc/asyncComponent";
//  import NewPost from './NewPost/NewPost';
const AsyncNewPost = asyncComponent(() => {
  return import("./NewPost/NewPost");
});

class Blog extends Component {
  state = {
    auth: true,
  };

  shouldComponentUpdate() {
    console.log("shouldcomponentupdate");
    return true;
  }

  render() {
    console.log("render");

    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts/"
                  exact
                  activeClassName="active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline",
                  }}
                >
                  Post
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true",
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={()=>(<h1>Home</h1>)}/>
                <Route path="/"  render={()=>(<h2>Home2</h2>)}/> */}
        <Switch>
          {this.state.auth ? (
            <Route path="/new-post" exact component={AsyncNewPost} />
          ) : null}
          <Route path="/posts" component={Posts} />
          <Route render={() => <h1>NOT FOUND</h1>} />
          {/* // <Redirect from="/" to="/posts" /> */}
          {/* <Route path="/"  component={Posts}/> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
