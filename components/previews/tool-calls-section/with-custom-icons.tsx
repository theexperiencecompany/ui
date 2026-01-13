"use client";

import { ToolCallsSection } from "@/registry/new-york/ui/tool-calls-section";

// Example with custom integration icons - Linear, GitHub, Slack
const sampleToolCalls = [
	{
		tool_name: "create_issue",
		tool_category: "linear",
		message: "Created issue LIN-1234",
		integration_name: "Linear",
		inputs: { title: "Fix login bug", priority: "high" },
		output: "Issue created: LIN-1234",
	},
	{
		tool_name: "search_repos",
		tool_category: "github",
		message: "Searched public repositories",
		integration_name: "GitHub",
		inputs: { query: "react hooks" },
	},
	{
		tool_name: "send_message",
		tool_category: "slack",
		message: "Sent message to #engineering channel",
		integration_name: "Slack",
		output: "Message delivered to 24 members.",
	},
	{
		tool_name: "retrieve_tools",
		tool_category: "retrieve_tools",
		message: "Loaded 12 available tools",
		show_category: false,
	},
	{
		tool_name: "handoff",
		tool_category: "handoff",
		message: "Delegated to code review agent",
		show_category: false,
	},
];

export default function ToolCallsSectionCustomIcons() {
	return (
		<div className="flex justify-center p-4 bg-white dark:bg-zinc-950 rounded-xl">
			<ToolCallsSection toolCalls={sampleToolCalls} />
		</div>
	);
}
