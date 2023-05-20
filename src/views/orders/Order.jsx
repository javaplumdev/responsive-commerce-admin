import React, { useState } from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import useGetItems from '../home/useGetItems';
import useGetUsers from '../home/useGetUsers';
import useGetOrders from './useGetOrders';

const Order = () => {
	const { orders } = useGetOrders();
	const { users } = useGetUsers();
	const { approvedOrder, toShip } = useGetItems();
	const [orderStatus, setOrderStatus] = useState('Pending');

	let filteredData =
		orders &&
		orders?.filter((item) => {
			if (item.status === orderStatus) {
				return item;
			}
		});

	return (
		<Container>
			<div>
				<div className="d-flex justify-content-between">
					<h3>Orders</h3>
					<Dropdown>
						<Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
							Filter by status
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={() => setOrderStatus('Pending')}>
								Pending
							</Dropdown.Item>
							<Dropdown.Item onClick={() => setOrderStatus('Approved')}>
								Approved
							</Dropdown.Item>
							<Dropdown.Item onClick={() => setOrderStatus('To ship')}>
								To ship
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				{filteredData &&
					filteredData?.map((item, index) => {
						console.log(filteredData);

						return (
							<div
								key={index}
								className="d-flex justify-content-between border my-3 p-3 rounded"
							>
								<div>
									<div>Sub total: ₱{item.sum}</div>
									{users &&
										users?.map((data, index) => {
											if (data.uid === item.owner) {
												return <div key={index}>Ordered by: {data.email}</div>;
											}
										})}
									<p>Status: {item.status}</p>
									<hr></hr>
									<span>Orders</span>
									{item.items &&
										item.items?.map((data, index) => {
											return (
												<div key={index} className="my-3 ">
													{data.name}
												</div>
											);
										})}
								</div>
								<Dropdown>
									<Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
										Set status
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Dropdown.Item onClick={() => approvedOrder(item.id)}>
											Approved Order
										</Dropdown.Item>
										<Dropdown.Item onClick={() => toShip(item.id)}>
											To ship
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
						);
					})}
			</div>
		</Container>
	);
};

export default Order;
