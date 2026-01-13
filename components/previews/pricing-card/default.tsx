"use client";

import Image from "next/image";
import { PricingCard } from "@/registry/new-york/ui/pricing-card";

const freeFeatures = [
	"5 conversations per day",
	"Basic AI responses",
	"Email support",
	"Community access",
];

const proFeatures = [
	"Unlimited conversations",
	"Priority AI responses",
	"All integrations",
	"Priority support",
	"Custom workflows",
	"Advanced analytics",
];

export default function PricingCardDemo() {
	return (
		<div className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden rounded-2xl">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image
					src="/images/wallpapers/field.webp"
					alt="Pricing background"
					fill
					className="object-cover opacity-65"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 dark:to-zinc-950/90" />
			</div>

			{/* Pricing Cards Grid - matching gaia's wrapper structure */}
			<div className="relative z-[1] grid w-full max-w-2xl grid-cols-1 md:grid-cols-2 gap-3 p-6">
				{/* Free Tier Card */}
				<PricingCard
					title="Free"
					price={0}
					description="Perfect for getting started and exploring the basics."
					features={freeFeatures}
					onButtonClick={() => alert("Free plan selected!")}
					className="w-full"
				/>

				{/* Pro Tier Card with yearly discount */}
				<PricingCard
					title="Pro"
					price={9}
					originalPrice={12}
					isMonthly={false}
					description="For power users who want the full experience."
					features={proFeatures}
					accentColor="#00bbff"
					onButtonClick={() => alert("Pro plan selected!")}
					className="w-full"
				/>
			</div>
		</div>
	);
}
