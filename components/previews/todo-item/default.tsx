"use client";

import { TodoItem } from "@/registry/new-york/ui/todo-item";

// Static date for demo purposes - avoids React purity rules
const DEMO_TOMORROW = new Date("2025-12-16T00:00:00Z");

export default function TodoItemDefault() {
	return (
		<div className="flex justify-center w-full max-w-2xl mx-auto">
			<TodoItem
				id="1"
				title="Review pull requests"
				description="Check and review the pending pull requests on GitHub"
				completed={false}
				priority="high"
				dueDate={DEMO_TOMORROW}
				labels={[
					{ id: "1", name: "Development", color: "#3b82f6" },
					{ id: "2", name: "Urgent" },
				]}
				subtasks={[
					{ id: "1", title: "Review PR #123", completed: true },
					{ id: "2", title: "Review PR #124", completed: false },
				]}
				project={{ id: "1", name: "GAIA UI", color: "#8b5cf6" }}
			/>
		</div>
	);
}
