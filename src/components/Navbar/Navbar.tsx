import { Link } from 'react-router-dom';
import { FaDev } from 'react-icons/fa';
import UserAvatar from '../UserAvatar/UserAvatar';

interface Props {}

const Navbar: React.FC<Props> = () => {
	return (
		<div className="flex justify-between p-3 bg-[#04102e] h-24">
			<FaDev size={64} />
			<div className="flex flex-row items-center justify-center gap-5 text-xl">
				<Link className="hover:text-gray-400" to="/">
					Home
				</Link>
				<Link className="hover:text-gray-400" to="/trending">
					Trending
				</Link>
				<Link className="hover:text-gray-400" to="/forum">
					Forum
				</Link>
				<Link className="hover:text-gray-400" to="/about">
					About
				</Link>
				<Link className="hover:text-gray-400" to="/contact">
					Contact
				</Link>
				<Link className="hover:text-gray-400" to="/admin">
					Admin
				</Link>
				<Link className="hover:text-gray-400" to="/register">
					Register
				</Link>
				<Link className="hover:text-gray-400" to="/login">
					Login
				</Link>
			</div>
			<div className="flex p-3 items-center">
				<Link to="/user-profile">
					<UserAvatar />
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
