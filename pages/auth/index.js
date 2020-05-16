import React from 'react';
import User from '../../components/User';

const AuthIndexPage = props =>
{
	return (
		<div>
			<h1>The Auth index page {props.appName}</h1>
			<User name='MHI' age='28' />
		</div>
	);
};

AuthIndexPage.getInitialProps = (context) =>
{
	const promise = new Promise((resolve, reject) =>
	{
		setTimeout(() =>
		{
			resolve({ appName: 'Auth Next js App' });
		}, 1000);
	});
	return promise;
};
export default AuthIndexPage;