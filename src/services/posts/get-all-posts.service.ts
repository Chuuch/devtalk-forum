import { get, ref } from 'firebase/database';
import { db } from '../../config/firebase-config';

export const getAllPosts = async () => {
	const snapshot = await get(ref(db, 'posts'));

	if (!snapshot.exists()) {
		return [];
	}

	return Object.keys(snapshot.val()).map((key) => ({
		...snapshot.val()[key],
		id: key,
	}));
};
