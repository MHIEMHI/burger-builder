import React, { Component } from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";
import { Transition } from 'react-transition-group';

class App extends Component
{
	state = {
		modalIsOpen: false,
		showBlock: false
	};

	showModel = () =>
	{
		this.setState({ modalIsOpen: true });
	};

	closeModel = () =>
	{
		this.setState({ modalIsOpen: false });
	};

	toggleBlock = () =>
	{
		this.setState((prevState) => ({ showBlock: !prevState.showBlock }));

	};

	render()
	{
		return (
			<div className="App">
				<h1>React Animations</h1>
				<button className="Button" onClick={this.toggleBlock}>Toggle</button>
				<br />
				<Transition
					in={this.state.showBlock}
					timeout={1000}
					mountOnEnter
					unmountOnExit
				>
					{state => (
						<div style={{
							backgroundColor: 'red',
							width: 100,
							height: 100,
							margin: 'auto',
							transition: 'opacity 1s ease-out',
							opacity: state === 'exiting' ? 0 : 1
						}}>
						</div>)
					}
				</Transition>
				{this.state.modalIsOpen && <Modal show={this.state.modalIsOpen} closed={this.closeModel} />}
				{this.state.modalIsOpen && <Backdrop show={this.state.modalIsOpen} />}
				<button className="Button" onClick={this.showModel}>Open Modal</button>
				<h3>Animating Lists</h3>
				<List />
			</div >
		);
	}
}

export default App;
