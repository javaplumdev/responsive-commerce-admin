import React from 'react';
import { route_config } from './routes/config';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toast } from './components';

function App() {
	return (
		<div className="App">
			<Router>
				<Toast />
				<Routes>
					{route_config.map((item, index) => {
						return (
							<Route key={index} path={item.path} element={item.component} />
						);
					})}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
