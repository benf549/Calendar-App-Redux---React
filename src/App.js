import React, { useState } from "react";
import "./App.css";
import firebase from "./firebase";
import "firebase/auth";
import MainApplication from "./components/MainApplication";
import LoginForm from "./components/LoginForm";

function App() {
	const [userState, setUserState] = useState(false);
	const [uid, setUid] = useState("");

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			setUserState(true);
			setUid(user.uid);
		} else {
			setUserState(false);
			setUid("");
		}
	});

	return (
		<div>
			{userState ? (
				<MainApplication firebase={firebase} uid={uid} />
			) : (
				<LoginForm firebase={firebase} />
			)}
		</div>
	);
}
export default App;
