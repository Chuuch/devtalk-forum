import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signInUser } from '../../services/auth/sign-in-user.service';
import { auth } from '../../config/firebase-config';
import toast from 'react-hot-toast';
import { emailPattern } from '../../constants/constants';
import { BsPersonLock } from 'react-icons/bs';

interface LoginProps {
	email: string;
	password: string;
}

const Login: React.FC = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginProps>();

	const onSubmit: SubmitHandler<LoginProps> = async ({ email, password }) => {
		try {
			const data = await signInUser(email, password);
			const currentUser = auth.currentUser;

			if (data?.user && currentUser?.emailVerified) {
				toast.success(`Welcome back ${auth.currentUser?.displayName}!`);
				navigate('/news');
			} else if (data?.user && !currentUser?.emailVerified) {
				toast.error('Please verify your email first!');
			} else {
				toast.error(data?.error as string);
			}
		} catch (error) {
			console.error('Login error:', error);
		}
	};
	return (
		<div className="flex flex-col h-fit items-center justify-center gap-y-24">
			<h1 className="text-5xl text-gray-400 font-light tracking-widest mt-24">
				WELCOME BACK
			</h1>
			<div className="flex flex-row gap-20 items-center justify-center">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col justify-center items-center gap-3"
				>
					<h1 className="text-2xl font-light text-gray-400">Sign In</h1>
					<input
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: emailPattern,
								message: 'Invalid email address',
							},
						})}
						type="email"
						placeholder="Email"
						className="rounded-xl p-1 bg-gray-700 w-64 px-2 outline-none border-none focus:outline-sky-500"
					/>
					{errors.email && (
						<div className="text-red-500">{errors.email.message}</div>
					)}
					<input
						{...register('password', {
							required: 'Password is required',
						})}
						type="password"
						placeholder="Password"
						className="rounded-xl p-1 bg-gray-700 w-64 px-2 outline-none border-none focus:outline-sky-500"
					/>
					<div className="text-xs hover:text-gray-400 hover:underline cursor-pointer mr-32">
						<p className="flex text-left">Forgotten password?</p>
					</div>
					{errors.password && (
						<div className="text-red-500">{errors.password.message}</div>
					)}
					<button
						onClick={() => onSubmit}
						className="bg-gradient-to-r from-sky-700 to-sky-500 rounded-xl w-full h-8 hover:from-sky-600 hover:to-sky-400"
						disabled={isSubmitting}
						type="submit"
					>
						{isSubmitting ? 'Loading...' : 'Submit'}
					</button>
					<p>
						Don't have an account?{' '}
						<Link to="/register" className="text-sky-500 hover:underline">
							Sign Up
						</Link>
					</p>
					{errors.root && (
						<div className="text-red-500">{errors.root.message}</div>
					)}
				</form>
				<BsPersonLock size={240} />
			</div>
		</div>
	);
};

export default Login;
