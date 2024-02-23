import { get, push, ref, update } from 'firebase/database';
import { getUsername } from '../users/user.services';
import { auth, db } from '../../config/firebase-config';
import moment from 'moment';

export const likePost = async (postId: string) => {
	const username = await getUsername();
	const like = {
		author: username,
	};

	const likesRef = ref(db, `posts/${postId}/likes`);
	const { key } = await push(likesRef, like);

	const postSnapshot = await get(ref(db, `posts/${postId}`));
	const authorId = postSnapshot.val().userID;

	const notification = {
		type: 'like',
		postId: postId,
		author: username,
		likedAt: moment().tz('Europe/Sofia').format('lll'),
		userID: auth.currentUser?.uid,
		authorId: authorId,
	};

	update(ref(db), {
		[`users/${auth.currentUser?.uid}/likes/${postId}/${key}`]: true,
		[`notifications/${authorId}/${key}`]: notification,
		[`posts/${postId}/likes/${key}/id`]: key,
	});
};
