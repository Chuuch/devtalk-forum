import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth, db } from '../../config/firebase-config';
import { ref, set } from 'firebase/database';
import { verityUser } from './verify-user.service';

export const registerUser = async (
	firstName: string,
	lastName: string,
	username: string,
	email: string,
	password: string
) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		const displayName = `${username}`;
		await updateProfile(user, { displayName });

		set(ref(db, `users/${user?.uid}`), {
			uid: user?.uid,
			firstName,
			lastName,
			username,
			email,
			likedPosts: {},
			createdOn: Date.now(),
		});
		await verityUser(user);
		return { user: user?.uid };
	} catch (error) {
		if (error instanceof Error) {
			const errorMessage = error.message;
			if (errorMessage.includes('email-already-in-use')) {
				toast.error('This email is already taken.');
			} else {
				toast.error('Something went wrong. Please try again.');
			}
			return { error: error.message };
		}
	}
};
