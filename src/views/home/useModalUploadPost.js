import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { v4 as uuidv4 } from 'uuid';
import useGetUsers from './useGetUsers';
import { serverTimestamp } from 'firebase/firestore';
import { setDoc, doc } from '../../firebase';
import { db, storage } from '../../firebase/config';

function useModalUploadPost() {
	const [show, setShow] = useState(false);
	const { currentUser } = useGetUsers();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [itemName, setItemName] = useState(null);
	const [itemDescription, setItemDescription] = useState(null);
	const [itemPrice, setItemPrice] = useState(null);
	const [imageData, setImageData] = useState(null);

	const uploadItem = (itemName, imageData, itemDescription, itemPrice) => {
		const id = uuidv4();

		const imageRef = ref(storage, `images/${imageData.name + uuidv4()}`);

		uploadBytes(imageRef, imageData).then(() => {
			setImageData(null);
			getDownloadURL(imageRef).then((url) => {
				setDoc(doc(db, 'items', id), {
					id: id,
					name: itemName,
					price: parseInt(itemPrice),
					description: itemDescription,
					image: url,
					owner: currentUser.uid,
					timestamp: serverTimestamp(),
				});
			});
		});
	};

	return {
		itemName,
		setItemName,
		itemDescription,
		setItemDescription,
		itemPrice,
		setItemPrice,
		imageData,
		setImageData,
		uploadItem,
		show,
		setShow,
		handleClose,
		handleShow,
	};
}

export default useModalUploadPost;
