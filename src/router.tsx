import { createBrowserRouter } from 'react-router-dom';
import About from './routes/About/About.tsx';
import Forum from './routes/Forum/Forum.tsx';
import Contact from './routes/Contact/Contact.tsx';
import Admin from './routes/Admin/Admin.tsx';
import Register from './routes/Register/Register.tsx';
import Login from './routes/Login/Login.tsx';
import NotFound from './routes/NotFound/NotFound.tsx';
import PostDetails from './routes/PostDetails/PostDetails.tsx';
import TrendingPosts from './routes/TrendingPosts/TrendingPosts.tsx';
import UserProfile from './routes/UserProfile/UserProfile.tsx';
import SearchResults from './routes/SearchResults/SearchResults.tsx';
import App from './routes/App.tsx';
import News from './routes/News/News.tsx';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/news', element: <News /> },
			{ path: '/about', element: <About /> },
			{ path: '/forum', element: <Forum /> },
			{ path: '/contact', element: <Contact /> },
			{ path: '/admin', element: <Admin /> },
			{ path: '/register', element: <Register /> },
			{ path: '/login', element: <Login /> },
			{ path: '/not-found', element: <NotFound /> },
			{ path: '/trending', element: <TrendingPosts /> },
			{ path: '/post-details', element: <PostDetails /> },
			{ path: '/user-profile', element: <UserProfile /> },
			{ path: '/results', element: <SearchResults /> },
		],
	},
]);
