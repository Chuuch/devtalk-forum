import { get, ref, update } from 'firebase/database';
import { getUsername } from '../users/user.services';
import { auth, db } from '../../config/firebase-config';

interface Like {
	author: string;
}

interface Post {
	userID: string;
}

export const dislikePost = async (postId: string): Promise<void> => {
	const username = getUsername();

	const likesRef = ref(db, `posts/${postId}/likes`);
	const likedSnapshot = await get(likesRef);

	const likeKey = Object.keys(
		likedSnapshot.val() as { [key: string]: Like }
	).find((key) => likedSnapshot.val()[key].author === username);

	if (likeKey) {
		const updateLikes: { [key: string]: null } = {};
		updateLikes[`posts/${postId}/likes/${likeKey}`] = null;
		updateLikes[`users/${auth.currentUser?.uid}/likes/${postId}/${likeKey}`] =
			null;

		const postSnapshot = await get(ref(db, `posts/${postId}`));
		const authorId = postSnapshot.val() as Post['userID'];
		const notificationRef = ref(db, `notifications/${authorId}/${likeKey}`);
		if ((await get(notificationRef)).exists()) {
			updateLikes[`notifications/${authorId}/${likeKey}`] = null;
		}

		return update(ref(db), updateLikes);
	}
};
