import React from 'react';
import { IoNotifications } from 'react-icons/io5';

interface NotificationsProps {}

const Notifications: React.FC<NotificationsProps> = () => {
	return (
		<div>
			<div className="flex place-self-center cursor-pointer hover:bg-gray-800 opacity-75 rounded-full self-center w-10 h-10 z-1">
				<IoNotifications size={22} className="cursor-pointer m-auto" />
			</div>
		</div>
	);
};

export default Notifications;
