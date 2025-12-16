"use client";

import Image from "next/image";
import type React from "react";
import { useRef, useState, useCallback } from "react";
import Tilt from "react-parallax-tilt";
import { cn } from "@/lib/utils";
import "./holo-card.css";

// ============================================================================
// Types
// ============================================================================

export interface HoloCardDisplayData {
	/** Primary name displayed on the card */
	name: string;
	/** Secondary text (e.g., personality phrase, tagline) */
	subtitle?: string;
	/** Extended description shown on the back of the card */
	description?: string;
	/** Primary identifier (e.g., user number, ID) */
	primaryId?: string | number;
	/** Secondary info (e.g., member since date) */
	secondaryInfo?: string;
	/** Background image URL */
	backgroundImage?: string;
	/** Badge/tag text (e.g., house name, role) */
	badge?: string;
	/** Overlay color for the card */
	overlayColor?: string;
	/** Overlay opacity (0-100) */
	overlayOpacity?: number;
}

export interface HoloCardBranding {
	/** Primary logo image URL */
	logo?: string;
	/** Logo alt text */
	logoAlt?: string;
	/** Icon shown in various places */
	icon?: string;
	/** Icon alt text */
	iconAlt?: string;
}

export interface HoloCardProps {
	/** Card display data */
	data: HoloCardDisplayData;
	/** Card dimensions */
	height?: number;
	width?: number;
	/** Show sparkle animation effect */
	showSparkles?: boolean;
	/** Force card to show front or back (disables flip) */
	forceSide?: "front" | "back";
	/** Custom branding (logos, icons) */
	branding?: HoloCardBranding;
	/** Additional CSS classes */
	className?: string;
	/** Children rendered inside the card */
	children?: React.ReactNode;
	/** Callback when card is flipped */
	onFlip?: (isFlipped: boolean) => void;
}

// ============================================================================
// Default Values
// ============================================================================

const DEFAULT_BACKGROUND =
	"https://i.pinimg.com/1200x/27/0a/74/270a74bdc412f9eeae4d2403ebc9bd63.jpg";

const DEFAULT_BRANDING: HoloCardBranding = {
	logo: "/images/logos/text_w_logo_white.webp",
	logoAlt: "Logo",
	icon: "/images/logos/experience_logo.svg",
	iconAlt: "Icon",
};

// ============================================================================
// Component
// ============================================================================

