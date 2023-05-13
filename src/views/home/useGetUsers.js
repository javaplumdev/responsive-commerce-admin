import { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/config';
import { onSnapshot, collection, onAuthStateChanged } from '../../firebase';

function useGetUsers() {
	const [users, setUsers] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		onSnapshot(collection(db, 'users'), (snapshot) => {
			setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});
	}, []);

	return { users, currentUser };
}

export default useGetUsers;
