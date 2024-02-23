import { get, ref } from 'firebase/database';
import { db } from '../../config/firebase-config';

export const getPostById = async (postId: string) => {
	const snapshot = await get(ref(db, `posts/${postId}`));
	return snapshot.val();
};
