import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../config/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';

interface AuthProps {
	children: React.ReactNode;
}

export default function Authenticated({ children }: AuthProps) {
	const location = useLocation();
	const [user, loading, error] = useAuthState(auth);
	if (loading) {
		return toast.success('Initializing user..');
	}
	if (error) {
		return toast.error('Something went wrong!');
	}
	if (user) {
		return children;
	} else {
		return <Navigate to="/login" state={{ from: location }} />;
	}
}
