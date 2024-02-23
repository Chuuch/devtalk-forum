import { get, ref, update } from 'firebase/database';
import { auth, db } from '../../config/firebase-config';

export const deleteReply = async (postId: string, replyId: string) => {
	const replyRef = ref(db, `posts/${postId}/replies/${replyId}`);

	try {
		const replySnapshot = await get(replyRef);
		const reply = replySnapshot.val();
		const currentUserID = auth.currentUser?.uid;
		const isAdmin = true;

		if (reply && (reply.userID === currentUserID || isAdmin)) {
			return update(ref(db), {
				[`posts/${postId}/replies/${replyId}`]: null,
			});
		} else {
			console.log('You are not authorized to delete this reply.');
		}
	} catch (error) {
		console.error('Error deleting reply:', error);
	}
};
