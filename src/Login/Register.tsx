import React, { useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from "firebase/firestore/lite";
import { db } from "../firebase";

function Register() {

	let [name, setName] = React.useState<string>("");
	let [email, setEmail] = React.useState<string>("");
	let [password, setPassword] = React.useState<string>("");

	function submitRegister() {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (result) => {
				// console.log(result);
				console.log(result.user);

				const userInfo = {
					name: name,
					email: email,
				}

				console.log(userInfo);

				const docRef = doc(db, "user", result.user.uid);
				await setDoc(docRef, userInfo, { merge: true });

				if (auth.currentUser) {
					updateProfile(auth.currentUser, {
						displayName: name,
					});
				}
			});
	}

	return (
		<div className={"container mt-3"}>'
			{/*가입하기*/}
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
				<input type={"text"} className="form-control" placeholder="password"
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

export default Register;
