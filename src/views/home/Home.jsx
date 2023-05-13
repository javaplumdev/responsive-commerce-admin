import React from 'react';
import useGetUsers from './useGetUsers';
import { Container, Button, Modal } from 'react-bootstrap';
import useGetItems from './useGetItems';
import AddItemModal from './AddItemModal';
import useModalUploadPost from './useModalUploadPost';

const Home = () => {
	const { currentUser } = useGetUsers();
	const { data, isLoading } = useGetItems();
	const { handleShow, show, handleClose } = useModalUploadPost();

	const filteredData =
		data && data.filter((item) => item.owner === currentUser.uid);

	return (
		<Container>
			<div className="mt-3 d-flex justify-content-end">
				<Button variant="dark" onClick={handleShow}>
					Add item
				</Button>
				<AddItemModal show={show} handleClose={handleClose} />
			</div>
			<div>
				<p>Your items</p>
				{filteredData?.length === 0 ? (
					<p>You don't have any items yet</p>
				) : (
					filteredData &&
					filteredData?.map((item, index) => {
						return (
							<div
								key={index}
								className="text-decoration-none my-3 border p-3 w-100"
							>
								<div className="d-flex">
									<img
										src={item.image}
										alt={item.image}
										style={{
											width: '255px',
											height: '200px',
											objectFit: 'cover',
										}}
									/>

									<div className="mx-5">
										{item.name}
										<br></br>
										<b>₱{item.price}</b>

										<p className="mt-3">ORDERS: 0</p>
										<p className="mt-3">SHIPPED: 0</p>
									</div>
								</div>
							</div>
						);
					})
				)}
			</div>
		</Container>
	);
};

export default Home;
