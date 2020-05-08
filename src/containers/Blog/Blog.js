import React, { Component } from 'react';
//import { Route, Switch, Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';

import './Blog.css';
//import Posts from '../Posts/Posts';
//import asyncComponent from '../../hoc/asyncComponent';
//import NewPost from '../Blog/NewPost/NewPost';

//const AsyncNewPost = asyncComponent(() => import('./NewPost/NewPost'));

class Blog extends Component
{

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
			</div>
		);
	}
}

export default Blog;