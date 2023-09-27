import React, { useEffect } from 'react';
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore/lite";


function Content() {

	let [data, setData] = React.useState([]);
	const test = async () => {
		const docRef = doc(db, "product", "상품1");
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log("Document data:", docSnap.data());
		} else {
			// docSnap.data() will be undefined in this case
			console.log("No such document!");
		}
	}

	return (
		<div>
			<button onClick={test}>test</button>
		</div>
	);
}

export default Content;
