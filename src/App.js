import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "./firebase";
import "firebase/auth";
import MainApplication from "./components/MainApplication";
import LoginForm from "./components/LoginForm";

function App() {
	const [userstate, setuserstate] = useState(false);
	const provider = new firebase.auth.GoogleAuthProvider();
	let db = firebase.firestore();

	firebase.auth().onAuthStateChanged((user) => {
		//If user is logged in the userstate is set to true when logged out its set to false.
		if (user) {
			setuserstate(true);
			//console.log(user.uid);
			// thingsRef = db.collection("Users");
		} else {
			setuserstate(false);
		}
	});

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				const unsubscribe = db
					.collection("users")
					.where("uid", "==", user.uid)
					.onSnapshot((querySnapshot) => {
						const newTimes = querySnapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}));
						console.log(newTimes);
						// if (!querySnapshot.exists) {
						// 	// something here is looping and making a crazy number of calls
						// 	// db.collection("users").add({
						// 	// 	uid: user.uid,
						// 	// 	displayName: user.displayName,
						// 	// 	email: user.email,
						// 	// });
						// 	console.log("nothing in users");
						// } else {
						// 	// querySnapshot.docs.map((doc) => {
						// 	// 	console.log(doc.data());
						// 	// });
						// 	console.log("fart");
						// }
					});
			}
		});
	}, []);

	// useEffect(() => {
	// 	const unsubscribe = firebase
	// 		.firestore()
	// 		.collection("Users")
	// 		.doc("6tQ2dCnNsPY3RDlw0o9l") //this is where the users individual id is entered to get the events associated with their account.
	// 		.collection("Events")
	// 		.onSnapshot((snapshot) => {
	// 			//snapshot opens a websocket to firestore which allows constant listening for updates to the database.
	// 			const newTimes = snapshot.docs.map((doc) => ({
	// 				id: doc.id,
	// 				...doc.data(),
	// 			}));
	// 			setfartData(newTimes);
	// 		});

	// 	return () => unsubscribe(); //closes open socket when the component is unmounted.
	// }, []);

	// let test_log = () => {
	// 	console.log(fart_data);
	// };

	return (
		<div>
			{/* <button onClick={() => test_log()} style={{ zIndex: 20 }}>
				log
			</button> */}
			{userstate ? (
				<div>
					<button
						onClick={() => firebase.auth().signOut()}
						style={{ zIndex: 20 }}
					>
						Log Out
					</button>
					<MainApplication />
				</div>
			) : (
				<button
					onClick={() => firebase.auth().signInWithPopup(provider)}
					style={{ color: "white", backgroundColor: "blue" }}
				>
					Google Log In
				</button>
			)}
			;{/* <LoginForm auth={auth} provider={provider} /> */}
		</div>
	);
}
export default App;
