"use client";

import { useState } from "react";
import {
	CalendarEventCard,
	EventTitle,
	EventTime,
	type EventStatus,
} from "@/registry/new-york/ui/calendar-event-card";

export default function CalendarEventCardActions() {
	const [status1, setStatus1] = useState<EventStatus>("idle");
	const [status2] = useState<EventStatus>("completed");
	const [status3, setStatus3] = useState<EventStatus>("idle");

	const handleConfirm = (setStatus: (s: EventStatus) => void) => {
		setStatus("loading");
		setTimeout(() => setStatus("completed"), 1500);
	};

	return (
		<div className="flex flex-col gap-4 w-full max-w-md">
			<CalendarEventCard
				eventColor="#3b82f6"
				variant="action"
				status={status1}
				onAction={() => handleConfirm(setStatus1)}
				label="New Event"
				isDotted
			>
				<EventTitle>Schedule Meeting</EventTitle>
				<EventTime startTime="Tomorrow, 10:00 AM" />
			</CalendarEventCard>

			<CalendarEventCard
				eventColor="#22c55e"
				variant="action"
				status={status2}
				onAction={() => {}}
				completedLabel="Confirmed"
			>
				<EventTitle>Already Confirmed Event</EventTitle>
				<EventTime startTime="Today, 3:00 PM" />
			</CalendarEventCard>

			<CalendarEventCard
				eventColor="#ef4444"
				variant="action"
				status={status3}
				buttonColor="danger"
				onAction={() => handleConfirm(setStatus3)}
			>
				<EventTitle>Cancel Appointment</EventTitle>
				<EventTime startTime="Friday, 2:00 PM" />
			</CalendarEventCard>
		</div>
	);
}
