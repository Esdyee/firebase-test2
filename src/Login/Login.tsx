import React, { useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

function Login() {

	let [name, setName] = React.useState<string>("");
	let [email, setEmail] = React.useState<string>("");
	let [password, setPassword] = React.useState<string>("");

	function submitRegister() {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((result) => {
				console.log(result);
				console.log(result.user);
			});
	}

	return (
		<div className={"container mt-3"}>'
			<div className={"mb-3"}>
				<input type={"text"} className="form-control" placeholder="name"
				       id={"name-new"}
				       onChange={(event) => {
						 setName(event.target.value);
				       }}
				/>
			</div>
			<div className={"mb-3"}>
				<input type={"text"} className="form-control" placeholder="email"
				       id={"email-new"}
				       onChange={(event) => {
						 setEmail(event.target.value);
				       }}
				/>
			</div>
			<div className={"mb-3"}>
				<input type={"text"} className="form-control" placeholder="name"
				       id={"pw-new"}
				       onChange={(event) => {
						 setPassword(event.target.value);
				       }}
				/>
			</div>
			<button type={"submit"} className={"btn btn-primary"} id={"register"}
				onClick={() => {
					submitRegister();
				}}
			>가입하기</button>
		</div>
	)
}

export default Login;
