import { get, ref } from 'firebase/database';
import { db } from '../../config/firebase-config';

export const getPostByCategory = async (postId: string, category: string) => {
	const snapshot = await get(ref(db, `posts/${postId}/${category}`));
	return snapshot.val();
};
