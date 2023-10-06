import { doc, setDoc, collection, addDoc } from "firebase/firestore/lite";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React from "react";

function Upload() {

	let [title, setTitle] = React.useState<string>("");
	let [price, setPrice] = React.useState<number>(0);
	let [content, setContent] = React.useState<string>("");
	let [image, setImage] = React.useState<any>(null);
	let [downloadUrl, setDownloadUrl] = React.useState<string>("");


	const upload = async () => {
		// const docRef = doc(db, "product", "상품3");
		// const docSnap = await setDoc(docRef, { 제목: "변기"});

		// 저장할 경로
		const fileRef = ref(storage, "image/" + image.name);
		console.log(fileRef);

		// 이미지 저장
		const uploadStorage = uploadBytesResumable(fileRef, image);


		uploadStorage.on("state_changed",
			// 변화시 동작하는 함수(진행률)
			null,
			// 에러시 동작하는 함수
			(error) => {

			},
			// 성공시 동작하는 함수
			() => {
				getDownloadURL(uploadStorage.snapshot.ref).then(async (downloadURL) => {
					console.log("File available at", downloadURL);
					setDownloadUrl(downloadURL);

					const docRef = collection(db, "product");
					const docSnap = await addDoc(docRef, {
						제목: title,
						가격: price,
						내용: content,
						날짜: new Date(),
						이미지: downloadUrl
					});

					resetUpload();
				});
			});
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
			<input className={"form-control mt-2"} type={"file"} id={"image"}
			       onChange={(event) => {
				       setImage(event.target.files?.[0]);
			       }}
			/>
			<button className={"btn btn-danger mt-3"} id={"send"}
			        onClick={upload}>올리기
			</button>
		</div>
	)
}

export default Upload;