import { doc, setDoc, collection, addDoc } from "firebase/firestore/lite";
import { db } from "../firebase";
import React from "react";

function Upload() {

	let [title, setTitle] = React.useState<string>("");
	let [price, setPrice] = React.useState<number>(0);
	let [content, setContent] = React.useState<string>("");
	const upload = async () => {
		// const docRef = doc(db, "product", "상품3");
		// const docSnap = await setDoc(docRef, { 제목: "변기"});

		const docRef = collection(db, "product");
		const docSnap = await addDoc(docRef, {
			제목: title,
			가격: price,
			내용: content
		});

		resetUpload();
	}

	function resetUpload() {
		setTitle("");
		setPrice(0);
		setContent("");
	}

	return (
		<div className={"container mt-3"}>
			{/*<button onClick={upload}>test</button>*/}

			<pre>
				title: {title} <br/>
				price: {price} <br/>
				content: {content}
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
			<input className={"form-control mt-2"} type={"file"} id={"image"}/>
			<button className={"btn btn-danger mt-3"} id={"send"}
			        onClick={upload}>올리기</button>
		</div>
	)
}

export default Upload;
