import { Link, useNavigate } from 'react-router-dom';
import { FaDev } from 'react-icons/fa';
import UserAvatar from '../UserAvatar/UserAvatar';
import Notifications from '../Notifications/Notifications';
import { auth } from '../../config/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import SearchBar from '../SearchBar/SearchBar';
import { signOutUser } from '../../services/auth/sign-out-user.service';

interface Props {}

const Navbar: React.FC<Props> = () => {
	const [user] = useAuthState(auth);
	const navigate = useNavigate();

	const handleSignOut = async () => {
		await signOutUser();
		navigate('/login');
	};

	return (
		<div className="flex justify-between p-3 bg-[#04102e] h-24">
			<div>
				<FaDev size={64} />
			</div>

			<div className="flex flex-row items-center justify-center gap-5 text-xl">
				{!user ? (
					<>
						<Link className="hover:text-gray-400" to="/news">
							News
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
					</>
				) : (
					<>
						<Link className="hover:text-gray-400" to="/news">
							News
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
					</>
				)}
			</div>
			<div className="flex items-center justify-center gap-x-2">
				{!user ? (
					<>
						<Link
							className="flex rounded-xl px-3 hover:bg-gradient-to-r border border-sky-500
						hover:from-sky-600 hover:to-sky-400"
							to="/register"
						>
							Sign Up
						</Link>
						<Link
							className="flex rounded-xl px-3 hover:bg-gradient-to-r border border-sky-500
						hover:from-sky-600 hover:to-sky-400"
							to="/login"
						>
							Sign In
						</Link>
					</>
				) : (
					<>
						<SearchBar />
						<Notifications />
						<Link to="/user-profile">
							<UserAvatar uid={auth.currentUser?.uid} />
						</Link>
						<button
							onClick={() => handleSignOut()}
							className="flex flex-col items-center justify-center rounded-xl
							bg-transparent border border-sky-500 hover:bg-gradient-to-r hover:from-sky-600 hover:to-sky-400 px-3"
						>
							Sign out
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default Navbar;
