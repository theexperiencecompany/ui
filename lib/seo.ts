import type { Metadata } from "next";
import { siteConfig } from "./siteConfig";

interface SEOProps {
	title?: string;
	description?: string;
	image?: string;
	url?: string;
	type?: "website" | "article";
	publishedTime?: string;
	modifiedTime?: string;
	authors?: string[];
	keywords?: string[];
	noIndex?: boolean;
	canonical?: string;
}

/**
 * Generate comprehensive metadata for a page with optimal SEO
 */
export function generateSEO({
	title,
	description = siteConfig.description,
	image,
	url,
	type = "website",
	publishedTime,
	modifiedTime,
	authors,
	keywords = [],
	noIndex = false,
	canonical,
}: SEOProps = {}): Metadata {
	// Generate dynamic OG image URL based on page type
	const ogImageUrl =
		image ||
		(title
			? `${siteConfig.url}/api/og?type=docs&title=${encodeURIComponent(title)}`
			: siteConfig.ogImage);
	const pageTitle = title ? `${title} - ${siteConfig.name}` : siteConfig.name;
	const pageUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
	const canonicalUrl = canonical || pageUrl;

	const metadata: Metadata = {
		title: pageTitle,
		description,
		keywords: [
			"GAIA UI",
			"React",
			"Tailwind CSS",
			"UI Components",
			"Component Library",
			"Design System",
			"AI Assistant",
			"Chatbot UI",
			"Conversational Interface",
			"Next.js",
			"Radix UI",
			"TypeScript",
			"Accessible Components",
			"Open Source",
			"Free Components",
			"Modern UI",
			"Animation",
			"Interactive Components",
			...keywords,
		],
		authors: authors?.map((name) => ({ name })) || [
			{ name: "GAIA", url: "https://github.com/theexperiencecompany/gaia" },
			{ name: "The Experience Company", url: "https://experience.heygaia.io" },
		],
		creator: "The Experience Company",
		publisher: "GAIA",
		robots: noIndex
			? {
					index: false,
					follow: false,
					nocache: true,
				}
			: {
					index: true,
					follow: true,
					googleBot: {
						index: true,
						follow: true,
						"max-video-preview": -1,
						"max-image-preview": "large",
						"max-snippet": -1,
					},
				},
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: {
			type,
			locale: "en_US",
			url: pageUrl,
			title: pageTitle,
			description,
			siteName: siteConfig.name,
			images: [
				{
					url: ogImageUrl,
					width: 1200,
					height: 630,
					alt: title || siteConfig.name,
				},
			],
			...(publishedTime && { publishedTime }),
			...(modifiedTime && { modifiedTime }),
		},
		twitter: {
			card: "summary_large_image",
			title: pageTitle,
			description,
			images: [ogImageUrl],
			creator: "@trygaia",
			site: "@trygaia",
		},
		icons: {
			icon: "/favicon.ico",
			shortcut: "/favicon-16x16.png",
			apple: "/apple-touch-icon.png",
		},
		manifest: "/site.webmanifest",
	};

	return metadata;
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: siteConfig.name,
		url: siteConfig.url,
		logo: `${siteConfig.url}/logo.png`,
		description: siteConfig.description,
		foundingDate: "2024",
		sameAs: [
			siteConfig.links.github,
			siteConfig.links.twitter,
			siteConfig.links.experienceCompany,
		],
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "Customer Support",
			url: siteConfig.links.github,
		},
	};
}

/**
 * Generate JSON-LD structured data for website
 */
export function generateWebsiteSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteConfig.name,
		url: siteConfig.url,
		description: siteConfig.description,
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${siteConfig.url}/docs?search={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
	};
}

/**
 * Generate JSON-LD structured data for a documentation article
 */
export function generateArticleSchema({
	title,
	description,
	url,
	publishedTime,
	modifiedTime,
	authors = ["GAIA"],
	image = siteConfig.ogImage,
}: {
	title: string;
	description: string;
	url: string;
	publishedTime?: string;
	modifiedTime?: string;
	authors?: string[];
	image?: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "TechArticle",
		headline: title,
		description,
		url: `${siteConfig.url}${url}`,
		image,
		datePublished: publishedTime || new Date().toISOString(),
		dateModified: modifiedTime || new Date().toISOString(),
		author: authors.map((name) => ({
			"@type": "Person",
			name,
		})),
		publisher: {
			"@type": "Organization",
			name: siteConfig.name,
			logo: {
				"@type": "ImageObject",
				url: `${siteConfig.url}/logo.png`,
			},
		},
	};
}

