import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface UserAvatarProps {
	uid: string | undefined;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ uid }) => {
	const [avatarURL, setAvatarURL] = useState<string>('');

	useEffect(() => {
		const storage = getStorage();
		const storageRef = ref(storage, `images/${uid}`);

		getDownloadURL(storageRef)
			.then((url) => {
				setAvatarURL(url);
			})
			.catch((error) => {
				console.error('Error getting download URL:', error);
			});
	}, [uid]);

	return (
		<div>
			{avatarURL ? (
				<img
					src={avatarURL}
					alt="User avatar"
					className="h-12 w-12 rounded-full overflow-hidden object-fill"
				/>
			) : (
				<div className="flex place-self-center my-auto cursor-pointer hover:bg-gray-800 opacity-75 rounded-full self-center w-10 h-10 z-1">
					<FaUserCircle
						className="cursor-pointer fill-gray-300 m-auto"
						size={32}
					/>
				</div>
			)}
		</div>
	);
};

export default UserAvatar;
