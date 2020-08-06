import React, { useState } from "react";
import { DeleteRequest, PutRequest } from "../api";

let DeletePopup = ({
	showDeletePopup,
	setDP,
	selectedevent,
	setfetchagain,
}) => {
	let [isAselected, setIsASelected] = useState(true);

	let handleclick = () => {
		setDP(false);
		if (selectedevent.repeatstruct) {
			if (isAselected) {
				let blacklistday = selectedevent.day.getTime();
				PutRequest(
					selectedevent.number,
					selectedevent.name,
					selectedevent.start,
					selectedevent.stop,
					setfetchagain,
					selectedevent.repeatstruct,
					`${
						selectedevent.blacklist ? selectedevent.blacklist + ";" : ""
					}${blacklistday}`
				);
			} else {
				DeleteRequest(selectedevent.number, setfetchagain);
			}
		} else {
			DeleteRequest(selectedevent.number, setfetchagain);
		}
	};
	if (selectedevent && selectedevent.repeatstruct) {
		return (
			<div
				className="deletepopupwrapper"
				style={{ display: showDeletePopup ? "inline-block" : "none" }}
			>
				<div className="topbar">
					<span className="closepopup" onClick={() => setDP(false)}>
						<i className="fas fa-times"></i>
					</span>
					<p className="deleteheader">How to Delete?</p>
				</div>
				<div className="deletecontent">
					<div
						className="deleterow"
						onClick={() => setIsASelected(!isAselected)}
					>
						<div className="deleteselect">
							<div
								className="innerdeleteselect"
								style={{ display: isAselected ? "flex" : "none" }}
							></div>
						</div>
						<h5>Just This Event</h5>
					</div>
					<div
						className="deleterow"
						onClick={() => setIsASelected(!isAselected)}
					>
						<div className="deleteselect">
							<div
								className="innerdeleteselect"
								style={{ display: isAselected ? "none" : "flex" }}
							></div>
						</div>
						<h5>All Occurances Of This Event</h5>
					</div>
				</div>
				<div className="deletebottombuttons">
					<h5 id="deleteokay" onClick={() => handleclick()}>
						Okay
					</h5>
				</div>
			</div>
		);
	} else if (selectedevent) {
		return (
			<div
				className="deletepopupwrapper"
				id="nonrepeatordelete"
				style={{ display: showDeletePopup ? "inline-block" : "none" }}
			>
				<div className="topbar">
					<span className="closepopup" onClick={() => setDP(false)}>
						<i className="fas fa-times"></i>
					</span>
					<p className="deleteheader">Delete This Event?</p>
				</div>
				<div className="deletebottombuttons">
					<h5 id="deleteokay" onClick={() => handleclick()}>
						Okay
					</h5>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default DeletePopup;
