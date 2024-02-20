import { FaUserCircle } from 'react-icons/fa';

interface Props {}

const UserAvatar: React.FC<Props> = () => {
	return (
		<div>
			<FaUserCircle className="cursor-pointer" size={32} />
		</div>
	);
};

export default UserAvatar;
