import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

vi.mock("./components/Scheduler", () => ({
	default: ({
		onDataUpdated,
	}: {
		onDataUpdated: (
			action: string,
			event: { text?: string },
			id: string | number,
		) => void;
	}) => (
		<button
			type="button"
			onClick={() => onDataUpdated("updated", { text: "Event 2" }, 2)}
		>
			emit update
		</button>
	),
}));

test("appends a typed scheduler update message", async () => {
	const user = userEvent.setup();

	render(<App />);

	await user.click(screen.getByRole("button", { name: /emit update/i }));

	expect(screen.getByText("event updated: 2 (Event 2)")).toBeInTheDocument();
});
