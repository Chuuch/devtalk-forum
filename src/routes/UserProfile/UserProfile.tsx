import React, { useState, useEffect } from 'react';
import { TfiUser } from 'react-icons/tfi';
import {
	EmailAuthProvider,
	User,
	reauthenticateWithCredential,
	updateEmail,
	updatePassword,
} from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from '../../config/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { IoMdCloudUpload } from 'react-icons/io';
import { SiMonkeytie } from 'react-icons/si';
import {
	updateUserEmail,
	updateUserPhoto,
} from '../../services/users/user.services';
import { RxAvatar } from 'react-icons/rx';

const UserProfile = () => {
	const [uploadImage, setUploadImage] = useState<string | File>('');
	const [errorMessage, setErrorMessage] = useState<string>('');

	const [user] = useAuthState(auth);
	const [avatarURL, setAvatarURL] = useState<string>();
	const [previewImage, setPreviewImage] = useState<string>('');
	const [email, setEmail] = useState<string>(user?.email as string);
	const [currentPassword, setCurrentPassword] = useState<string>('');
	const [newPassword, setNewPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');

	useEffect(() => {
		uploadImage && console.log(uploadImage);
		console.log(user);
	}, [uploadImage, user]);

	useEffect(() => {
		if (user) {
			const imageRef = ref(storage, `images/${user.uid}`);
			getDownloadURL(imageRef)
				.then((url) => setAvatarURL(url))
				.catch((error) => console.error('Error getting avatar URL:', error));
		}
	}, [user]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			if (!selectedFile.type.startsWith('image/')) {
				setErrorMessage('Please select a valid image file.');
				return;
			}
			if (selectedFile.size > 1024 * 1024 * 5) {
				setErrorMessage('File size exceeds limit (5MB).');
				return;
			}

			setUploadImage(selectedFile as File);
			setPreviewImage(URL.createObjectURL(selectedFile as File));
			setErrorMessage('');
		} else {
			setUploadImage('');
			setPreviewImage('');
			setErrorMessage('Please select an image to upload');
			return;
		}
	};

	const handleUpdateEmail = async () => {
		try {
			await updateEmail(user as User, email as string);
			toast.success('Email updated successfully!');
		} catch (error) {
			toast.error('Something went wrong! Please try again.');
		}
	};

	const handleUpdatePassword = async () => {
		try {
			await updatePassword(user as User, newPassword as string);
			toast.success('Password updated successfully!');
		} catch (error) {
			if (error instanceof Error)
				toast.error('Error updating password. Please try again');
			console.log('Error updating password:', error);
		}
	};

	const uploadFile = async (): Promise<void | Error> => {
		if (!uploadImage) {
			toast.error('Please select a file to upload.');
			return;
		}

		if (uploadImage.size > 1024 * 1024 * 5) {
			toast.error('File size should be less than 5MB');
			return;
		} else if (
			uploadImage?.type !== 'image/jpeg' &&
			uploadImage?.type !== 'image/png'
		) {
			toast.error('File format is incorrect');
			return;
		}

		const imageRef = ref(storage, `images/${user?.uid}`);

		uploadBytes(imageRef, uploadImage as File)
			.then(() => {
				toast.success('Image uploaded successfully');
				setErrorMessage('');
			})
			.catch((error) => {
				toast.error('Failed to upload the image');
				console.error('Upload error:', error);
			});
	};

	const handleSavePhoto = async () => {
		uploadFile();
		await updateUserPhoto(user!.uid, avatarURL as string);
	};

	const handleSavePassword = async () => {
		if (currentPassword && newPassword && confirmPassword === confirmPassword) {
			const credential = EmailAuthProvider.credential(email, currentPassword);
			await reauthenticateWithCredential(user as User, credential);
			await handleUpdatePassword();
		}
	};

	const handleSaveEmail = async () => {
		if (email && email !== user?.email) {
			await handleUpdateEmail();
			await updateUserEmail(auth.currentUser!.uid, email);
		}
	};

	return (
		<div className="h-fit flex flex-col items-center justify-center">
			<h1 className="mt-16 font-light text-5xl text-gray-400 tracking-widest">
				Account Settings
			</h1>
			<div className="flex flex-row mt-52 items-center justify-center gap-x-20">
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center gap-y-2">
						{!avatarURL && previewImage ? (
							<div className="flex items-center justify-center">
								<RxAvatar size={126} />
							</div>
						) : (
							<div>
								<img
									src={previewImage ?? avatarURL}
									alt="Avatar"
									className="w-32 h-32 rounded-full self-center"
								/>
							</div>
						)}
						<div className="flex flex-row items-center justify-center gap-x-5">
							<label htmlFor="avatar-upload">
								<input
									hidden
									type="file"
									accept="image/*"
									id="avatar-upload"
									onChange={handleFileChange}
								/>
								<IoMdCloudUpload size={32} className="flex cursor-pointer" />
							</label>

							<button
								id="photo-change"
								onClick={() => handleSavePhoto()}
								className="bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-600 hover:to-sky-400 rounded-xl px-4 py-1 font-sans w-fit self-center"
							>
								Save Photo
							</button>
						</div>
					</div>
					<div>
						<div className="text-red-500">{errorMessage}</div>
					</div>

					<div className="space-y-4">
						<div className="mb-2">
							<label className="text-gray-400">Full name</label>
							<input
								type="displayName"
								disabled
								placeholder="Full Name"
								value={user?.displayName as string}
								className="bg-gray-600 text-white rounded-xl px-2 py-1 w-full"
							/>
						</div>
						<div className="mb-2">
							<label className="text-gray-400">E-mail</label>
							<input
								type="email"
								placeholder="New E-mail"
								disabled
								value={email}
								className="bg-gray-600 text-white rounded-xl px-2 py-1 w-full"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center justify-center space-y-4 mt-auto">
					<SiMonkeytie size={126} />
					<div className="space-y-4">
						<div>
							<label className="text-gray-400">Current password</label>
							<input
								type="password"
								placeholder="Current password"
								className="bg-gray-600 text-white rounded-xl px-2 py-1 w-full"
								onChange={(e) => setCurrentPassword(e.target.value)}
							/>
						</div>
						<div className="mb-2">
							<label className="text-gray-400">New password</label>
							<input
								type="password"
								placeholder="New password"
								className="bg-gray-600 text-white rounded-xl px-2 py-1 w-full"
								onChange={(e) => setNewPassword(e.target.value)}
							/>
						</div>
						<div className="mb-2">
							<label className="text-gray-400">Confirm new password</label>
							<input
								type="password"
								placeholder="Confirm new password"
								className="bg-gray-600 text-white rounded-xl px-2 py-1 w-full"
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
					</div>
					<button
						id="password-change"
						onClick={() => handleSavePassword()}
						className="bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-600
						 hover:to-sky-400 rounded-xl px-4 py-1 mt-2 ml-0 font-sans"
					>
						Save Password
					</button>
				</div>

				<TfiUser size={250} />
			</div>
		</div>
	);
};

export default UserProfile;
