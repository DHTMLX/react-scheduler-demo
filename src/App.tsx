import { useCallback, useMemo, useRef, useState } from "react";
import { getInitialEvents } from "./data";
import Scheduler from "./components/Scheduler";
import Toolbar from "./components/Toolbar";
import MessageArea from "./components/MessageArea";
import type { DataUpdateHandler, MessageLogItem } from "./types";
import "./App.css";

const MAX_MESSAGES = 100;

function App() {
	const [currentTimeFormatState, setTimeFormat] = useState(true);
	const [messages, setMessages] = useState<MessageLogItem[]>([]);
	const nextMessageId = useRef(0);
	const initialEvents = useMemo(() => getInitialEvents(), []);

	const addMessage = useCallback((text: string) => {
		const message: MessageLogItem = {
			id: String(nextMessageId.current++),
			text,
			createdAt: Date.now(),
		};

		setMessages((items) => [...items, message].slice(-MAX_MESSAGES));
	}, []);

	const logDataUpdate = useCallback<DataUpdateHandler>(
		(action, event, id) => {
			const text = event?.text ? ` (${event.text})` : "";
			addMessage(`event ${action}: ${id} ${text}`);
		},
		[addMessage],
	);

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
					initialEvents={initialEvents}
					timeFormatState={currentTimeFormatState}
					onDataUpdated={logDataUpdate}
				/>
			</div>
			<MessageArea messages={messages} />
		</div>
	);
}

export default App;
