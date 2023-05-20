import React from 'react';
import useGetUsers from './useGetUsers';
import { Container, Button } from 'react-bootstrap';
import useGetItems from './useGetItems';
import AddItemModal from './AddItemModal';
import useModalUploadPost from './useModalUploadPost';
import { AiFillShopping } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Home = () => {
	const { currentUser } = useGetUsers();
	const { data, placedOrders, removeItem } = useGetItems();
	const { handleShow, show, handleClose } = useModalUploadPost();

	const filteredData =
		data && data.filter((item) => item.owner === currentUser.uid);

	return (
		<Container>
			<div className="mt-3 d-flex justify-content-end">
				<div className="me-3">
					<span>Orders ({placedOrders?.length})</span>
					<Link to="/order" className="text-dark">
						<AiFillShopping size={30} />
					</Link>
				</div>
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
								className="d-flex justify-content-between text-decoration-none my-3 border p-3 w-100"
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
									</div>
								</div>
								<BsFillTrashFill
									className="trash"
									size={30}
									color="#960000"
									onClick={() => removeItem(item.id)}
								/>
							</div>
						);
					})
				)}
			</div>
		</Container>
	);
};

export default Home;