export const HoloCard = ({
	data,
	height = 446,
	width = 320,
	showSparkles = true,
	forceSide,
	branding = DEFAULT_BRANDING,
	className,
	children,
	onFlip,
}: HoloCardProps) => {
	const [hover, setHover] = useState(false);
	const [animated, setAnimated] = useState(true);
	const [isFlipped, setIsFlipped] = useState(false);
	const [activeBackgroundPosition, setActiveBackgroundPosition] = useState({
		tp: 0,
		lp: 0,
	});
	const ref = useRef<HTMLDivElement>(null);

	const {
		name,
		subtitle,
		description,
		primaryId,
		secondaryInfo,
		backgroundImage = DEFAULT_BACKGROUND,
		badge,
		overlayColor,
		overlayOpacity = 40,
	} = data;

	const handleCardClick = useCallback(() => {
		if (!forceSide) {
			const newFlippedState = !isFlipped;
			setIsFlipped(newFlippedState);
			onFlip?.(newFlippedState);
		}
	}, [forceSide, isFlipped, onFlip]);

	const handleOnMouseMove = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			setAnimated(false);
			setHover(true);

			const card = ref.current;
			const l = event.nativeEvent.offsetX;
			const t = event.nativeEvent.offsetY;

			const h = card ? card.clientHeight : 0;
			const w = card ? card.clientWidth : 0;

			const px = Math.abs(Math.floor((100 / w) * l) - 100);
			const py = Math.abs(Math.floor((100 / h) * t) - 100);

			const lp = 50 + (px - 50) / 1.5;
			const tp = 50 + (py - 50) / 1.5;

			setActiveBackgroundPosition({ lp, tp });
		},
		[],
	);

	const handleOnTouchMove = useCallback(
		(event: React.TouchEvent<HTMLDivElement>) => {
			setAnimated(false);
			setHover(true);

			const card = ref.current;
			if (!card) return;

			const touch = event.touches[0];
			const rect = card.getBoundingClientRect();
			const l = touch.clientX - rect.left;
			const t = touch.clientY - rect.top;

			const h = card.clientHeight;
			const w = card.clientWidth;

			const px = Math.abs(Math.floor((100 / w) * l) - 100);
			const py = Math.abs(Math.floor((100 / h) * t) - 100);

			const lp = 50 + (px - 50) / 1.5;
			const tp = 50 + (py - 50) / 1.5;

			setActiveBackgroundPosition({ lp, tp });
		},
		[],
	);

	const handleOnMouseOut = useCallback(() => {
		setHover(false);
		setAnimated(true);
	}, []);

	const effectiveFlipped = forceSide ? forceSide === "back" : isFlipped;

	// Static mode styles for download/static rendering
	const containerStyle = forceSide
		? {
				perspective: "none",
				transform: "none",
			}
		: {
				perspective: "1000px",
				cursor: "pointer",
			};

	const innerStyle = forceSide
		? {
				transform: "none",
				position: "relative" as const,
				height: `${height}px`,
				width: `${width}px`,
			}
		: {
				transformStyle: "preserve-3d" as const,
				transform: effectiveFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
				height: `${height}px`,
				width: `${width}px`,
			};

	const frontStyle = forceSide
		? {
				display: forceSide === "front" ? "block" : "none",
				position: "absolute" as const,
				inset: 0,
			}
		: {
				position: "absolute" as const,
				inset: 0,
				backfaceVisibility: "hidden" as const,
				WebkitBackfaceVisibility: "hidden" as const,
			};

	const backStyle = forceSide
		? {
				display: forceSide === "back" ? "block" : "none",
				position: "absolute" as const,
				inset: 0,
				transform: "none",
			}
		: {
				position: "absolute" as const,
				inset: 0,
				backfaceVisibility: "hidden" as const,
				WebkitBackfaceVisibility: "hidden" as const,
				transform: "rotateY(180deg)",
			};

	const holoCardClasses = cn(
		"holo-card",
		hover && "holo-card--active",
		animated && "holo-card--animated",
		showSparkles && "holo-card--sparkles",
	);

	const holoCardStyle = {
		"--holo-width": `${width}px`,
		"--holo-height": `${height}px`,
		backgroundImage: `url(${backgroundImage})`,
		backgroundPosition: hover
			? `${activeBackgroundPosition.lp}% ${activeBackgroundPosition.tp}%`
			: "center",
	} as React.CSSProperties;

	// Overlay component
	const OverlayLayer = overlayColor ? (
		<div
			className="pointer-events-none absolute inset-0 z-[3]"
			style={{
				background: overlayColor,
				mixBlendMode: "overlay",
				opacity: overlayOpacity / 100,
			}}
		/>
	) : null;

	// Front card content
	const FrontContent = (
		<div className="pointer-events-none absolute z-[2] flex h-full w-full flex-col items-start justify-end p-3 text-white transition">
			{/* Top bar with logo and badge */}
			<div className="absolute top-4 left-0 flex w-full justify-between px-3">
				{branding.logo && (
					<div className="rounded-full bg-white/30 p-1 px-2 font-serif text-xl font-light text-white/70 backdrop-blur-md">
						<Image
							src={branding.logo}
							alt={branding.logoAlt || "Logo"}
							width={100}
							height={30}
							className="object-contain"
						/>
					</div>
				)}
				{badge && (
					<div className="rounded-full bg-white/20 p-1 px-4 font-serif text-xl font-light text-white/70 backdrop-blur-md">
						{badge}
					</div>
				)}
			</div>

			{/* Background icon */}
			{branding.icon && (
				<Image
					src={branding.icon}
					alt={branding.iconAlt || "Icon"}
					className="scale-125 opacity-10"
					fill
				/>
			)}

			{/* Bottom info card */}
			<div className="relative flex w-full flex-col gap-1 overflow-hidden rounded-2xl bg-black/20 p-3 backdrop-blur-md">
				<div className="font-serif text-4xl font-bold text-white">{name}</div>
				{subtitle && (
					<div className="mb-10 font-light text-white italic">{subtitle}</div>
				)}

				<div className="flex w-full items-center justify-between">
					<div className="flex flex-col items-start gap-1">
						{primaryId && (
							<span className="text-sm text-white/80">User {primaryId}</span>
						)}
						{secondaryInfo && (
							<span className="text-xs text-white/50">{secondaryInfo}</span>
						)}
					</div>

					{branding.icon && (
						<div className="flex gap-2">
							<Image
								src={branding.icon}
								alt={branding.iconAlt || "Icon"}
								width={30}
								height={30}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);

	// Back card content
	const BackContent = (
		<div className="pointer-events-none absolute z-[2] flex h-full w-full flex-col items-start justify-between p-3 text-white">
			<div className="flex w-full flex-col gap-4">
				{/* Top bar */}
				<div className="flex items-center justify-between">
					{branding.logo && (
						<div className="rounded-full bg-white/30 p-1 px-2 backdrop-blur-md">
							<Image
								src={branding.logo}
								alt={branding.logoAlt || "Logo"}
								width={80}
								height={24}
								className="object-contain"
							/>
						</div>
					)}
					{badge && (
						<div className="rounded-full bg-white/20 p-1 px-3 font-serif text-xl font-light text-white/70 backdrop-blur-md">
							{badge}
						</div>
					)}
				</div>

				{/* Bio section */}
				<div className="relative overflow-hidden rounded-2xl bg-black/20 p-4 backdrop-blur-md">
					<div className="mb-2 font-serif text-2xl font-bold text-white">
						{name}
					</div>
					{subtitle && (
						<div className="mb-4 text-sm font-light text-white/80 italic">
							{subtitle}
						</div>
					)}
					{description && (
						<p className="text-sm text-white/80">{description}</p>
					)}
				</div>
			</div>

			{/* Bottom info */}
			<div className="flex w-full items-center justify-between rounded-xl bg-black/20 p-3 backdrop-blur-md">
				<div className="flex flex-col gap-1">
					<span className="text-xs text-white/50">Member Since</span>
					<span className="text-sm font-medium text-white/80">
						{secondaryInfo || "—"}
					</span>
				</div>
				<div className="flex flex-col items-end gap-1">
					<span className="text-xs text-white/50">User ID</span>
					<span className="text-sm font-medium text-white/80">
						{primaryId || "—"}
					</span>
				</div>
			</div>
		</div>
	);

	// Render card face (either static or with tilt)
	const renderCardFace = (
		content: React.ReactNode,
		isStatic: boolean = false,
	) => {
		if (isStatic || forceSide) {
			return (
				<div className="relative h-full w-full overflow-hidden rounded-2xl shadow-xl">
					{OverlayLayer}
					{content}
					<div ref={ref} className={holoCardClasses} style={holoCardStyle}>
						{children}
					</div>
				</div>
			);
		}

		return (
			<Tilt className="relative h-full w-full overflow-hidden rounded-2xl p-0! shadow-xl">
				{OverlayLayer}
				{content}
				<div
					ref={ref}
					className={holoCardClasses}
					style={holoCardStyle}
					onMouseMove={handleOnMouseMove}
					onTouchMove={handleOnTouchMove}
					onMouseOut={handleOnMouseOut}
					onBlur={handleOnMouseOut}
				>
					{children}
				</div>
			</Tilt>
		);
	};

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				handleCardClick();
			}
		},
		[handleCardClick],
	);

	return (
		<div
			className={cn(forceSide ? "" : "perspective-1000", className)}
			onClick={handleCardClick}
			onKeyDown={!forceSide ? handleKeyDown : undefined}
			role={!forceSide ? "button" : undefined}
			tabIndex={!forceSide ? 0 : undefined}
			title={
				!forceSide ? `Profile card for ${name}. Click to flip.` : undefined
			}
			style={containerStyle}
		>
			<div
				className={
					forceSide ? "relative" : "relative transition-transform duration-700"
				}
				style={innerStyle}
			>
				{/* Front Side */}
				<div style={frontStyle}>
					{renderCardFace(FrontContent, !!forceSide)}
				</div>

				{/* Back Side */}
				<div style={backStyle}>{renderCardFace(BackContent, !!forceSide)}</div>
			</div>
		</div>
	);
};

export default HoloCard;
