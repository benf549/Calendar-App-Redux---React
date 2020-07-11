import React, { useState, useEffect } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import CalendarHead from "./components/CalendarHead";
import EventSpace from "./components/EventSpace";
import CalendarEvent from "./components/CalendarEvent";
import NewEventForm from "./components/NewEventForm";
import NewToDoForm from "./components/NewToDoForm";
import EditPopup from "./components/EditPopup";
import InWeekTDView from "./components/InWeekTDView";
import { ParseResponse } from "./api";
import { ParseFetchData } from "./api/todo";
import ToDoEdit from "./components/ToDoEdit";
import VisualTodo from "./components/VisualTodo";

//this value is the number of milliseconds in a week and it is multiplied by the increment value below. An inc value of zero returns current week. Greater than 0 advances by that number of weeks and less than 0 goes back that number of weeks.
let weekinms = 7 * 24 * 60 * 60 * 1000;

//This function is used to generate an array of the datetimes for the current week being looked at and will take in a date and generate the week associated with that date or null which returns the week based on todays date.
let updateDays = (newweekdate = null) => {
	//This function takes in a day or nothing (to get current week) and returns an array of the days of the current week which is later stored into the 'week' array
	let curr;
	newweekdate ? (curr = new Date(newweekdate)) : (curr = new Date());
	let temp = [];
	let daynum;
	curr.getDay() === 0 ? (daynum = 6) : (daynum = curr.getDay() - 1);
	let first = curr.getDate() - daynum;
	let firstday = new Date(curr.setDate(first));
	for (let i = 0; i <= 6; i++) {
		i === 0
			? temp.push(firstday)
			: temp.push(new Date(curr.setDate(curr.getDate() + 1)));
	}
	return temp;
};

