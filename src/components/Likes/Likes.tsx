import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { likePost } from '../../services/posts/like-post.service';
import { dislikePost } from '../../services/posts/dislike-post.service';
import { getLikes } from '../../services/posts/get-likes.service';
import toast from 'react-hot-toast';

interface LikesProps {
	postId: string;
	username: string;
}

export const Likes = ({ postId, username }: LikesProps) => {
	const [likes, setLikes] = useState<number>(0);
	const [isLiked, setIsliked] = useState<boolean>(false);

	useEffect(() => {
		const fetchLikes = async () => {
			try {
				const likesData = await getLikes(postId);
				setLikes(likesData.length);
				setIsliked(likesData.some((like) => like.username === username));
			} catch (error) {
				console.error('Error fetching likes:', error);
			}
		};
		fetchLikes();
	}, [postId, username]);

	const handleLikeClick = async () => {
		try {
			if (isLiked) {
				await dislikePost(postId);
				setLikes((prevLikes) => prevLikes - 1);
				toast.success('Disliked!');
			} else {
				await likePost(postId);
				setLikes((prevLikes) => prevLikes + 1);
				toast.success('Post liked!');
			}
			setIsliked(!isLiked);
		} catch (error) {
			console.error('Error handling like:', error);
		}
	};

	return (
		<div className="inline-flex pl-2 space-x-1">
			{isLiked ? (
				<AiFillHeart
					size={30}
					onClick={handleLikeClick}
					className="cursor-pointer fill-sky-500"
				/>
			) : (
				<AiOutlineHeart
					size={30}
					onClick={handleLikeClick}
					className="cursor-pointer fill-sky-500"
				/>
			)}
			<span className="text-sky-500 text-sm mt-1.5">{likes}</span>
		</div>
	);
};
