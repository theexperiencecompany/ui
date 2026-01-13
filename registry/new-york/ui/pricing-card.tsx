"use client";

import type { FC, ReactNode } from "react";
import { CheckmarkCircle02Icon, HugeiconsIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { RaisedButton } from "@/registry/new-york/ui/raised-button";

export interface PricingFeature {
	text: string;
	icon?: ReactNode;
}

export interface PricingCardProps {
	/** Plan title (e.g., "Free", "Pro", "Enterprise") */
	title: string;
	/** Price amount (e.g., 0, 9.99, 29) */
	price: number;
	/** Currency symbol (default: "$") */
	currency?: string;
	/** Original price before discount (shows strikethrough) */
	originalPrice?: number;
	/** Plan description/subtitle */
	description?: string;
	/** Features included in this plan */
	features?: (string | PricingFeature)[];
	/** Custom title above features list */
	featuresTitle?: ReactNode;
	/** Billing period: true for monthly, false for yearly */
	isMonthly?: boolean;
	/** Show "Current Plan" badge */
	isCurrentPlan?: boolean;
	/** Button label (default: "Get Started") */
	buttonLabel?: string;
	/** Button click handler */
	onButtonClick?: () => void;
	/** Whether button is disabled */
	isDisabled?: boolean;
	/** Whether button is in loading state */
	isLoading?: boolean;
	/** Accent color for button (CSS color value) */
	accentColor?: string;
	/** Additional CSS classes */
	className?: string;
}

const formatPrice = (amount: number, currency: string): string => {
	if (amount === 0) return `${currency}0`;
	return `${currency}${amount.toFixed(amount % 1 === 0 ? 0 : 2)}`;
};

export const PricingCard: FC<PricingCardProps> = ({
	title,
	price,
	currency = "$",
	originalPrice,
	description,
	features,
	featuresTitle,
	isMonthly = true,
	isCurrentPlan = false,
	buttonLabel,
	onButtonClick,
	isDisabled = false,
	isLoading = false,
	accentColor = "#00bbff",
	className,
}) => {
	const formattedPrice = formatPrice(price, currency);
	const formattedOriginalPrice = originalPrice
		? formatPrice(originalPrice, currency)
		: null;

	const getButtonLabel = (): string => {
		if (isLoading) return "Loading...";
		if (buttonLabel) return buttonLabel;
		if (isCurrentPlan) return "Current Plan";
		if (price === 0) return "Get Started";
		return "Upgrade";
	};

	const isFree = price === 0;
	const buttonBgColor = isFree ? "#3b3b3b" : accentColor;

	return (
		<div
			className={cn(
				"relative w-full overflow-hidden rounded-3xl",
				"bg-white/10 backdrop-blur-sm",
				className,
			)}
		>
			{/* Header Section */}
			<div className="relative z-[1] flex flex-col gap-2 p-6 pb-4">
				<div className="flex flex-row items-center justify-between">
					<div className="flex items-center gap-2">
						<span className="text-2xl font-semibold text-zinc-900 dark:text-white">
							{title}
						</span>
						{isCurrentPlan && (
							<span className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
								Current Plan
							</span>
						)}
					</div>
				</div>
			</div>

			{/* Inner Nested Card - Price & Button */}
			<div className="relative z-[-1] mx-4 mb-4 flex flex-col gap-4 overflow-hidden rounded-3xl bg-white/80 dark:bg-black/70 p-6 shadow-xl backdrop-blur-2xl">
				{/* Description */}
				{description && (
					<p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-200">
						{description}
					</p>
				)}

				{/* Price Section */}
				<div className="relative z-[1] flex flex-col gap-0">
					<div className="flex items-baseline gap-2">
						{formattedOriginalPrice && !isMonthly && (
							<span className="text-3xl font-normal text-red-500 line-through">
								{formattedOriginalPrice}
							</span>
						)}
						<span className="text-5xl font-bold text-zinc-900 dark:text-white">
							{formattedPrice}
						</span>
					</div>

					<span className="min-h-5 text-sm font-normal text-zinc-500 dark:text-zinc-400">
						{price > 0 && (isMonthly ? "/ per month" : "/ per year")}
					</span>
				</div>

				{/* Button Section */}
				<div className="relative z-[1]">
					<RaisedButton
						onClick={onButtonClick}
						disabled={isDisabled || isLoading || isCurrentPlan}
						className="w-full rounded-xl text-base font-semibold h-12"
						color={buttonBgColor}
					>
						{getButtonLabel()}
					</RaisedButton>
				</div>
			</div>

			{/* Features Section */}
			{(featuresTitle || (features && features.length > 0)) && (
				<div className="relative z-[1] flex flex-1 flex-col gap-2 px-6 pb-6">
					{featuresTitle}

					{features?.map((feature) => {
						const featureText =
							typeof feature === "string" ? feature : feature.text;
						const featureIcon =
							typeof feature === "object" && feature.icon ? (
								feature.icon
							) : (
								<HugeiconsIcon
									icon={CheckmarkCircle02Icon}
									size={18}
									className="text-green-600 dark:text-green-400"
								/>
							);

						return (
							<div
								key={featureText}
								className="flex items-center gap-3 text-sm font-light text-zinc-700 dark:text-zinc-300"
							>
								<span className="flex-shrink-0">{featureIcon}</span>
								{featureText}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default PricingCard;
