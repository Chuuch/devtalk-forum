import { get, ref, update } from 'firebase/database';
import { auth, db } from '../../config/firebase-config';
import toast from 'react-hot-toast';

export const deletePost = async (postId: string, categoryId: string) => {
	const postRef = ref(db, `posts/${postId}`);

	try {
		const postSnapshot = await get(postRef);
		const post = postSnapshot.val();
		const currentUserID = auth.currentUser?.uid;
		const isAdmin = true;

		if (post && (post.userID === currentUserID || isAdmin)) {
			return update(ref(db), {
				[`posts/${postId}`]: null,
				[`category/${categoryId}/posts/${postId}`]: null,
			});
		} else {
			toast.error('You are not authorized to delete this post');
		}
	} catch (error) {
		console.error('Error deleting post:', error);
	}
};
