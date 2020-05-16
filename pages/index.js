import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

const IndexPage = () =>
{
	return (
		<div>
			<h1>The Main page</h1>
			<p>Go to : <Link href='/auth'><a>Auth</a></Link></p>
			<button onClick={() => Router.push('/auth')}>Go to Auth</button>
		</div>
	);
};

export default IndexPage;