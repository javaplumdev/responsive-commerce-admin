import { LoginPage, Home, RegisterPage, Order } from '../views';
import { NavbarComponent } from '../components';
import ProtectedRoute from '../components/protectedRoute';

export const route_config = [
	{
		path: '/order',
		component: (
			<ProtectedRoute>
				<NavbarComponent />
				<Order />
			</ProtectedRoute>
		),
	},
	{
		path: '/home',
		component: (
			<ProtectedRoute>
				<NavbarComponent />
				<Home />
			</ProtectedRoute>
		),
	},
	{
		path: '/register',
		component: <RegisterPage />,
	},
	{
		path: '/',
		component: <LoginPage />,
	},
];
