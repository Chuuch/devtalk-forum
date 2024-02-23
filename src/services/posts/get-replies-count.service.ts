import { getReplies } from './get-replies.service';

export const getRepliesCount = async (postId: string) => {
	const replies = await getReplies(postId);
	return replies.length;
};
