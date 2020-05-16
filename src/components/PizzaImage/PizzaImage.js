import React from 'react';

import classes from './PizzaImage.css';
import img from '../../assets/PizzaImage.jpg';

const PizzaImage = props =>
{
	return (
		<div className={classes.PizzaImage}>
			<img src={img} className={classes.PizzaImg} />
		</div>
	);
};

export default PizzaImage;