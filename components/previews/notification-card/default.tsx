"use client";

import {
	NotificationCard,
	type ActionType,
} from "@/registry/new-york/ui/notification-card";

// Static dates for demo purposes - avoids React purity rules
const DEMO_DATES = {
	fiveMinutesAgo: new Date("2025-12-15T10:50:00Z"),
	tenMinutesAgo: new Date("2025-12-15T10:45:00Z"),
	twoHoursAgo: new Date("2025-12-15T08:55:00Z"),
};

export default function NotificationCardDefault() {
	const handleAction = (
		notificationId: string,
		actionId: string,
		actionType: ActionType,
	) => {
		console.log("Action:", { notificationId, actionId, actionType });
	};

	const notifications = [
		{
			id: "1",
			title: "New message from Alex",
			body: "Hey! Just wanted to check in on the project status. Can we schedule a quick call?",
			status: "unread" as const,
			createdAt: DEMO_DATES.fiveMinutesAgo,
			actions: [
				{
					id: "reply",
					label: "Reply",
					type: "modal" as ActionType,
					style: "primary" as const,
				},
				{ id: "archive", label: "Archive", type: "api_call" as ActionType },
			],
		},
		{
			id: "2",
			title: "Calendar event reminder",
			body: "Team standup in 15 minutes - Conference Room A",
			status: "unread" as const,
			createdAt: DEMO_DATES.tenMinutesAgo,
			actions: [
				{
					id: "join",
					label: "Join Meeting",
					type: "redirect" as ActionType,
					style: "primary" as const,
				},
				{ id: "snooze", label: "Snooze", type: "api_call" as ActionType },
			],
		},
		{
			id: "3",
			title: "Task completed",
			body: "Your scheduled workflow 'Weekly Report' has finished running.",
			status: "read" as const,
			createdAt: DEMO_DATES.twoHoursAgo,
			actions: [
				{
					id: "view",
					label: "View Report",
					type: "redirect" as ActionType,
					executed: true,
				},
			],
		},
	];

	return (
		<div className="flex flex-col gap-3 w-full max-w-md">
			{notifications.map((notification) => (
				<NotificationCard
					key={notification.id}
					{...notification}
					onMarkAsRead={(id) => console.log("Mark as read:", id)}
					onAction={handleAction}
				/>
			))}
		</div>
	);
}
