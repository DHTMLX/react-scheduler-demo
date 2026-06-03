export type SchedulerEventId = string | number;

export type SchedulerAction =
	| "inserted"
	| "updated"
	| "deleted"
	| (string & {});

export interface SchedulerEvent {
	id: SchedulerEventId;
	text?: string;
	start_date: string | Date;
	end_date: string | Date;
	[key: string]: unknown;
}

export type DataUpdateHandler = (
	action: SchedulerAction,
	event: SchedulerEvent,
	id: SchedulerEventId,
) => void;

export interface MessageLogItem {
	id: string;
	text: string;
	createdAt: number;
}
