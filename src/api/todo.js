// import { useState, useEffect } from "react";
// import { urlpart } from "../api";

// const URL = `${urlpart}/todo_database`;
// let firstRender = true;

// export default function FetchData(fetchagain) {
// 	const [special, setSpecial] = useState([]);
// 	useEffect(() => {
// 		let doFetch = async () => {
// 			try {
// 				const response = await fetch(URL);
// 				const json = await response.json();
// 				console.log(json);
// 				setSpecial(json);
// 			} catch (e) {
// 				console.log(`There was an error in fetching from api... \n ${e}`);
// 			}
// 		};
// 		if (fetchagain || firstRender) {
// 			console.log("api fetch just ran");
// 			doFetch();
// 		}
// 	}, [fetchagain]);
// 	return special;
// }

// export function ParseFetchData(fetchagain) {
// 	let processedtodos = [];
// 	let response = FetchData(fetchagain);

// 	if (response.length) {
// 		if (firstRender) {
// 			firstRender = false;
// 		}
// 		for (let t = 0; t < response.length; t++) {
// 			let parsedtime = new Date(parseInt(response[t].time));
// 			processedtodos.push({
// 				id: response[t].id,
// 				time: parsedtime,
// 				name: response[t].name,
// 				priority: response[t].priority,
// 				iscomplete: response[t].iscomplete,
// 			});
// 		}
// 	}

// 	return processedtodos;
// }

// export function DeleteTodo(id, setfetchagain) {
// 	setfetchagain(false);
// 	const requestOptions = {
// 		method: "delete",
// 	};
// 	fetch(URL + "/" + id, requestOptions)
// 		.then((response) => response.json())
// 		.then((data) => {
// 			if (data) {
// 				setfetchagain(true);
// 			}
// 		});
// }

// export function PostToDo({ newName, time, setfetchtodo, priority }) {
// 	setfetchtodo(false);
// 	const requestOptions = {
// 		method: "post",
// 		headers: { "content-type": "application/json" },
// 		body: JSON.stringify({
// 			name: newName,
// 			time: time,
// 			priority: priority,
// 			iscomplete: false,
// 		}),
// 	};

// 	fetch(URL, requestOptions)
// 		.then((response) => response.json())
// 		.then((data) => {
// 			if (data) {
// 				setfetchtodo(true);
// 			}
// 		});
// }

// export function PutToDo(
// 	id,
// 	setfetchagain,
// 	newName,
// 	start,
// 	priority,
// 	iscomplete
// ) {
// 	setfetchagain(false);
// 	const requestOptions = {
// 		method: "put",
// 		headers: { "content-type": "application/json" },
// 		body: JSON.stringify({
// 			name: newName,
// 			time: start,
// 			priority: priority,
// 			iscomplete: iscomplete,
// 		}),
// 	};
// 	fetch(URL + "/" + id.toString(), requestOptions)
// 		.then((response) => response.json())
// 		.then((data) => {
// 			if (data) {
// 				setfetchagain(true);
// 			}
// 		});
// }
