import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import toast from 'react-hot-toast';


export const signOutUser = async () => {

	try {
		localStorage.removeItem('email');
		await signOut(auth);
		toast.success('You are logged out!');
		return true;
	} catch (error) {
		toast.error('Something went wrong. Please try again.');
		return false;
	}
};
