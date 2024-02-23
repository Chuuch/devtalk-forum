import { get, ref, DataSnapshot } from 'firebase/database';
import { db } from '../../config/firebase-config';

interface Reply {
	postId: string;
}

export const getReplies = async (postId: string): Promise<Reply[]> => {
	try {
		const postRepliesRef = ref(db, `posts/${postId}/replies`);
		const snapshot: DataSnapshot = await get(postRepliesRef);

		if (snapshot.exists()) {
			return Object.values(snapshot.val() as { [key: string]: Reply }).map(
				(reply) => reply
			);
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error fetching replies:', error);
		throw error;
	}
};
