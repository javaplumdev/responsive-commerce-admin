import { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/config';
import { onSnapshot, collection, onAuthStateChanged } from '../../firebase';
import useGetUsers from '../home/useGetUsers';

function useGetOrders() {
	const { users } = useGetUsers();
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		onSnapshot(collection(db, 'placed-order'), (snapshot) => {
			setOrders(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});
	}, []);

	return { orders };
}

export default useGetOrders;
