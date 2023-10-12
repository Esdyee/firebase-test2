import React, { useEffect } from 'react';
import { db, storage } from "../firebase";
import { doc, setDoc, getDoc, getDocs, collection, Timestamp } from "firebase/firestore/lite";
import './Detail.css';
import firebase from "firebase/compat";
// import DocumentData = firebase.firestore.DocumentData;

function Detail() {

	let [data, setData] = React.useState<any>({});
	let [createdDate, setCreatedDate] = React.useState<string>("");

	// get querystring from url
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const id = urlParams.get('id');

	useEffect(() => {
		// get data from firebase
		const getData = async () => {
			if(id === null) return;
			const docRef = doc(db, "product", id);
			const docSnap = await getDoc(docRef);
			return docSnap;
		}

		getData().then(result => {
			if(result === undefined) return;
			const resData = result.data();
			if(resData === undefined) return;
			setData(resData);
			setCreatedDate(resData.날짜.toDate().toLocaleDateString()); //날짜는 이렇게 변경해줘야함
		}).catch(error => {
			console.log(error);
		});
	}, [id]);


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
				<h5 className={"title"}>{data.제목}</h5>
				<p className={"date"}>{createdDate}</p>
				<p className={"price"}>{data.가격}</p>
			</div>
		</div>
	);
}

export default Detail;