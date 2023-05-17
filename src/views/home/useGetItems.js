import { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy } from '../../firebase';
import { db } from '../../firebase/config';

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

		onSnapshot(query(collection(db, 'placed-order')), (snapshot) => {
			setPlacesOrders(
				snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);

			setIsLoading(false);
		});
	}, []);

	return { data, isLoading, placedOrders };
}

export default useGetItems;
