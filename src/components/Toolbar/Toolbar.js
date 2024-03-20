export default function Toolbar({ timeFormatState, onTimeFormatStateChange }) {
	return (
		<div className="time-format-section">
			<label className="time-format-chkbx">
				Time format:
				<input
					type="checkbox"
					checked={timeFormatState}
					onChange={(e) => onTimeFormatStateChange(e.target.checked)}
				/>
				<div className="chkbx-text"></div>
			</label>
		</div>
	);
}
