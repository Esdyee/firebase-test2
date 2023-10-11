import React, { useEffect } from 'react';
import { db, storage } from "../firebase";
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore/lite";
import "./Content.css";
import firebase from "firebase/compat";
import { Link } from "react-router-dom";


function Content() {

	let [data, setData] = React.useState<any>([]);
	const test = async () => {
		const docRef = collection(db, "product");
		const docSnap = await getDocs(docRef);

		// docSnap to array
		const resultData = docSnap.docs.map((doc: any) => {
			return {
				id: doc.id,
				...doc.data()
			}
		});

		if (docSnap.size > 0) {
			// const resultData = docSnap;
			console.log("Document data:", resultData);
			setData(resultData);
		} else {
			// docSnap.data() will be undefined in this case
			console.log("No such document!");
		}
	}

	return (
		<div className={"container mt-3"}>
			<button onClick={   test}>test</button>
			{
				data.map((item: any, index:number) => {
					return(
						<div className={"product"} key={index}>
							<div className={"thumbnail"}
							     style={{ backgroundImage: `url(${item.이미지 ? item.이미지 : 'https://via.placeholder.com/350' })` }}></div>
							<div className={"flex-grow-1 p-4"}>
								<h5 className={"title"}>
									<Link to={`/detail?id=${item.id}`}>{item.제목}</Link>
									<p className={"date"}></p>
									<p className={"price"}>{item.가격}</p>
									<p className={"float-end"}>★ 0</p>
								</h5>
							</div>
						</div>
						)
				})
			}



		</div>
	);
}

export default Content;
