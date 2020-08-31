import React from "react";

let LoginForm = ({ firebase }) => {
	const provider = new firebase.auth.GoogleAuthProvider();

	return (
		<div>
			<button onClick={() => firebase.auth().signInWithPopup(provider)}>
				Log In With Google
			</button>
		</div>
	);
};

export default LoginForm;
