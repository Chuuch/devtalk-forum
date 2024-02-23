import { get, ref } from 'firebase/database';
import { db } from '../../config/firebase-config';

export const getLikes = async (postId: string) => {
	const snapshot = await get(ref(db, `posts/${postId}/likes`));

	if (!snapshot.exists()) {
		return [];
	}

	return Object.keys(snapshot.val()).map((key) => ({
		...snapshot.val()[key],
		id: key,
	}));
};
