import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../config/firebase-config';

function App() {
	// const [user, loading, error] = useAuthState(auth);
	return (
		<div className="h-screen">
			<Navbar />
			<Outlet />
		</div>
	);
}

export default App;
