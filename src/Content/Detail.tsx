import React, { useEffect } from 'react';
import { db, storage } from "../firebase";
import { doc, query, where, getDoc, getDocs, collection, Timestamp, addDoc } from "firebase/firestore/lite";
import './Detail.css';
import firebase from "firebase/compat";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { auth } from '../firebase';
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
			setCreatedDate(resData.date.toDate().toLocaleDateString()); //날짜는 이렇게 변경해줘야함
		}).catch(error => {
			console.log(error);
		});
	}, [id]);

	function moveEdit() {
		// react route to edit page

	}

	const makeChatRoom = async () => {

		const uid = auth.currentUser?.uid;
		const userInfo = {
			uid: uid,
			name: auth.currentUser?.displayName
		}

		if(id === null) return;
		// const docRef = doc(db, "chatroom", id);
		// await setDoc(docRef, userInfo, { merge: true });

		const docRef = collection(db, "chatroom");
		const docSnap = await addDoc(docRef, {
			chatUsers: [uid, data.uid],
			title: data.title,
			date: new Date(),
		});

	}

	const checkChatRoom = async () => {
		// check chatroom exist
		// if exist, move to chatroom
		// if not, make chatroom

		const myuid = auth.currentUser?.uid;
		const productuid = data.uid;

		const collectionData = collection(db, "chatroom");
		const myuidQuery = where("chatUsers", "array-contains", myuid);
		// const productuidQuery = where("chatUsers", "array-contains", productuid);

		const searchChatQuery = query(collectionData, myuidQuery);

		const querySnapshot = await getDocs(searchChatQuery);

		const matchingDocs = [];
		querySnapshot.forEach((doc) => {
			// 내 채팅 목록 불러와서
			const data = doc.data();

			// 내가 클릭한 상품의 uid가 있는지 확인
			if (data.chatUsers && data.chatUsers.includes(productuid)) {
				matchingDocs.push(doc);
			}
		});

		if (matchingDocs.length > 0) {
			return true;
		} else {
			return false;
		}

	};

	return (
		<div className={"container mt-3"}>
			{/*상세보기*/}
			상세페이지

			<Link to={`/edit?id=${id}`}>
				<Button variant="secondary">
					수정
				</Button>
			</Link>


			<Button variant="secondary" onClick={makeChatRoom}>
				채팅
			</Button>

			<Button variant="secondary" onClick={checkChatRoom}>
				채팅여부
			</Button>


			<div className={"detail-pic my-4"}
			     style={{ backgroundImage: `url(${data.이미지})` }}
			></div>
			<div>
				<h5>올린사람 : {data.이름}</h5>
				<hr />
				<h5 className={"title"}>{data.title}</h5>
				<p className={"date"}>{createdDate}</p>
				<p className={"price"}>{data.price}</p>
			</div>
		</div>
	);
}

export default Detail;
