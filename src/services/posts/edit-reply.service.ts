import { get, ref, update } from 'firebase/database';
import { auth, db } from '../../config/firebase-config';
import moment from 'moment-timezone';

export const editReply = async (
	postId: string,
	replyId: string,
	replyContent: string
) => {
	const replyRef = ref(db, `posts/${postId}/replies/${replyId}`);
	const replySnapshot = await get(replyRef);
	const reply = replySnapshot.val();
	const currentUserID = auth.currentUser?.uid;

	if (reply && reply.userID === currentUserID) {
		return update(replyRef, {
			replyContent: replyContent,
			editedOn: moment().tz('Europe/Sofia').format('lll'),
		});
	} else {
		console.error('You are not authorized to edit this post.');
	}
};
