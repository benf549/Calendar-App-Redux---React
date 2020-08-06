import { useState, useEffect } from "react";

//export const urlpart = "https://bea2d42c6755.ngrok.io";
export const urlpart = "http://localhost:5000";

const URL = `${urlpart}/task_database`;
let firstRender = true;

export function FetchData(fetchagain) {
	const [special, setSpecial] = useState([]);
	useEffect(() => {
		let doFetch = async () => {
			try {
				const response = await fetch(URL);
				const json = await response.json();
				console.log(json);
				setSpecial(json);
			} catch (e) {
				console.log(`There was an error in fetching from api... \n ${e}`);
			}
		};

		if (fetchagain || firstRender) {
			console.log("fetchdata just ran");
			doFetch();
		}
	}, [fetchagain]);
	return special;
}

export function ParseResponse(fetchagain) {
	const response = FetchData(fetchagain);
	let processedevents = [];
	let repeatevents = [];

	let processoverflow = (t, parsed, minbetweenheight, totaltop, pusharray) => {
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

	if (response.length) {
		if (firstRender) {
			console.log("Captain, We Have Data!");
			firstRender = false;
		}

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
		console.log({ processedevents, repeatevents });
		return { processedevents, repeatevents };
	}
}

export function PostData({
	newName,
	start,
	end,
	setfetchagain,
	repetition_code,
}) {
	setfetchagain(false);
	const requestOptions = {
		method: "post",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			name: newName,
			time: start,
			ends: end,
			repetition: repetition_code,
			rep_blacklist: "",
		}),
	};

	fetch(URL, requestOptions)
		.then((response) => response.json())
		.then((data) => {
			if (data) {
				setfetchagain(true);
			}
		});
}

export function DeleteRequest(key, setfetchagain) {
	setfetchagain(false);
	const requestOptions = {
		method: "delete",
	};
	fetch(URL + "/" + key, requestOptions)
		.then((response) => response.json())
		.then((data) => {
			if (data) {
				setfetchagain(true);
			}
		});
}

export function PutRequest(
	eventforedit,
	newName,
	start,
	end,
	setfetchagain,
	repetition_code,
	blacklistday
) {
	// console.log(`Sending a put request for ${eventforedit} with title ${newName} which starts at ${new Date(start)}, and ends at ${new Date(end)}`)
	setfetchagain(false);
	const requestOptions = {
		method: "put",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			name: newName,
			time: start,
			ends: end,
			repetition: repetition_code,
			rep_blacklist: blacklistday,
		}),
	};
	fetch(URL + "/" + eventforedit.toString(), requestOptions)
		.then((response) => response.json())
		.then((data) => {
			if (data) {
				setfetchagain(true);
			}
		});
}
