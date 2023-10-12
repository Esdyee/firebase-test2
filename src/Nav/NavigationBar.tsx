import React, { useEffect } from 'react';
import { Container, Navbar, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from '../firebase';
function NavigationBar() {

	let [displayName, setDisplayName] = React.useState<string>("test");

	useEffect(() => {

		const userInfo = localStorage.getItem("user");
		if (userInfo) {
			const user = JSON.parse(userInfo);
			setDisplayName(user.displayName);
		}

		// auth.onAuthStateChanged((user) => {
		// 	if (user?.displayName) {
		// 		localStorage.setItem("user", JSON.stringify(user));
		// 		setDisplayName(user.displayName);
		// 	}
		// });

	});

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="#home">단군마켓</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to={"/"}>
							Home
						</Nav.Link>
						<Nav.Link as={Link} to={"/login"}>
							Login
						</Nav.Link>
						<Nav.Link href="#link">Link</Nav.Link>
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
				<span className={"ms-auto"}>{ displayName }</span>
			</Container>
		</Navbar>
	);
}

export default NavigationBar;
