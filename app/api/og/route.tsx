import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/siteConfig";

// OG Image dimensions
const WIDTH = 1200;
const HEIGHT = 630;

// Shared styles
const styles = {
	title: {
		display: "flex",
		fontSize: "72px",
		fontWeight: 600,
		fontFamily: "Inter",
		color: "#000000",
		letterSpacing: "-0.03em",
		lineHeight: 1.1,
	},
	subtitle: {
		display: "flex",
		fontSize: "64px",
		fontWeight: 600,
		fontFamily: "Inter",
		color: "#6b7280",
	},
} as const;

// Load font from Google Fonts API for a specific weight
async function loadGoogleFont(font: string, weight: number) {
	const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}`;
	const css = await (await fetch(url)).text();
	const resource = css.match(
		/src: url\((.+)\) format\('(opentype|truetype)'\)/,
	);

	if (resource) {
		const response = await fetch(resource[1]);
		if (response.status === 200) {
			return await response.arrayBuffer();
		}
	}

	throw new Error("failed to load font data");
}

type OGImageType = "default" | "docs" | "component";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	const type = (searchParams.get("type") as OGImageType) || "default";
	const title = searchParams.get("title") || "";
	const componentName = searchParams.get("name") || "";

	// Get base URL from request for local dev, or use siteConfig for production
	const requestUrl = new URL(request.url);
	const baseUrl =
		process.env.NODE_ENV === "development"
			? `${requestUrl.protocol}//${requestUrl.host}`
			: siteConfig.url;

	const iconUrl = `${baseUrl}/media/gaiaui_logo.png`;

	try {
		const [fontRegular, fontMedium, fontSemiBold, fontBold] = await Promise.all(
			[
				loadGoogleFont("Inter", 400),
				loadGoogleFont("Inter", 500),
				loadGoogleFont("Inter", 600),
				loadGoogleFont("Inter", 700),
			],
		);

		// Determine title and subtitle based on type
		const displayTitle = getDisplayTitle(type, title, componentName);
		const subtitle = getSubtitle(type);

		return new ImageResponse(
			<OGLayout iconUrl={iconUrl} iconSize={200}>
				<Title>{displayTitle}</Title>
				<Subtitle>{subtitle}</Subtitle>
			</OGLayout>,
			{
				width: WIDTH,
				height: HEIGHT,
				fonts: [
					{ name: "Inter", data: fontRegular, weight: 400, style: "normal" },
					{ name: "Inter", data: fontMedium, weight: 500, style: "normal" },
					{ name: "Inter", data: fontSemiBold, weight: 600, style: "normal" },
					{ name: "Inter", data: fontBold, weight: 700, style: "normal" },
				],
			},
		);
	} catch (e) {
		console.error("OG Image generation error:", e);
		return new Response("Failed to generate the image", { status: 500 });
	}
}

// Helper functions
function getDisplayTitle(
	type: OGImageType,
	title: string,
	componentName: string,
): string {
	switch (type) {
		case "docs":
			return title;
		case "component":
			return componentName
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ");
		default:
			return "GAIA UI Library";
	}
}

function getSubtitle(type: OGImageType): string {
	switch (type) {
		case "docs":
			return "GAIA UI Library";
		case "component":
			return "GAIA UI Component";
		default:
			return "ui.heygaia.io";
	}
}

// Reusable components
function OGLayout({
	iconUrl,
	iconSize = 120,
	children,
}: {
	iconUrl: string;
	iconSize?: number;
	children: React.ReactNode;
}) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				justifyContent: "center",
				width: "100%",
				height: "100%",
				backgroundColor: "#ffffff",
				padding: "80px 100px",
			}}
		>
			<img
				src={iconUrl}
				alt="GAIA UI"
				width={iconSize}
				height={iconSize}
				style={{ marginBottom: "30px" }}
			/>
			{children}
		</div>
	);
}

function Title({ children }: { children: React.ReactNode }) {
	return (
		<div style={{ ...styles.title, marginBottom: "10px" }}>{children}</div>
	);
}

function Subtitle({ children }: { children: React.ReactNode }) {
	return <div style={styles.subtitle}>{children}</div>;
}
