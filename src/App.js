import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "./firebase";
import "firebase/auth";
import MainApplication from "./components/MainApplication";
import LoginForm from "./components/LoginForm";

function App() {
	const [userState, setUserState] = useState(false);
	const [uid, setUid] = useState("");

	// let db = firebase.firestore();
	// let userDataRef = db.collection("userdata");

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			setUserState(true);
			setUid(user.uid);
		} else {
			setUserState(false);
			setUid("");
		}
	});

	// useEffect(() => {
	// 	console.log(uid);
	// }, [uid]);

	// let addtesttodo = () => {
	// 	const { serverTimestamp } = firebase.firestore.FieldValue;
	// 	userDataRef.add({
	// 		uid: uid,
	// 		type: "TODO",
	// 		createdAt: serverTimestamp(),
	// 		name: "Name of todo",
	// 		priority: 5,
	// 		iscomplete: false,
	// 		repetition: "",
	// 		rep_blacklist: "",
	// 	});
	// };

	// let addtestevent = () => {
	// 	const { serverTimestamp } = firebase.firestore.FieldValue;
	// 	userDataRef.add({
	// 		uid: uid,
	// 		type: "EVENT",
	// 		createdAt: serverTimestamp(),
	// 		time: "",
	// 		ends: "",
	// 		repetition: "",
	// 		rep_blacklist: "",
	// 	});
	// };

	return (
		<div>
			{/* <p
				onClick={() => addtesttodo()}
				style={{
					backgroundColor: "red",
					width: "5vw",
					position: "absolute",
					left: "10vw",
					cursor: "pointer",
					zIndex: "20",
					color: "white",
				}}
			>
				{`Create Todo`}
			</p>
			<p
				onClick={() => addtestevent()}
				style={{
					backgroundColor: "red",
					width: "5vw",
					position: "absolute",
					left: "20vw",
					cursor: "pointer",
					zIndex: "20",
					color: "white",
				}}
			>
				{`Create Event`}
			</p> */}

			{userState ? (
				<MainApplication firebase={firebase} uid={uid} />
			) : (
				<LoginForm firebase={firebase} />
			)}
		</div>
	);
}
export default App;
