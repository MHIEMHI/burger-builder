import React from 'react';

import burgerLogo from '../../../src/assets/images/burger-logo.png';
import classes from './Logo.module.css';

export const Logo = props => (
	<div className={classes.Logo}>
		<img src={burgerLogo} alt="MyBurger" />
	</div>
);

export default Logo;