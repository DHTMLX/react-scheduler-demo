import type { MessageLogItem } from "../../types";

interface MessageAreaProps {
	messages: MessageLogItem[];
}

export default function MessageArea({ messages }: MessageAreaProps) {
	return (
		<div className="message-area">
			<h3>Messages:</h3>
			<ul>
				{messages.map((message) => (
					<li key={message.id}>{message.text}</li>
				))}
			</ul>
		</div>
	);
}
