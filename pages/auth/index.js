import React from 'react';
import User from '../../components/User';

const AuthIndexPage = () =>
{
	return (
		<div>
			<h1>The Auth index page</h1>
			<User name='MHI' age='28' />
		</div>
	);
};

export default AuthIndexPage;