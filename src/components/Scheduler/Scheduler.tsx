import { useEffect, useRef } from "react";
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
import type {
	DataUpdateHandler,
	SchedulerAction,
	SchedulerEvent,
	SchedulerEventId,
} from "../../types";

interface SchedulerViewProps {
	initialEvents: SchedulerEvent[];
	timeFormatState: boolean;
	onDataUpdated: DataUpdateHandler;
}

type SchedulerInstance = ReturnType<typeof Scheduler.getSchedulerInstance>;

function setHoursScaleFormat(
	scheduler: SchedulerInstance,
	useTwentyFourHourFormat: boolean,
) {
	scheduler.config.hour_date = useTwentyFourHourFormat ? "%H:%i" : "%g:%i %A";
	scheduler.templates.hour_scale = scheduler.date.date_to_str(
		scheduler.config.hour_date,
	);
	scheduler.render();
}

export default function SchedulerView({
	initialEvents,
	timeFormatState,
	onDataUpdated,
}: SchedulerViewProps) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const schedulerRef = useRef<SchedulerInstance | null>(null);
	const onDataUpdatedRef = useRef(onDataUpdated);

	useEffect(() => {
		onDataUpdatedRef.current = onDataUpdated;
	}, [onDataUpdated]);

	useEffect(() => {
		if (!containerRef.current) {
			return;
		}

		const scheduler = Scheduler.getSchedulerInstance();
		schedulerRef.current = scheduler;

		scheduler.skin = "terrace";
		scheduler.config.header = [
			"day",
			"week",
			"month",
			"date",
			"prev",
			"today",
			"next",
		];
		scheduler.config.hour_date = "%g:%i %A";
		scheduler.xy.scale_width = 70;

		scheduler.init(containerRef.current, new Date(2027, 5, 10));
		scheduler.clearAll();
		scheduler.parse(initialEvents);
		scheduler.createDataProcessor((_type: string, action: string, item: unknown, id: unknown) => {
			onDataUpdatedRef.current(
				action as SchedulerAction,
				item as SchedulerEvent,
				id as SchedulerEventId,
			);
			return Promise.resolve();
		});

		return () => {
			scheduler.destructor();
			schedulerRef.current = null;
			if (containerRef.current) {
				containerRef.current.innerHTML = "";
			}
		};
	}, [initialEvents]);

	useEffect(() => {
		if (!schedulerRef.current) {
			return;
		}

		setHoursScaleFormat(schedulerRef.current, timeFormatState);
	}, [timeFormatState]);

	return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
