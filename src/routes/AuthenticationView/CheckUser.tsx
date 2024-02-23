import { User } from 'firebase/auth';
import toast from 'react-hot-toast';

export default function checkUser(
	user: User,
	loading: boolean,
	error: string | undefined
) {
	if (loading) {
		toast.success('Initializing user..');
		return undefined;
	}

	if (error) {
		toast.error('Something went wrong!');
		return undefined;
	}

	if (user) {
		return user.uid;
	}
}
