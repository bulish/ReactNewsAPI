import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './styles.scss';

function App() {
	const [info, setInfo] = useState(null);
	const [input, setInput] = useState('');
	const container = useRef();
	const title = useRef();

	let country = 'cz';

	const inputFunction = e => {
		if (e.target.value === '') {
			country = 'cz';
		} else {
			country = e.target.value;
			setInput(e.target.value);
		}
	};

	useEffect(() => {
		if (!info) {
			const information = axios
				.get(
					`http://newsapi.org/v2/top-headlines?country=${country}&apiKey=7b47161240844861810e26b117137a19`,
				)
				.then(data => {
					setInfo(data.data);
					console.log(data.data);
					for (let i = 0; i < 16; i++) {
						container.current.innerHTML +=
							'<div className="card">' +
							'<h3>' +
							data.data.articles[i].title +
							'</h3>' +
							'<div className="description">' +
							data.data.articles[i].description +
							'</div>' +
							'<h6>' +
							data.data.articles[i].publishedAt.slice(0, 10) +
							' ' +
							data.data.articles[i].publishedAt.slice(11, 16) +
							'</h6>' +
							'</div>';
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
	});

	const searchFunction = () => {
		const information = axios
			.get(
				`http://newsapi.org/v2/top-headlines?country=${input}&apiKey=7b47161240844861810e26b117137a19`,
			)
			.then(data => {
				setInfo(data.data);
				container.current.innerHTML = '';
				let theCountry = '';
				switch (input) {
					case 'cz':
						theCountry = 'Czech Republic';
						break;
					case 'us':
						theCountry = 'USA';
						break;
					case 'gb':
						theCountry = 'Great Britain';
						break;
					case 'sk':
						theCountry = 'Slovakia';
						break;

					default:
						break;
				}
				title.current.innerHTML = 'News from ' + theCountry;
				for (let i = 0; i < 16; i++) {
					container.current.innerHTML +=
						'<div className="card">' +
						'<h3>' +
						data.data.articles[i].title +
						'</h3>' +
						'<div className="description">' +
						data.data.articles[i].description +
						'</div>' +
						'<h6>' +
						data.data.articles[i].publishedAt.slice(0, 10) +
						' ' +
						data.data.articles[i].publishedAt.slice(11, 16) +
						'</h6>' +
						'</div>';
				}
			});
	};

	return (
		<div>
			<div className="search">
				<select onChange={inputFunction}>
					<option value="cz">Czech Republic</option>
					<option value="us">USA</option>
					<option value="gb">Great Britain</option>
					<option value="sk">Slovakia</option>
				</select>
				<FontAwesomeIcon
					icon={faSearch}
					className="icon"
					onClick={searchFunction}
				/>
			</div>
			<div className="info">
				<div className="title" ref={title}>
					News from Czech Republic
				</div>
				<div className="line"></div>
				<div className="subtitle">Latest news</div>
				{info && <div className="container" ref={container}></div>}
			</div>
		</div>
	);
}

export default App;
