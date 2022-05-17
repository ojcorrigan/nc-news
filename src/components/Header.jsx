import { Link } from 'react-router-dom';
import '../styling/Header.css';

export const Header = ({ setUser, user, setErr }) => {
	return (
		<nav>
			<h1 className='headTitle'>Welcome to Northcoders News</h1>
			<div className='headerButtons'>
				<Link to='/' id='homeButtonLink'>
					<button
						className='headButton'
						id='home'
						onClick={() => {
							setErr(null);
						}}
					>
						Home
					</button>
				</Link>
				{!user.username && (
					<button
						className='headButton'
						id='add'
						onClick={() => {
							setUser({ username: 'cooljmessy', role: 'user' });
						}}
					>
						Login
					</button>
				)}
				{user.username && (
					<p id='loggedIn'>You're logged in as {user.username}</p>
				)}
			</div>
		</nav>
	);
};

export default Header;
