import { onValue, ref, DataSnapshot } from 'firebase/database';
import { db } from '../../config/firebase-config';

interface Notification {
	authorID: string;
}

export const getNotifications = async (
	authorId: string
): Promise<Notification[]> => {
	const notificationsRef = ref(db, `notifications/${authorId}`);

	return new Promise((resolve, reject) => {
		onValue(
			notificationsRef,
			(snapshot) => {
				const notifications: Notification[] = [];
				snapshot.forEach((childSnapshot: DataSnapshot) => {
					notifications.push({
						...childSnapshot.val(),
						id: childSnapshot.key,
					});
				});
				resolve(notifications);
			},
			(error) => {
				reject(error);
			}
		);
	});
};
