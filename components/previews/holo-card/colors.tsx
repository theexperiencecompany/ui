"use client";

import { HoloCard } from "@/registry/new-york/ui/holo-card";

// House background images from GAIA
const HOUSE_IMAGES = {
	frostpeak:
		"https://i.pinimg.com/1200x/bf/1a/99/bf1a99c4c2cd8f378b9e4493f71e7e64.jpg",
	greenvale:
		"https://i.pinimg.com/1200x/3b/3e/11/3b3e1167fcfb0933070b6064ce9c72cd.jpg",
	bluehaven:
		"https://i.pinimg.com/1200x/27/0a/74/270a74bdc412f9eeae4d2403ebc9bd63.jpg",
};

const profiles = [
	{
		data: {
			name: "Aurora Frost",
			subtitle: "Keeper of the Northern Lights",
			primaryId: "00001",
			secondaryInfo: "January 2024",
			badge: "Frostpeak",
			backgroundImage: HOUSE_IMAGES.frostpeak,
			overlayColor: "#06b6d4", // Cyan
			overlayOpacity: 25,
		},
	},
	{
		data: {
			name: "Sage Willowmist",
			subtitle: "Guardian of the Ancient Grove",
			primaryId: "00023",
			secondaryInfo: "March 2024",
			badge: "Greenvale",
			backgroundImage: HOUSE_IMAGES.greenvale,
			overlayColor: "#22c55e", // Green
			overlayOpacity: 30,
		},
	},
	{
		data: {
			name: "Marina Deepwater",
			subtitle: "Voyager of the Azure Depths",
			primaryId: "00108",
			secondaryInfo: "June 2024",
			badge: "Bluehaven",
			backgroundImage: HOUSE_IMAGES.bluehaven,
			overlayColor: "#8b5cf6", // Violet
			overlayOpacity: 25,
		},
	},
];

const sampleBranding = {
	logo: "/media/text_w_logo_white.webp",
	logoAlt: "GAIA Logo",
	icon: "/media/experience logo.svg",
	iconAlt: "Experience Icon",
};

export default function HoloCardColors() {
	return (
		<div className="flex flex-wrap justify-center gap-8 py-8">
			{profiles.map((profile, index) => (
				<HoloCard
					key={`profile-${profile.data.primaryId || index}`}
					data={profile.data}
					branding={sampleBranding}
					width={280}
					height={390}
					showSparkles={true}
				/>
			))}
		</div>
	);
}
