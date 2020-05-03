import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component
{
	shouldComponentUpdate(nextProps)
	{
		return nextProps.show !== this.props.show;
	}

	componentWillUpdate()
	{
		console.log("Modal Will Update");
	}

	render()
	{
		return (
			<Aux>
				<Backdrop show={this.props.show} clicked={this.props.modelClosed} />
				<div
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100VH)',
						opacity: this.props.show ? '1' : '0'
					}}
					className={classes.Modal}
				>
					{this.props.children}
				</div>
			</Aux>
		);
	}
}

Modal.propTypes =
{
	show: PropTypes.bool.isRequired,
	modelClosed: PropTypes.func
};

export default Modal;
