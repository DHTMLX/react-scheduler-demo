import type { Dispatch, SetStateAction } from "react";

interface ToolbarProps {
	timeFormatState: boolean;
	onTimeFormatStateChange: Dispatch<SetStateAction<boolean>>;
}

export default function Toolbar({
	timeFormatState,
	onTimeFormatStateChange,
}: ToolbarProps) {
	return (
		<div className="time-format-section">
			<label className="time-format-chkbx">
				Time format:
				<input
					type="checkbox"
					checked={timeFormatState}
					onChange={(event) => onTimeFormatStateChange(event.target.checked)}
				/>
				<div className="chkbx-text"></div>
			</label>
		</div>
	);
}
