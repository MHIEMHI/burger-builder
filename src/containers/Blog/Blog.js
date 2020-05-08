import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';

import './Blog.css';
import Posts from '../Posts/Posts';
import NewPost from '../Blog/NewPost/NewPost';

class Blog extends Component
{
	state = {
		auth: false
	};

	render()
	{
		return (
			<div className="Blog">
				<header>
					<nav>
						<ul>
							<li><NavLink
								activeClassName="my-active"
								to="/posts"
								activeStyle={{
									color: "#FA923F",
									textDecoration: "underline"
								}}
								exact
							>
								Posts
							</NavLink></li>
							<li><NavLink to={{
								pathname: "/new-post",
								hash: "#submit",
								search: "?quick-submit=true"
							}}>New post</NavLink></li>
						</ul>
					</nav>
				</header>
				<Switch>
					{this.state.auth && <Route path="/new-post" component={NewPost} />}
					<Route path="/posts" component={Posts} />
					{/* <Redirect from="/" to="/posts" /> */}
					<Route render={() => <h1>Not found</h1>} />
					{/* <Route path="/" component={Posts} /> */}
				</Switch>
			</div>
		);
	}
}

export default Blog;