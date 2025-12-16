"use client";

import { HoloCard } from "@/registry/new-york/ui/holo-card";

const sampleProfileData = {
	name: "Elena Starweaver",
	subtitle: "The Curious Explorer",
	description:
		"Passionate about building beautiful user interfaces and exploring the intersection of design and technology. Always learning, always creating.",
	primaryId: "00042",
	secondaryInfo: "December 2024",
	badge: "Bluehaven",
	backgroundImage:
		"https://i.pinimg.com/1200x/27/0a/74/270a74bdc412f9eeae4d2403ebc9bd63.jpg",
	overlayColor: "#4f46e5",
	overlayOpacity: 30,
};

const sampleBranding = {
	logo: "/media/text_w_logo_white.webp",
	logoAlt: "GAIA Logo",
	icon: "/media/experience logo.svg",
	iconAlt: "Experience Icon",
};

export default function HoloCardDefault() {
	return (
		<div className="flex justify-center py-8">
			<HoloCard
				data={sampleProfileData}
				branding={sampleBranding}
				showSparkles={true}
			/>
		</div>
	);
}
