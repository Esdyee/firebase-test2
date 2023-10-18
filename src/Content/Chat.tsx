import React, { useEffect } from "react";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore/lite";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import './Chat.css';

function Chat() {

	let [chatroomData, setData] = React.useState<any>({});
	let [createdDate, setCreatedDate] = React.useState<string>("");

	// get querystring from url
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const id = urlParams.get('id');
	const chatroomid = urlParams.get('chatroomid');


	useEffect(() => {
		// get data from firebase
		const getData = async () => {
			if(id === null) return;
			const docRef = doc(db, "product", id);
			const docSnap = await getDoc(docRef);
			return docSnap;
		}

		// checkChatRoom();
	}, []);

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

	};


	return (
		<div className={"container mt-3"}>
			채팅페이지

			<div className="container p-4 detail">
				<div className="row">
					<div className="col-3 p-0">
						<ul className="list-group chat-list">
							<li className="list-group-item">
								<h6>채팅방1</h6>
								<h6 className="text-small">채팅방아이디</h6>
							</li>
						</ul>
					</div>
					<div className="col-9 p-0">
						<div className="chat-room">
							<ul className="list-group chat-content">
								<li><span className="chat-box">채팅방1 내용</span></li>
								<li><span className="chat-box">채팅방1 내용</span></li>
								<li><span className="chat-box mine">채팅방1 내용</span></li>
							</ul>
							<div className="input-group">
								<input className="form-control" id="chat-input" />
									<button className="btn btn-secondary" id="send">전송</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat;
