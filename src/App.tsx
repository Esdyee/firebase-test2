import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationBar from "./Nav/NavigationBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from "./Content/Content";
import Upload from "./Upload/Upload";
import { Routes, Route } from 'react-router-dom';
import Login from "./Login/Login";
import Register from "./Login/Register";
import Detail from "./Content/Detail";
import Edit from "./Upload/Edit";

function App() {
	return (
		<div className="App">
			<NavigationBar/>
			<Routes>
				<Route path={"/"} element={
					<Content/>
				} />
				<Route path={"/upload"} element={
					<Upload/>
				} />
				<Route path={"/register"} element={
					<Register/>
				} />
				<Route path={"/login"} element={
					<Login/>
				} />
				<Route path={"/detail"} element={
					<Detail/>
				} />
				<Route path={"/edit"} element={
					<Edit/>
				}>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
