import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from '../../firebase';
import { auth } from '../../firebase/config';
import Cookies from '../../components/cookies';
import useGetUsers from '../home/useGetUsers';

function useLoginUser() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { users, currentUser } = useGetUsers();

	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;

				const adminUser = users?.find(
					(item) => item.uid === currentUser.uid && item.isAdmin === true
				);

				if (adminUser) {
					Cookies.set('cookie-user-token', user.accessToken);
					navigate('/home');
				} else {
					setError('User not admin');
				}
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	return { handleLogin, setEmail, setPassword, error };
}

export default useLoginUser;
