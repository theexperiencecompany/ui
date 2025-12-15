"use client";

import {
	SlashCommandDropdown,
	type SlashCommandMatch,
} from "@/registry/new-york/ui/slash-command-dropdown";
import { useState, useRef } from "react";
import { Button } from "@heroui/react";
import { HugeiconsIcon, PlusSignIcon } from "@/components/icons";

// Sample tools data
const TOOLS = [
	{
		name: "linear_create_issue",
		category: "linear",
		description: "Create a new issue in Linear",
	},
	{
		name: "linear_search_issues",
		category: "linear",
		description: "Search for existing issues",
	},
	{
		name: "github_pull_request",
		category: "github",
		description: "Create or view pull requests",
	},
	{
		name: "github_search_repos",
		category: "github",
		description: "Search repositories",
	},
	{
		name: "google_calendar_schedule",
		category: "google_calendar",
		description: "Schedule a meeting",
	},
	{
		name: "notion_create_page",
		category: "notion",
		description: "Create a new page in Notion",
	},
	{
		name: "slack_send_message",
		category: "slack",
		description: "Send a message to a channel",
	},
	{
		name: "gmail_send_email",
		category: "gmail",
		description: "Compose and send an email",
	},
];

export default function SlashCommandDropdownPreview() {
	const [isVisible, setIsVisible] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedIndex] = useState(0);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const matches: SlashCommandMatch[] = TOOLS.map((tool) => ({
		tool,
		score: 1,
	}));

	const handleSelect = (match: SlashCommandMatch) => {
		console.log("Selected:", match.tool.name);
		setIsVisible(false);
	};

	const toggleDropdown = () => {
		setIsVisible(!isVisible);
	};

	return (
		<div className="w-full h-[400px] relative flex items-center justify-center bg-zinc-950 p-6 rounded-3xl border border-zinc-800">
			<div className="flex flex-col items-center gap-4">
				<p className="text-zinc-400 text-sm mb-4">
					Click the button to open the tool menu
				</p>

				<div className="relative">
					<Button
						ref={buttonRef}
						onPress={toggleDropdown}
						color="primary"
						startContent={<HugeiconsIcon icon={PlusSignIcon} size={20} />}
						className="rounded-full"
					>
						Add Tool
					</Button>

					<SlashCommandDropdown
						matches={matches}
						selectedIndex={selectedIndex}
						onSelect={handleSelect}
						onClose={() => setIsVisible(false)}
						position={{
							top: undefined,
							left: 0,
							width: 320,
						}}
						isVisible={isVisible}
						openedViaButton={true}
						selectedCategory={selectedCategory}
						onCategoryChange={setSelectedCategory}
						className="absolute top-12 left-0 mt-2"
						style={{
							maxHeight: "300px",
							position: "absolute",
						}}
					/>
				</div>
			</div>
		</div>
	);
}
