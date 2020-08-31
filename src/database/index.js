import { useState, useEffect } from "react";
import firebase from "../firebase";

let userDataRef = firebase.firestore().collection("userdata");
const { serverTimestamp } = firebase.firestore.FieldValue;

export function FetchData(uid) {
	const [userData, setUserData] = useState([]);
	let userEvents = [];
	let userTodos = [];

	useEffect(() => {
		if (uid) {
			console.log("rendering");
			const unsubscribe = firebase
				.firestore()
				.collection("userdata")
				.where("uid", "==", uid)
				.onSnapshot((querySnapshot) => {
					if (querySnapshot.size) {
						const data = querySnapshot.docs.map((doc) => {
							let id = doc.id;
							let data = doc.data();
							return { id, ...data };
						});
						setUserData(data);
					}
				});

			return () => unsubscribe();
		}
	}, [uid]);

	userData.forEach((item) =>
		item.type === "EVENT" ? userEvents.push(item) : userTodos.push(item)
	);
	return { userEvents, userTodos };
}

export function ParseEventResponse(uid) {
	const response = FetchData(uid).userEvents;
	console.log(response);

	if (response.length) {
		let processedevents = [];
		let repeatevents = [];

		let processoverflow = (
			t,
			parsed,
			minbetweenheight,
			totaltop,
			pusharray
		) => {
			let overflow = minbetweenheight + totaltop - 150;
			if (overflow > 0) {
				//if there is an overflow trim the original event and push it into the array
				pusharray.push({
					daystoadd: 0,
					key: response[t].id,
					totaltop: totaltop,
					totalheight: 150 - totaltop,
					title: response[t].name,
					eventday: parsed,
					repeator: 1,
					id: response[t].id,
					ostarted: response[t].time,
					oended: response[t].ends,
					repeatstruct: response[t].repetition,
					blacklist: response[t].rep_blacklist,
				});
				let count = 1;
				//while the overflow is > 0, push the event into an array, if its >150vh, trim it and set its day to be 24hrs after the original event. the number of times through the while loop sets number of days to add to event.
				while (overflow > 0) {
					pusharray.push({
						key: `${response[t].id}:${count}`,
						totaltop: 0,
						totalheight: overflow > 150 ? 150 : overflow,
						title: response[t].name,
						eventday: new Date(parsed.getTime() + 864e5 * count),
						repeator: 0,
						daystoadd: count,
						id: response[t].id,
						ostarted: response[t].time,
						oended: response[t].ends,
						repeatstruct: response[t].repetition,
						blacklist: response[t].rep_blacklist,
					});
					count += 1;
					overflow -= 150;
				}
			} else {
				//if there is no overflow, just push the event into the array wuthout changing it and add calculated top and height distances.
				pusharray.push({
					daystoadd: 0,
					key: response[t].id,
					totaltop: totaltop,
					totalheight: minbetweenheight,
					title: response[t].name,
					eventday: parsed,
					id: response[t].id,
					ostarted: response[t].time,
					oended: response[t].ends,
					repeatstruct: response[t].repetition,
					blacklist: response[t].rep_blacklist,
				});
			}
		};

		for (let t = 0; t < response.length; t++) {
			//calculate the height of each event and if the height of the event+distance from top is > 150 vh, we push it into the array and trim height, then for the number of times the
			let parsed = new Date(parseInt(response[t].time));
			let hourtop = parsed.getHours() * 6.25;
			let minutetop = parsed.getMinutes() * 0.104167;
			let totaltop = hourtop + minutetop;
			let parsed2 = new Date(parseInt(response[t].ends));
			let msbetween = Math.abs(parsed2 - parsed);
			let minbetweenheight = (msbetween / 60000) * 0.104167;

			if (response[t].repetition) {
				processoverflow(t, parsed, minbetweenheight, totaltop, repeatevents);
			}
			processoverflow(t, parsed, minbetweenheight, totaltop, processedevents);
		}
		//console.log({ processedevents, repeatevents });
		return { processedevents, repeatevents };
	}
}

export function PostEventData({ uid, newName, start, end, repetition_code }) {
	userDataRef.add({
		uid: uid,
		type: "EVENT",
		name: newName,
		createdAt: serverTimestamp(),
		time: start,
		ends: end,
		repetition: repetition_code,
		rep_blacklist: "",
	});
}

export function DeleteEventRequest(key) {
	userDataRef
		.doc(key)
		.delete()
		.then(() => {
			console.log("success");
		})
		.catch((e) => {
			console.log("Event could not be deleted: \n", e);
		});
}

export function PutEventRequest(
	eventforedit,
	newName,
	start,
	end,
	repetition_code,
	blacklistday
) {
	userDataRef.doc(eventforedit).update({
		name: newName,
		time: start,
		ends: end,
		repetition: repetition_code,
		rep_blacklist: blacklistday,
	});
}

export function ParseTodoResponse(uid) {
	const response = FetchData(uid).userTodos;
	let processedtodos = [];
	if (response.length) {
		for (let t = 0; t < response.length; t++) {
			let parsedtime = new Date(parseInt(response[t].time));
			processedtodos.push({
				id: response[t].id,
				time: parsedtime,
				name: response[t].name,
				priority: response[t].priority,
				iscomplete: response[t].iscomplete,
			});
		}
	}
	//console.log(processedtodos);
	return processedtodos;
}

export function PostToDoData({ uid, newName, time, priority }) {
	userDataRef.add({
		createdAt: serverTimestamp(),
		uid: uid,
		type: "TODO",
		name: newName,
		time: time,
		priority: priority,
		iscomplete: false,
	});
}

export function PutToDoRequest(id, newName, start, priority, iscomplete) {
	userDataRef.doc(id).update({
		name: newName,
		time: start,
		priority: priority,
		iscomplete: iscomplete,
	});
}

export function DeleteToDoRequest(id) {
	userDataRef
		.doc(id)
		.delete()
		.then(() => {
			console.log("success");
		})
		.catch((e) => {
			console.log("Event could not be deleted: \n", e);
		});
}
