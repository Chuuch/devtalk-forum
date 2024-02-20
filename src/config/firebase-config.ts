import { FirebaseApp, initializeApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import { Auth, getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

interface firebaseConfig {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	appId: string;
	messagingSenderId: string;
	databaseURL: string;
}

const firebaseConfig = {
	apiKey: 'AIzaSyCPhtRV3nCqGiIV_u5SutzCf-ABRjl56II',
	authDomain: 'devtalk-forum.firebaseapp.com',
	projectId: 'devtalk-forum',
	storageBucket: 'devtalk-forum.appspot.com',
	messagingSenderId: '462611011204',
	appId: '1:462611011204:web:a7ff5147347c42242b14d1',
	databaseURL:
		'https://devtalk-forum-default-rtdb.europe-west1.firebasedatabase.app/',
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Database = getDatabase(app);
export const storage = getStorage(app);