/**
 * Generate JSON-LD structured data for software
 */
export function generateSoftwareSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: siteConfig.name,
		description: siteConfig.description,
		url: siteConfig.url,
		applicationCategory: "DeveloperApplication",
		operatingSystem: "Web Browser",
		softwareVersion: "1.0",
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: "5.0",
			ratingCount: "1",
		},
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
			availability: "https://schema.org/InStock",
		},
		author: {
			"@type": "Organization",
			name: "The Experience Company",
			url: siteConfig.links.experienceCompany,
		},
		screenshot: siteConfig.ogImage,
		downloadUrl: siteConfig.links.github,
		codeRepository: siteConfig.links.github,
		programmingLanguage: ["TypeScript", "JavaScript", "React"],
		keywords: siteConfig.keywords.join(", "),
	};
}

/**
 * Generate JSON-LD structured data for breadcrumbs
 */
export function generateBreadcrumbSchema(
	items: { name: string; url: string }[],
) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: `${siteConfig.url}${item.url}`,
		})),
	};
}

/**
 * Generate JSON-LD structured data for a component
 */
export function generateComponentSchema({
	name,
	title,
	description,
	url,
	keywords = [],
}: {
	name: string;
	title: string;
	description: string;
	url: string;
	dependencies?: string[];
	keywords?: string[];
}) {
	return {
		"@context": "https://schema.org",
		"@type": "SoftwareSourceCode",
		name: title,
		description,
		url: `${siteConfig.url}${url}`,
		codeRepository: `${siteConfig.links.github}/tree/main/registry/new-york/ui/${name}.tsx`,
		programmingLanguage: "TypeScript",
		runtimePlatform: "React",
		targetProduct: {
			"@type": "SoftwareApplication",
			name: siteConfig.name,
			url: siteConfig.url,
		},
		keywords: [
			...keywords,
			"React Component",
			"UI Component",
			"TypeScript",
			"Tailwind CSS",
			title,
		].join(", "),
		license: "MIT",
		author: {
			"@type": "Organization",
			name: "The Experience Company",
			url: siteConfig.links.experienceCompany,
		},
	};
}

/**
 * Generate SEO metadata specifically for component pages
 */
export function generateComponentSEO({
	name,
	title,
	description,
	dependencies = [],
	url,
}: {
	name: string;
	title: string;
	description: string;
	dependencies?: string[];
	url: string;
}) {
	const keywords = [
		title,
		`${title} component`,
		`React ${title}`,
		name,
		"React component",
		"UI component",
		"TypeScript component",
		...dependencies.map((dep) => dep.replace(/[@/]/g, " ").trim()),
	];

	// Generate component-specific OG image URL
	const componentOgImage = `${siteConfig.url}/api/og?type=component&name=${encodeURIComponent(name)}`;

	return generateSEO({
		title,
		description,
		image: componentOgImage,
		url,
		type: "article",
		keywords,
	});
}

/**
 * Generate JSON-LD structured data for a collection of items (e.g., component list)
 */
export function generateItemListSchema({
	name,
	description,
	url,
	items,
}: {
	name: string;
	description: string;
	url: string;
	items: Array<{ name: string; url: string; description: string }>;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name,
		description,
		url: `${siteConfig.url}${url}`,
		numberOfItems: items.length,
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": "SoftwareSourceCode",
				name: item.name,
				url: `${siteConfig.url}${item.url}`,
				description: item.description,
				programmingLanguage: "TypeScript",
			},
		})),
	};
}

/**
 * Generate JSON-LD structured data for FAQ
 */
export function generateFAQSchema(
	faqs: Array<{ question: string; answer: string }>,
) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer,
			},
		})),
	};
}

/**
 * Generate JSON-LD structured data for HowTo guides
 */
export function generateHowToSchema({
	name,
	description,
	steps,
	url,
	image = siteConfig.ogImage,
}: {
	name: string;
	description: string;
	steps: Array<{ name: string; text: string; url?: string; image?: string }>;
	url: string;
	image?: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "HowTo",
		name,
		description,
		image: {
			"@type": "ImageObject",
			url: image,
		},
		url: `${siteConfig.url}${url}`,
		step: steps.map((step, index) => ({
			"@type": "HowToStep",
			position: index + 1,
			name: step.name,
			text: step.text,
			url: step.url ? `${siteConfig.url}${step.url}` : undefined,
			image: step.image,
		})),
	};
}
