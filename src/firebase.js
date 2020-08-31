import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/auth";

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.19.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.19.0/firebase-analytics.js"></script>
// <script src="https://www.gstatic.com/firebasejs/7.19.0/firebase-firestore.js"></script>
// <script src="https://www.gstatic.com/firebasejs/7.19.0/firebase-auth.js"></script>

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyDG8C-YqLZvXyabAXSsoFxEVkOBYxkxP10",
	authDomain: "calendar-app-880a3.firebaseapp.com",
	databaseURL: "https://calendar-app-880a3.firebaseio.com",
	projectId: "calendar-app-880a3",
	storageBucket: "calendar-app-880a3.appspot.com",
	messagingSenderId: "134353345694",
	appId: "1:134353345694:web:406aee25a1de5a58172f8f",
	measurementId: "G-MHN5LGPG1N",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
