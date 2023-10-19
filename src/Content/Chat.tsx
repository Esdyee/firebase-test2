import React, { useEffect } from "react";
import { addDoc, collection, doc, DocumentData, getDoc, getDocs, query, where } from "firebase/firestore/lite";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import './Chat.css';
import chat from "./Chat";

function Chat() {

	let [chatroomData, setData] = React.useState<any>([]);
	let [inputMessageData, setInputMessageData] = React.useState<any>("");
	let [createdDate, setCreatedDate] = React.useState<string>("");

	// get querystring from url
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	// const id = urlParams.get('id');


	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				getChatRoom();
			}
		});
	}, []);

	const getChatRoom = async () => {
		const myuid = auth.currentUser?.uid;
		// const productuid = data.uid;

		const collectionData = collection(db, "chatroom");
		const myuidCondition = where("chatUsers", "array-contains", myuid);
		const searchChatQuery = query(collectionData, myuidCondition);

		const querySnapshot = await getDocs(searchChatQuery);

		// data of querySnapshot into chatroomData
		const matchingDocs: DocumentData[] = [];
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			data.id = doc.id;
			matchingDocs.push(data);
		});

		setData(matchingDocs);
	};


	const sendMessage = async () => {

		// 메세지 내용 변수에 담기
		const message = inputMessageData;
		const chatroomId: string = "AwpOr4QywWtvbecQIwnq";

		// sub collection message를 firestore에 저장
		const docRef = collection(db, "chatroom", chatroomId, "messages");
		await addDoc(docRef, {
			message: message,
		});

	}

	return (
		<div className={"container mt-3"}>
			채팅페이지

			<div className="container p-4 detail">
				<div className="row">
					<div className="col-3 p-0">
						<ul className="list-group chat-list">
							{
								chatroomData.map((data: any) => {
									return (
										<li className="list-group-item">
											<h6>{data.제목}</h6>
											<h6 className="text-small">{data.id}</h6>
										</li>
									)
								})
							}
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
								<input className="form-control" id="chat-input"
									onChange={(event) => {
										setInputMessageData(event.target.value);
									}}
								/>
									<button className="btn btn-secondary" id="send"
										onClick={() => {
											sendMessage();
										}}
									>전송</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat;
