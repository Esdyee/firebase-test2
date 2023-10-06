import React, { useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

function Login() {

	let [name, setName] = React.useState<string>("");
	let [email, setEmail] = React.useState<string>("");
	let [password, setPassword] = React.useState<string>("");


	function submitLogin() {
		signInWithEmailAndPassword(getAuth(), email, password)
			.then((result) => {
				console.log(result);
				console.log(result.user);
			});
	}

	function submitLogout() {
		signOut(getAuth());
	}

	return (
		<div className={"container mt-3"}>'

			{/*로그인*/}
			<div className={"mb-3"}>
				<input type={"text"} className="form-control" placeholder="name"
				       id={"name"}
				       onChange={(event) => {
						 setName(event.target.value);
				       }}
				/>
			</div>
			<div className={"mb-3"}>
				<input type={"text"} className="form-control" placeholder="email"
				       id={"email"}
				       onChange={(event) => {
						 setEmail(event.target.value);
				       }}
				/>
			</div>
			<div className={"mb-3"}>
				<input type={"text"} className="form-control" placeholder="name"
				       id={"pw"}
				       onChange={(event) => {
						 setPassword(event.target.value);
				       }}
				/>
			</div>
			<button type={"submit"} className={"btn btn-primary"} id={"login"}
				onClick={() => {
					submitLogin();
				}}
			>로그인</button>
			<button type={"submit"} className={"btn btn-primary"} id={"logout"}
			        onClick={() => {
				        submitLogout();
			        }}
			>로그아웃</button>
		</div>
	)
}

export default Login;