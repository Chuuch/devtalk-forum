import { signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from '../../config/firebase-config';

export const signInUser = async (email: string, password: string) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		return { user: user?.uid };
	} catch (error) {
		if (error instanceof Error) {
			const errorMessage = error.message;
			if (errorMessage.includes('auth/invalid-login-credentials')) {
				toast.error('Invalid credentials');
			} else {
				toast.error('Something went wrong. Please try again.');
			}
			return { error: error.message };
		}
	}
};
