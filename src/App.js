import { useState } from "react";
import { getData } from "./data.js";
import Scheduler from "./components/Scheduler";
import Toolbar from "./components/Toolbar";
import MessageArea from "./components/MessageArea";
import "./App.css";

function App() {
	const [currentTimeFormatState, setTimeFormat] = useState(true);
	const [messages, setMessages] = useState([]);

	function addMessage(message) {
		setMessages((arr) => [...arr, message]);
	}

	function logDataUpdate(action, ev, id) {
		const text = ev && ev.text ? ` (${ev.text})` : "";
		const message = `event ${action}: ${id} ${text}`;
		addMessage(message);
	}

	return (
		<div>
			<div className="tool-bar">
				<Toolbar
					timeFormatState={currentTimeFormatState}
					onTimeFormatStateChange={setTimeFormat}
				/>
			</div>
			<div className="scheduler-container">
				<Scheduler
					events={getData()}
					timeFormatState={currentTimeFormatState}
					onDataUpdated={logDataUpdate}
				/>
			</div>
			<MessageArea messages={messages} />
		</div>
	);
}
export default App;
