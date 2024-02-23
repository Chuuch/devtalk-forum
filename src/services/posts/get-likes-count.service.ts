import { getLikes } from './get-likes.service';

export const getLikesCount = async (postId: string) => {
	const likes = await getLikes(postId);
	return likes.length;
};
