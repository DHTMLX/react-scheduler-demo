import { render, screen } from "@testing-library/react";
import MessageArea from "./MessageArea";
import type { MessageLogItem } from "../../types";

test("renders message log items using their text", () => {
	const messages: MessageLogItem[] = [
		{ id: "1", text: "event inserted: 1 (Event 1)", createdAt: 1 },
		{ id: "2", text: "event updated: 2 (Event 2)", createdAt: 2 },
	];

	render(<MessageArea messages={messages} />);

	expect(screen.getByText("event inserted: 1 (Event 1)")).toBeInTheDocument();
	expect(screen.getByText("event updated: 2 (Event 2)")).toBeInTheDocument();
});
