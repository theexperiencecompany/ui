"use client";

import { EmailComposeCard } from "@/registry/new-york/ui/email-compose-card";

export default function EmailPreviewDefault() {
	return (
		<div className="w-full max-w-lg">
			<EmailComposeCard
				emailData={{
					subject: "Action Required: Project Update",
					body: "Hi team,\n\nPlease review the attached document and provide your feedback by EOD.\n\nThanks,\nAryan",
					to: ["team@example.com", "alice@example.com"],
				}}
				onSend={async (data) => {
					await new Promise((resolve) => setTimeout(resolve, 2000));
					console.log("Sent email:", data);
					alert("Email sent! Check console for data.");
				}}
			/>
		</div>
	);
}
