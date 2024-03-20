import { useEffect, useRef } from "react";
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default function SchedulerView( {events, timeFormatState, onDataUpdated,} ) {
	let container = useRef();
	useEffect(() => {
		let scheduler = Scheduler.getSchedulerInstance();

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

		scheduler.init(container.current, new Date(2024, 5, 10));
		scheduler.clearAll();
		scheduler.parse(events);

		scheduler.attachEvent("onEventAdded", (id, ev) => {
			if (onDataUpdated) {
				onDataUpdated("create", ev, id);
			}
		});

		scheduler.attachEvent("onEventChanged", (id, ev) => {
			if (onDataUpdated) {
				onDataUpdated("update", ev, id);
			}
		});

		scheduler.attachEvent("onEventDeleted", (id, ev) => {
			if (onDataUpdated) {
				onDataUpdated("delete", ev, id);
			}
		});
        
		function setHoursScaleFormat(state) {
			scheduler.config.hour_date = state ? "%H:%i" : "%g:%i %A";
			scheduler.templates.hour_scale = scheduler.date.date_to_str(
				scheduler.config.hour_date
			);
			scheduler.render();
		}
		setHoursScaleFormat(timeFormatState);
		return () => {
			scheduler.destructor();
			container.current.innerHTML = "";
		};
	}, [timeFormatState]);

	return (
		<div ref={container} style={{ width: "100%", height: "100%" }}></div>
	);
}
