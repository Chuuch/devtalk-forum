import { User, sendEmailVerification } from 'firebase/auth';
import toast from 'react-hot-toast';

export const verityUser = async (user: User) => {
	try {
		await sendEmailVerification(user);
		toast.success('Verification email sent!');
	} catch (error) {
		toast.error('Something went wrong! Please try again.');
	}
};