function App() {
	let [areLeftTasksShown, setAreLeftTasksShown] = useState(false);
	let [areRightTasksShown, setAreRightTasksShown] = useState(false);
	let [dayClicked, setDayClicked] = useState("");

	//This function allows the left box to show when a right header clicked and vice versa. Also allows, when one is already shown, if the opposite header is clicked for the current box to be hidden and that header to be shown.
	const handleHeaderClick = (a, b, c, day) => {
		if (!areLeftTasksShown && !areRightTasksShown) {
			a(!c);
			setDayClicked(day);
		} else {
			if (day !== dayClicked) {
				a(true);
				b(false);
			} else {
				a(false);
				b(false);
			}
			setDayClicked(day);
		}
	};

	// defines which dayheaders when clicked summon which todo block.
	let selectForShowTask = (day) => {
		day === "Mon" || day === "Tue" || day === "Wed" || day === "Thu"
			? handleHeaderClick(
					setAreLeftTasksShown,
					setAreRightTasksShown,
					areLeftTasksShown,
					day
			  )
			: handleHeaderClick(
					setAreRightTasksShown,
					setAreLeftTasksShown,
					areRightTasksShown,
					day
			  );
	};

	//This hook controls how many rerenders as well as how many API requests occur. Fetchagain is passed into api functions and only when true will a new request be made. Prevents fetching upon every render of App().
	let [fetchagain, setfetchagain] = useState(false);
	let [fetchtodo, setfetchtodo] = useState(false);

	//Sents the above initialized processed events array equal to a processed response from the API functions. The fetchagain parameter ensures it only runs when we want it to.
	let todoresponse = ParseResponse(fetchagain);
	let processedevents = todoresponse ? todoresponse.processedevents : null;
	let repeatevents = todoresponse ? todoresponse.repeatevents : null;
	// console.log(repeatevents);
	let tododata = ParseFetchData(fetchtodo);

	//initialize the week array to be empty and then fill it below
	let week = [];
	let weekofevents = [[], [], [], [], [], [], []];
	let weekoftodos = [[], [], [], [], [], [], []];

	//Hook used to display the NewEventPopup when popup is true.
	let [popup, setPopup] = useState(false);
	const showNewEventPopUp = () => {
		setPopup(!popup);
	};

	let [showTodo, setShowTodo] = useState(false);

	//Hook used to display the Edit event popup when editevent is true. Event for edit selects the event that will populate the edit event form.
	let [editevent, setEditEvent] = useState(false);
	let [eventforedit, setEventForEdit] = useState(null);
	let [editTodo, setEditTodo] = useState(false);
	let [todoforedit, setTodoForEdit] = useState(null);

	//Takes in an event id to call the
	const showEditEventPopup = (id) => {
		setEventForEdit(id);
		setEditEvent(true);
	};

	const showTodoForEdit = (id) => {
		setTodoForEdit(id);
		setEditTodo(true);
	};

	//hides the hideEditEventPopup
	const hideEditEventPopup = () => {
		setEditEvent(false);
		setEventForEdit(null);
	};

	const hideEditToDoPopup = () => {
		setEditTodo(false);
		setTodoForEdit(null);
	};

	//Hook for incrementing the counter to advance pages in the calendar.
	let [inc, setinc] = useState(0);

	//Here we fill the week array with the update days function which is defined above.
	week = updateDays();
	let nextweek = updateDays(new Date().getTime + weekinms);

	let tempDate = new Date();
	let daynum;
	//this allows sunday to be the last index in the array rather than the first.
	switch (tempDate.getDay()) {
		case 0:
			daynum = 6;
			break;
		default:
			daynum = tempDate.getDay() - 1;
			break;
	}

	//daynum just gives the day of the week
	let dayforadd = week[daynum];
	week = [];
	week = updateDays(dayforadd.getTime() + weekinms * inc);
	nextweek = updateDays(dayforadd.getTime() + weekinms * (inc + 1));

	//these functions are called on click of the FA arrows that allow for the week to be advanced
	let increment = () => {
		setinc(inc + 1);
	};
	let deincrement = () => {
		setinc(inc - 1);
	};
	//function resets the calendar to the current week.
	let reset = () => {
		setinc(0);
	};

	// going through each event in the event dictionary and checking if the event date (event.time) is the same date as a day in the week array.
	if (processedevents) {
		//console.log(processedevents)
		for (let i = 0; i < processedevents.length; i++) {
			let parsedtemp = processedevents[i].eventday;
			//now that the dates in the week have been determined, for every event as called above, we check if the event falls on any date in the current week.
			for (let z = 0; z < week.length; z++) {
				let day = week[z];
				if (
					parsedtemp.getDate() === day.getDate() &&
					parsedtemp.getMonth() === day.getMonth() &&
					parsedtemp.getFullYear() === day.getFullYear()
				) {
					//checks if the event its looking at is in the week, on the month, of the year and if it is, checks the overflow array for the same event
					weekofevents[day.getDay()].push(
						<CalendarEvent
							key={processedevents[i].key}
							totaltop={processedevents[i].totaltop}
							totalheight={processedevents[i].totalheight}
							title={processedevents[i].title}
							repeator={processedevents[i].repeator}
							number={processedevents[i].id}
							deletefun={setfetchagain}
							showEditEventPopup={showEditEventPopup}
							startDT={processedevents[i].ostarted}
							stopDT={processedevents[i].oended}
						/>
					);
				}
			}
		}
		//This block reads all the repeatevents and if they fit the criteria for the week being looked at are added to the weekofevents array.
		for (let y = 0; y < repeatevents.length; y++) {
			let truecodes = ["M", "T", "W", "R", "F", "S", "D"];

			// Parse the event's repetition code.
			let eventcode = repeatevents[y].repeatstruct.split(";");
			let number_to_skip = parseInt(eventcode[1]);
			// let skip_frequency = eventcode[2];
			let endtime = new Date(parseInt(eventcode[3]));
			let daycodes = eventcode[0].split("");

			let thistime = repeatevents[y].ostarted;
			let initial_repeat_week = updateDays(parseInt(thistime));

			// These are used to allow for events that repeat any number of weeks.
			let calc1 = week[6].setHours(0, 0, 0, 0);
			let calc2 = initial_repeat_week[6].setHours(0, 0, 0, 0);

			//loop throught the given week and if the day of the week is after the repeat event check each day in the daycodes.
			//If a day in daycodes matches a given day in the week which is after the event, we will push it into the week of events array.
			//When an event should not repeat every week take the frequency and multiply it by weekinms and check to see if that frequency of weeks has passed since the first event before pushing.
			//The last component of the code checks to see if the day being looked at for a potential event push is after the end date parsed from the end and if it is, the event is not pushed into the array.
			for (let z = 0; z < week.length; z++) {
				let day = week[z];
				for (let d = 0; d < daycodes.length; d++) {
					if (
						day.getTime() > thistime &&
						truecodes[z] === daycodes[d] &&
						((calc1 - calc2) / weekinms) % number_to_skip === 0 &&
						!(week[z].setHours(0, 0, 0, 0) > endtime.setHours(0, 0, 0, 0))
					) {
						weekofevents[day.getDay()].push(
							<CalendarEvent
								key={`${repeatevents[y].key}.${daycodes[d]}`}
								totaltop={repeatevents[y].totaltop}
								totalheight={repeatevents[y].totalheight}
								title={repeatevents[y].title}
								repeator={repeatevents[y].repeator}
								number={repeatevents[y].id}
								deletefun={setfetchagain}
								showEditEventPopup={showEditEventPopup}
								startDT={repeatevents[y].ostarted}
								stopDT={repeatevents[y].oended}
							/>
						);
					}
				}
			}
		}
	}
	// repeat the procedure used above for todos
	if (tododata) {
		for (let x = 0; x < tododata.length; x++) {
			let itemtime = tododata[x].time;

			for (let d = 0; d < week.length; d++) {
				let day = week[d];
				if (
					itemtime.getDate() === day.getDate() &&
					itemtime.getMonth() === day.getMonth() &&
					itemtime.getFullYear() === day.getFullYear()
				) {
					weekoftodos[day.getDay()].push(
						<VisualTodo
							key={tododata[x].id}
							time={tododata[x].time}
							name={tododata[x].name}
							priority={tododata[x].priority}
							iscomplete={tododata[x].iscomplete}
							day={day}
							selectForShowTask={selectForShowTask}
						/>
					);
				}
			}
		}
	}

	//determines the month of the first day in the week event and allows this to be displayed at the top of the calendar.
	//This performs the formatting for the month name at the top of the page.
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let month = months[week[0].getMonth()];
	let monthyear = `${month} ${week[0].getFullYear()}`;

	//Listen for right and left arrow key presses to advance or de-advance the calendar pages
	useEffect(() => {
		const handleRight = (event) => {
			if (
				!popup &&
				!editevent &&
				!editTodo &&
				!showTodo &&
				event.keyCode === 39
			) {
				setinc(inc + 1);
			}
		};
		const handleLeft = (event) => {
			if (
				!popup &&
				!editevent &&
				!editTodo &&
				!showTodo &&
				event.keyCode === 37
			) {
				setinc(inc - 1);
			}
		};
		window.addEventListener("keydown", handleLeft);
		window.addEventListener("keydown", handleRight);
		return () => {
			window.removeEventListener("keydown", handleRight);
			window.removeEventListener("keydown", handleLeft);
		};
	}, [inc, popup, editevent, editTodo, showTodo]);

	return (
		<div className="App">
			<div className="topmostwrapper">
				<div className="leftbutton" onClick={deincrement}>
					<i className="fas fa-chevron-left"></i>
				</div>
				<div className="content">
					<div className="topinfo">
						<i className="fas fa-bars hamburger"></i>
						<h1 id="month">{monthyear}</h1>
						<p className="resetbtn" onClick={reset}>
							Today
						</p>
					</div>
					<div className="upper">
						<CalendarHead
							weekdays={week}
							selectForShowTask={selectForShowTask}
						/>
					</div>
					<div className="lower">
						<div className="scrollcontainercontainer">
							<div className="scrollcontainer">
								<div
									className={`todoContainers rightTodo ${
										areLeftTasksShown ? "rightTodoShow" : null
									}`}
								>
									<span onClick={() => setAreLeftTasksShown(false)}>
										<i className="fas fa-times"></i>
									</span>
									<InWeekTDView
										dayClicked={dayClicked}
										week={week}
										nextweek={nextweek}
										data={tododata}
										setfetchtodo={setfetchtodo}
										setShowTodo={setShowTodo}
										areLeftTasksShown={areLeftTasksShown}
										areRightTasksShown={areRightTasksShown}
										showTodoForEdit={showTodoForEdit}
									/>
								</div>
								<div
									className={`todoContainers leftTodo ${
										areRightTasksShown ? "leftTodoShow" : null
									}`}
								>
									<span onClick={() => setAreRightTasksShown(false)}>
										<i className="fas fa-times"></i>
									</span>
									<InWeekTDView
										dayClicked={dayClicked}
										week={week}
										nextweek={nextweek}
										data={tododata}
										setfetchtodo={setfetchtodo}
										setShowTodo={setShowTodo}
										showTodoForEdit={showTodoForEdit}
									/>
								</div>
								<div className="scroller">
									<Calendar />
									<EventSpace
										weekofevents={weekofevents}
										weekoftodos={weekoftodos}
										week={week}
									/>
								</div>
							</div>
						</div>

						<div
							className="neweventpopup"
							style={{ display: popup ? "inline-block" : "none" }}
						>
							<div className="topbar">
								<h3>Add a New Event</h3>
								<span className="closepopup" onClick={showNewEventPopUp}>
									<i className="fas fa-times"></i>
								</span>
							</div>
							<NewEventForm
								setfetchagain={setfetchagain}
								setPopup={setPopup}
								showPopup={popup}
							/>
						</div>
						<div
							className="neweventpopup"
							style={{ display: editevent ? "inline-block" : "none" }}
						>
							<div className="topbar">
								<h3>Edit an Event</h3>
								<span className="closepopup" onClick={hideEditEventPopup}>
									<i className="fas fa-times"></i>
								</span>
							</div>
							<EditPopup
								eventforedit={eventforedit}
								eventlist={processedevents}
								editevent={editevent}
								hidepopup={hideEditEventPopup}
								refresh={setfetchagain}
							/>
						</div>
						<div
							className="neweventpopup"
							id="addtodo"
							style={{ display: showTodo ? "inline-block" : "none" }}
						>
							<div className="topbar">
								<h3>Add a New To-Do</h3>
								<span className="closepopup" onClick={() => setShowTodo(false)}>
									<i className="fas fa-times"></i>
								</span>
							</div>
							<NewToDoForm
								setfetchtodo={setfetchtodo}
								setPopup={setShowTodo}
								showPopup={showTodo}
							/>
						</div>
						<div
							className="neweventpopup"
							id="edittodo"
							style={{ display: editTodo ? "inline-block" : "none" }}
						>
							<div className="topbar">
								<h3>Edit To-Do</h3>
								<span className="closepopup" onClick={hideEditToDoPopup}>
									<i className="fas fa-times"></i>
								</span>
							</div>
							<ToDoEdit
								todoforedit={todoforedit}
								tododata={tododata}
								editTodo={editTodo}
								hidepopup={hideEditToDoPopup}
								refresh={setfetchtodo}
							/>
						</div>
						<div
							className="neweventcircle"
							onClick={showNewEventPopUp}
							style={areLeftTasksShown ? { right: "28%" } : { right: "1%" }}
						>
							<i className="fas fa-plus"></i>
						</div>
					</div>
				</div>
				<div className="rightbutton" onClick={increment}>
					<i className="fas fa-chevron-right"></i>
				</div>
			</div>
		</div>
	);
}

export default App;
