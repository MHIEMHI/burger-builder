import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import './Blog.css';
import axios from 'axios';

class Blog extends Component
{
	state = {
		posts: [],
		selectedPostId: null,
		error: false
	};

	postSelectedHandler = id =>
	{
		this.setState({ selectedPostId: id });
	};

	componentDidMount()
	{
		axios.get("/posts")
			.then(response =>
			{
				const posts = response.data.slice(0, 4);
				const updatedPosts = posts.map(post => ({ ...post, author: 'Max' }));
				this.setState({ posts: updatedPosts });
			})
			.catch(error =>
			{
				this.setState({ error: true });
			});
	}

	render()
	{
		let posts = <p style={{ textAlign: 'center' }}>Somthing went wrong !</p>;
		if (!this.state.error)
		{
			posts = this.state.posts.map(post => (
				<Post
					key={post.id}
					title={post.title}
					author={post.author}
					clicked={() => this.postSelectedHandler(post.id)}
				/>
			));
		}
		return (
			<div className="Blog">
				<header>
					<nav>
						<ul>
							<li><a href="/">Home</a></li>
							<li><a href="/new-post">New post</a></li>
						</ul>
					</nav>
				</header>
				<section className="Posts">
					{posts}
				</section>
			</div>
		);
	}
}

export default Blog;