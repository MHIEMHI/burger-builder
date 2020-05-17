import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props =>
{
	const [filter, setFilter] = useState('');
	const filterRef = useRef();
	const { setIngredients } = props;

	useEffect(() =>
	{
		const timer = setTimeout(() =>
		{
			if (filter === filterRef.current.value)
			{
				const query = filter ? `?orderBy="title"&equalTo="${filter}"` : '';
				fetch(`${process.env.REACT_APP_BASE_URL}/ingredients.json${query}`)
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
			}
		}, 500);

		return () =>
		{
			clearTimeout(timer);
		};
	}, [filter, setIngredients, filterRef]);

	return (
		<section className="search">
			<Card>
				<div className="search-input">
					<label>Filter by Title</label>
					<input ref={filterRef} type="text" value={filter} onChange={e => setFilter(e.target.value)} />
				</div>
			</Card>
		</section>
	);
});

export default Search;
