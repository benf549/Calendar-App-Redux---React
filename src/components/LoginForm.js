import React from "react";

let LoginForm = ({ firebase }) => {
	const provider = new firebase.auth.GoogleAuthProvider();

	return (
		<div className="logincontainer">
			<div className="logincard">
				<h3>Login to your calendar account.</h3>
				<button className="googlelogin" onClick={() => firebase.auth().signInWithPopup(provider)}>
					<img src="./google.png" alt="" />
					Login With Google
				</button>
			</div>
		</div>
	);
};

export default LoginForm;
