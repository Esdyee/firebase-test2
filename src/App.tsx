import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationBar from "./Nav/NavigationBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from "./Content/Content";


function App() {
	return (
		<div className="App">
			<NavigationBar/>
			<Content/>
		</div>
	);
}

export default App;
