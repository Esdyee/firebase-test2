import React, { useEffect } from "react";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore/lite";
import { db } from "../firebase";

function Edit() {

	// Detail 데이터 조회
	let [data, setData] = React.useState<any>({});
	let [createdDate, setCreatedDate] = React.useState<string>("");

	// Update할 데이터
	let [title, setTitle] = React.useState<string>("");
	let [price, setPrice] = React.useState<number>(0);
	let [content, setContent] = React.useState<string>("");


	const edit = async () => {

		// 계정정보 가져오기
		const userInfo = localStorage.getItem("user");

	}

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

			// Data Set
			setTitle(resData.제목);
			setPrice(resData.가격);
			setContent(resData.내용);

			setCreatedDate(resData.날짜.toDate().toLocaleDateString()); //날짜는 이렇게 변경해줘야함
		}).catch(error => {
			console.log(error);
		});
	}, [id]);

	function resetUpload() {
		setTitle("");
		setPrice(0);
		setContent("");
	}



	const writeProductData = async () => {
		if(id === null) return;
		const docData = {
			제목: title,
			가격: price,
			내용: content,
			날짜: Timestamp.fromDate(new Date()),
		};
		await setDoc(doc(db, "product", id), docData);
	}

	return (
		<div className={"container mt-3"}>
			{/*<button onClick={upload}>test</button>*/}

			<pre>
				title: {title} <br/>
				price: {price} <br/>
				content: {content} <br/>
			</pre>

			<input type={"text"} className={"form-control mt-2"} id={"title"}
			       value={title}
			       onInput={
				       (event) => {
					       setTitle(event.currentTarget.value);
				       }
			       }
			/>
			<textarea className={"form-control mt-2"} id={"content"}
			          value={content}
			          onInput={(event) => {
				          setContent(event.currentTarget.value);
			          }}
			></textarea>
			<input type={"text"} className={"form-control mt-2"} id={"price"}
			       value={price}
			       onInput={
				       (event) => {
					       setPrice(Number(event.currentTarget.value));
				       }}
			/>

			<button className={"btn btn-danger mt-3"} id={"send"}
			        onClick={writeProductData}>수정
			</button>
		</div>
	)
}

export default Edit;
