"use client";

import { ToolCallsSection } from "@/registry/new-york/ui/tool-calls-section";

// Example matching the gaia app pattern with calendar, gmail, executor, and handoff
const sampleToolCalls = [
	{
		tool_name: "send_email",
		tool_category: "gmail",
		message: "Sent email to the team",
		integration_name: "Gmail",
		inputs: { to: "team@company.com", subject: "Weekly Update" },
		output: "Email sent successfully to 3 recipients.",
	},
	{
		tool_name: "create_event",
		tool_category: "google_calendar",
		message: "Created meeting for tomorrow at 2 PM",
		integration_name: "Google Calendar",
		inputs: { title: "Team Sync", time: "2:00 PM" },
	},
	{
		tool_name: "executor",
		tool_category: "executor",
		message: "Executed code analysis task",
		show_category: false,
		output: "Analysis complete: 12 files processed.",
	},
	{
		tool_name: "handoff",
		tool_category: "handoff",
		message: "Delegated to scheduling assistant",
		show_category: false,
	},
];

export default function ToolCallsSectionDefault() {
	return (
		<div className="flex justify-center p-4 bg-white dark:bg-zinc-950 rounded-xl">
			<ToolCallsSection toolCalls={sampleToolCalls} defaultExpanded />
		</div>
	);
}
