import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props =>
{
	const [filter, setFilter] = useState('');

	const { setIngredients } = props;
	useEffect(() =>
	{
		const query = filter ? `?orderBy="title"&equalTo="${filter}"` : '';
		fetch(process.env.REACT_APP_BASE_URL + 'ingredients.json' + query)
			.then(response => response.json())
			.then(responseData =>
			{
				const loadedIngredients = [];
				for (const key in responseData)
				{
					loadedIngredients.push({ id: key, ...responseData[key] });
				}
				setIngredients(loadedIngredients);
			});
	}, [filter, setIngredients]);

	return (
		<section className="search">
			<Card>
				<div className="search-input">
					<label>Filter by Title</label>
					<input type="text" value={filter} onChange={e => setFilter(e.target.value)} />
				</div>
			</Card>
		</section>
	);
});

export default Search;
