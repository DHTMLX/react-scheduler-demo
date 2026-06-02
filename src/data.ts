import type { SchedulerEvent } from "./types";

export function getInitialEvents(): SchedulerEvent[] {
	const initialEvents: SchedulerEvent[] = [
		{
			start_date: "2027-06-10 6:00",
			end_date: "2027-06-10 8:00",
			text: "Event 1",
			id: 1,
		},
		{
			start_date: "2027-06-12 10:00",
			end_date: "2027-06-12 18:00",
			text: "Event 2",
			id: 2,
		},
	];
	return initialEvents;
}
