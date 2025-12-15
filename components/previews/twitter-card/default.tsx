"use client";

import { TwitterCard } from "@/registry/new-york/ui/twitter-card";

// Static date for demo purposes - avoids React purity rules
const DEMO_TIMESTAMP = new Date("2025-12-15T08:55:00Z");

export default function TwitterCardDefault() {
	return (
		<div className="w-full max-w-md">
			<TwitterCard
				author={{
					name: "GAIA",
					handle: "trygaia",
					avatar: "https://github.com/theexperiencecompany.png",
					verified: true,
				}}
				content="We just shipped 6 new components to our open source UI library! ✨ Built with React, Tailwind CSS, and accessible by default."
				timestamp={DEMO_TIMESTAMP}
				likes={142}
				retweets={38}
				replies={12}
			/>
		</div>
	);
}
