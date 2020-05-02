import React from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => (
	<Aux>
		<Backdrop show={props.show} clicked={props.modelClosed} />
		<div
			style={{
				transform: props.show ? 'translateY(0)' : 'translateY(-100VH)',
				opacity: props.show ? '1' : '0'
			}}
			className={classes.Modal}
		>
			{props.children}
		</div>
	</Aux>
);

export default Modal;
