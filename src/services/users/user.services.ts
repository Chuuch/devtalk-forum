import { get, ref, set } from 'firebase/database';
import { auth, db } from '../../config/firebase-config';

export const updateUserPhoto = async (uid: string, avatarURL: string) => {
	try {
		const userRef = ref(db, `/users/${uid}`);
		await set(userRef, {
			uid,
			avatarURL,
		});
		return true;
	} catch (error) {
		return false;
	}
};

export const updateUserEmail = async (uid: string, email: string) => {
	try {
		const userRef = ref(db, `users/${uid}`);
		await set(userRef, {
			uid,
			email,
		});
		return true;
	} catch (error) {
		return false;
	}
};

export const getUsername = async () => {
	const userSnapshot = await get(ref(db, `users/${auth.currentUser?.uid}`));
	const username = userSnapshot.val().username;
	return username;
};
