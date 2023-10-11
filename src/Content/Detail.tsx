import React, { useEffect } from 'react';
import { db, storage } from "../firebase";
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore/lite";
import './Detail.css';
import firebase from "firebase/compat";

function Detail() {

	let [data, setData] = React.useState<any>({});

	// get querystring from url
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const id = urlParams.get('id');

	// get data from firebase
	const getData = async () => {
		if(id === null) return;
		const docRef = doc(db, "product", id);
		const docSnap = await getDoc(docRef);
		return docSnap;
	}

	getData().then(result => {
		if(result === undefined) return;

		setData(result.data());
	});

	return (
		<div className={"container mt-3"}>
			{/*상세보기*/}
			상세페이지
			<div className={"detail-pic my-4"}
			     style={{ backgroundImage: `url(https://via.placeholder.com/400)` }}
			></div>
			<div>
				<h5>올린사람 : 모름</h5>
				<hr />
				<h5 className={"title"}>상품명</h5>
				<p className={"date"}>2021-09-01</p>
				<p className={"price"}>가격</p>
			</div>
		</div>
	);
}

export default Detail;
