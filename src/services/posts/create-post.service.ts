import { get, push, ref, update } from 'firebase/database';
import { auth, db } from '../../config/firebase-config';
import moment from 'moment-timezone';

export const createPost = async (
	title: string,
	content: string,
	category: string
) => {
	const userSnapshot = await get(ref(db, `users/${auth.currentUser?.uid}`));
	const username = userSnapshot.val().username;

	const post = {
		title,
		content,
		category: category,
		id: '',
		author: username,
		userID: auth.currentUser?.uid,
		likes: '',
		createdAt: moment().tz('Europe/Sofia').format('lll'),
		timestamp: Date.now(),
	};

	const { key } = push(ref(db, 'posts'), post);

	update(ref(db), {
		[`posts/${key}/id`]: key,
		[`posts/${key}/${category}`]: category,
		[`users/${username}/posts/${key}`]: true,
	});
	return key;
};
