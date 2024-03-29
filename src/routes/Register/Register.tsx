import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SiHellofresh } from 'react-icons/si';
import { registerUser } from '../../services/auth/register-user.service';
import { Link, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { auth } from '../../config/firebase-config';

const schema = z.object({
	firstName: z.string().min(4),
	lastName: z.string().min(4),
	username: z.string().min(4),
	email: z.string().email(),
	password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const Register = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<FormFields>({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			username: '',
			password: '',
		},
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			const { firstName, lastName, username, email, password } = data;
			await registerUser(firstName, lastName, username, email, password);
			reset();
			navigate('/');
			// toast.success(`You are logged in as ${auth.currentUser?.displayName}`);
			console.log(data);
		} catch (error) {
			console.error('Registration error:', error);
			setError('root', {
				message: 'This email has already been taken',
			}),
				setError('password', {
					message: 'Password must be at least 8 characters long.',
				}),
				setError('firstName', {
					message: 'First name must have more than 4 characters',
				}),
				setError('lastName', {
					message: 'Last name must have more than 4 characters',
				});
			setError('username', {
				message: 'Username must have more than 4 characters',
			});
		}
	};

	return (
		<div className="flex flex-col h-fit items-center justify-center gap-y-24">
			<div className="flex flex-col mt-24">
				<h1 className="text-5xl text-gray-400 font-light tracking-widest">
					JOIN THE COMMUNITY
				</h1>
			</div>
			<div className="flex flex-row gap-40 items-center justify-center">
				<form
					className="flex flex-col justify-center items-center gap-3"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1 className="text-2xl font-light text-gray-400">Sign Up</h1>
					<input
						{...register('firstName')}
						type="text"
						placeholder="First Name"
						className="rounded-xl p-1 bg-gray-700 w-64 px-2 outline-none border-none focus:outline-sky-500"
					/>
					{errors.firstName && (
						<div className="text-red-500">{errors.firstName.message}</div>
					)}
					<input
						{...register('lastName')}
						type="text"
						placeholder="Last Name"
						className="rounded-xl p-1 bg-gray-700 w-64 px-2 outline-none border-none focus:outline-sky-500"
					/>
					{errors.firstName && (
						<div className="text-red-500">{errors.firstName.message}</div>
					)}
					<input
						{...register('username')}
						type="text"
						placeholder="Username"
						className="rounded-xl p-1 bg-gray-700 w-64 px-2 outline-none border-none focus:outline-sky-500"
					/>
					{errors.username && (
						<div className="text-red-500">{errors.username.message}</div>
					)}
					<input
						{...register('email')}
						type="text"
						placeholder="Email"
						className="rounded-xl p-1 bg-gray-700 w-64 px-2 outline-none border-none focus:outline-sky-500"
					/>
					{errors.email && (
						<div className="text-red-500">{errors.email.message}</div>
					)}
					<input
						{...register('password')}
						type="password"
						placeholder="Password"
						className="rounded-xl p-1 bg-gray-700 w-64 px-2 outline-none border-none focus:outline-sky-500"
					/>
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
						Already have an account?{' '}
						<Link to="/login" className="text-sky-500 hover:underline">
							Sign In
						</Link>
					</p>
					{errors.root && (
						<div className="text-red-500">{errors.root.message}</div>
					)}
				</form>
				<SiHellofresh size={250} />
			</div>
		</div>
	);
};

export default Register;
