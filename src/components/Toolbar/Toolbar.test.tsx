import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toolbar from "./Toolbar";

test("calls the time-format setter with the checkbox state", async () => {
	const user = userEvent.setup();
	const onTimeFormatStateChange = vi.fn();

	render(
		<Toolbar
			timeFormatState={false}
			onTimeFormatStateChange={onTimeFormatStateChange}
		/>,
	);

	await user.click(screen.getByLabelText(/time format/i));

	expect(onTimeFormatStateChange).toHaveBeenCalledWith(true);
});
