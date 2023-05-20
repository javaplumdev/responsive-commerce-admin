import { useEffect, useState } from 'react';
import {
	onSnapshot,
	collection,
	query,
	orderBy,
	deleteDoc,
	doc,
	setDoc,
} from '../../firebase';
import { db } from '../../firebase/config';
import { toast } from 'react-toastify';

function useGetItems() {
	const [data, setData] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [placedOrders, setPlacesOrders] = useState(null);

	useEffect(() => {
		const queryData = query(
			collection(db, 'items'),
			orderBy('timestamp', 'desc')
		);

		onSnapshot(queryData, (snapshot) => {
			setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

			setIsLoading(false);
		});

		const queryDataOrders = query(
			collection(db, 'placed-order'),
			orderBy('timestamp', 'desc')
		);

		onSnapshot(queryDataOrders, (snapshot) => {
			setPlacesOrders(
				snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);

			setIsLoading(false);
		});
	}, []);

	const approvedOrder = async (id) => {
		await setDoc(
			doc(db, 'placed-order', id),
			{
				status: 'Approved',
			},
			{ merge: true }
		);
	};

	const toShip = async (id) => {
		await setDoc(
			doc(db, 'placed-order', id),
			{
				status: 'To ship',
			},
			{ merge: true }
		);
	};

	const removeItem = async (id) => {
		await deleteDoc(doc(db, 'items', id));

		toast.success('Item removed!', {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});
	};

	return { data, isLoading, placedOrders, removeItem, approvedOrder, toShip };
}

export default useGetItems;
