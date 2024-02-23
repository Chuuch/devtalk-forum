import UserAvatar from '../UserAvatar/UserAvatar';
import { auth } from '../../config/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Likes } from '../Likes/Likes';
import { Link } from 'react-router-dom';

interface PostProps {}

const SinglePost: React.FC<PostProps> = () => {
	const [user] = useAuthState(auth);
	return (
		<article className="flex flex-col border border-gray-700 bg-gray-800 rounded-lg w-[540px] h-[240px] shadow-md">
			<div>
				<p className="text-xl text-gray-300 mt-2 pl-2">
					<strong>Post Name</strong>
				</p>
				<p className="text-xs tracking-normal px-3">at: 21:23 22.02.2024</p>
			</div>
			<div>
				<p className="flex mt-8 pl-2 text-lg tracking-normal">Post Content</p>
			</div>
			<div className="flex flex-col items-start relative mt-8">
				<div className="flex flex-col pl-2">
					<Link to="">
						<UserAvatar uid={auth.currentUser?.uid} />
					</Link>
					<p className=" text-xs tracking-normal">posted by: author</p>
				</div>
				<div className="flex flex-row items-center z-10">
					<div className="inline-flex items-center z-10 relative">
						{user && <Likes postId="" username="" />}
						<div>
							<button
								className="absolute flex items-center justify-center -right-96 mr-2 bottom-1 text-base bg-transparent
							  hover:from-sky-600 hover:to-sky-400 rounded-xl px-3 py- text-white
							   hover:bg-gradient-to-r border border-sky-500"
							>
								Reply
							</button>
							<button
								className="absolute flex items-center justify-center -right-[460px] mr-2 bottom-1 text-base bg-transparent 
							  hover:from-sky-600 hover:to-sky-400 rounded-xl px-3 py- text-white
							   hover:bg-gradient-to-r border border-sky-500"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
};

export default SinglePost;
