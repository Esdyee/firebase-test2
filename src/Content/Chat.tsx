import React, { useEffect } from "react";
import { addDoc, collection, doc, DocumentData, getDoc, getDocs, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { auth, noLiteDb } from "../firebase";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import './Chat.css';
import chat from "./Chat";

function Chat() {

	let [chatroomData, setData] = React.useState<any>([]);
	let [inputMessageData, setInputMessageData] = React.useState<any>("");
	let [selectedChatroom, setSelectedChatroom] = React.useState<any>("");
	let [createdDate, setCreatedDate] = React.useState<string>("");
	let [chatMessage, setChatMessage] = React.useState<any>([]);

	// get querystring from url
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	// const id = urlParams.get('id');


	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				getChatRoom();
			}
			// getChatMessage2(); // 권한 테스트용 소스
		});
	}, []);

	useEffect(() => {
		if (selectedChatroom !== "") {
			getChatMessage();
		}
	}, [selectedChatroom]);

	const getChatRoom = async () => {
		const myuid = auth.currentUser?.uid;
		// const productuid = data.uid;

		const collectionData = collection(noLiteDb, "chatroom");
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

		// sub collection message를 firestore에 저장
		const docRef = collection(noLiteDb, "chatroom", selectedChatroom, "messages");
		await addDoc(docRef, {
			message: message,
			uid: auth.currentUser?.uid,
			date: new Date()
		});

	}

	// 클릭시 chatroom 변경
	function changeChatroom(id: string) {
		setSelectedChatroom(id);
	}

	// chatroom의 대화목록 가져오기
	const getChatMessage = async () => {

		// collection query
		const collectionData = collection(noLiteDb, "chatroom", "AwpOr4QywWtvbecQIwnq", "messages");

		// order by
		const collectionQuery = query(collectionData, orderBy("date", "asc"));

		onSnapshot(collectionQuery, (snapshot) => {
			const matchingDocs: DocumentData[] = [];
			snapshot.forEach((doc) => {
				const data = doc.data();

				// 내가 전송한 데이터인지 구분
				if (data.uid === auth.currentUser?.uid) {
					data.isMine = true;
				} else {
					data.isMine = false;
				}

				matchingDocs.push(data);
			});

			setChatMessage(matchingDocs);
		})
	}

	// onSnapshot 안쓰고 chat 가져오기
	const getChatMessage2 = async () => {
		const docRef = collection(noLiteDb, "chatroom", "AwpOr4QywWtvbecQIwnq", "messages");
		const docSnap = await getDocs(docRef);

		// data of querySnapshot into chatroomData
		const matchingDocs: DocumentData[] = [];
		docSnap.forEach((doc) => {
			const data = doc.data();
			matchingDocs.push(data);
		});
		setChatMessage(matchingDocs);
	}

	return (
		<div className={"container mt-3"}>
			채팅페이지<br/>
			<div className="container p-4 detail">
				<div className="row">
					<div className="col-3 p-0">
						<ul className="list-group chat-list">
							{
								chatroomData.map((data: any, index: number) => {
									return (
										<li className="list-group-item" onClick={() => {
											changeChatroom(data.id)
										}} key={index}>
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
								{
									chatMessage.map((data: any, index: number) => {
										return (
											<li key={index}><span
												className={`chat-box ${data.isMine ? "mine" : "other"}`}
											>{data.message}</span></li>
										)
									})
								}
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
								>전송
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat;
