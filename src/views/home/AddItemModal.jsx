import React from 'react';
import { Form, Button, Modal, FloatingLabel } from 'react-bootstrap';
import useModalUploadPost from './useModalUploadPost';
import { toast } from 'react-toastify';

const AddItemModal = ({ show, handleClose }) => {
	const {
		uploadItem,
		imageData,
		setImageData,
		itemName,
		setItemName,
		itemDescription,
		setItemDescription,
		itemPrice,
		setItemPrice,
	} = useModalUploadPost();

	const handleSubmit = (e) => {
		e.preventDefault();

		uploadItem(itemName, imageData, itemDescription, itemPrice);

		handleClose();
		toast(' Item added!', {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add item</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label>Item name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Item name"
							onChange={(e) => setItemName(e.target.value)}
							required
						/>
					</Form.Group>
					<FloatingLabel controlId="floatingTextarea2" label="Description">
						<Form.Control
							as="textarea"
							placeholder="Description"
							style={{ height: '100px' }}
							onChange={(e) => setItemDescription(e.target.value)}
							required
						/>
					</FloatingLabel>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label>Price</Form.Label>
						<Form.Control
							type="number"
							placeholder="Price"
							onChange={(e) => setItemPrice(e.target.value)}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formFile" className="mb-3">
						<Form.Label>Add picture</Form.Label>
						<Form.Control
							type="file"
							onChange={(e) => setImageData(e.target.files[0])}
							required
						/>
					</Form.Group>
					<Modal.Footer>
						<Button variant="danger" onClick={handleClose}>
							Close
						</Button>
						<Button type="submit" variant="dark">
							Add
						</Button>
					</Modal.Footer>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default AddItemModal;
