import moment from 'moment-timezone';
import { auth, db } from '../../config/firebase-config';
import { getUsername } from '../users/user.services';
import { get, push, ref, update } from 'firebase/database';

export const replyPost = async (postId: string, replyContent: string) => {
	const username = getUsername();
	const reply = {
		content: replyContent,
		author: username,
		userID: auth.currentUser?.uid,
		repliedAt: moment().tz('Europe/Sofia').format('lll'),
	};

	const postRepliesRef = ref(db, `posts/${postId}/replies`);
	const { key } = await push(postRepliesRef, reply);

	const postSnapshot = await get(ref(db, `posts/${postId}`));
	const authorId = postSnapshot.val().userID;

	const notification = {
		type: 'reply',
		postId: postId,
		author: username,
		replyContent: replyContent,
		repliedAt: moment().tz('Europe/Sofia').format('lll'),
		authorId: authorId,
	};

	update(ref(db), {
		[`notifications/${authorId}/${key}`]: notification,
		[`users/${auth.currentUser?.uid}/replies/${postId}/${key}`]: true,
		[`posts/${postId}/replies/${key}/id`]: key,
	});
};
