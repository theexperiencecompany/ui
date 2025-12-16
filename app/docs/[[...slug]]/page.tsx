import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FaSpinner } from "react-icons/fa";
import { DocPageLayout } from "@/components/core/doc-page-layout";
import { getAllDocSlugs, getMdxFile } from "@/lib/mdx";
import {
	generateArticleSchema,
	generateBreadcrumbSchema,
	generateComponentSchema,
	generateComponentSEO,
	generateHowToSchema,
	generateItemListSchema,
	generateSEO,
} from "@/lib/seo";
import registry from "@/registry.json";

interface PageProps {
	params: Promise<{
		slug?: string[];
	}>;
}

// Generate static paths for all MDX files
export async function generateStaticParams() {
	const slugs = getAllDocSlugs();
	return slugs.map((slug) => ({
		slug: slug.length === 0 ? undefined : slug,
	}));
}
export default async function DocPage({ params }: PageProps) {
	const { slug = [] } = await params;
	const docData = getMdxFile(slug.length === 0 ? ["index"] : slug);

	if (!docData) {
		notFound();
	}

	const { metadata, toc, content } = docData;

	// Dynamically import the MDX file
	let MDXContent: React.ComponentType;
	try {
		const mdxPath = slug.length === 0 ? "index" : slug.join("/");
		MDXContent = (await import(`@/content/docs/${mdxPath}.mdx`)).default;
	} catch (error) {
		console.error("Error loading MDX:", error);
		notFound();
	}

	// Generate breadcrumbs for structured data and UI
	const breadcrumbItems = [
		{ name: "Home", url: "/" },
		{ name: "Documentation", url: "/docs" },
	];

	const uiBreadcrumbs: { title: string; href: string }[] = [];

	if (slug.length > 0) {
		slug.forEach((part, index) => {
			const url = `/docs/${slug.slice(0, index + 1).join("/")}`;
			const title =
				part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ");

			breadcrumbItems.push({
				name: title,
				url,
			});

			// Add to UI breadcrumbs (exclude the last item as it's the current page)
			if (index < slug.length - 1) {
				uiBreadcrumbs.push({
					title,
					href: url,
				});
			}
		});
	}

	const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
	const articleSchema = generateArticleSchema({
		title: metadata.title,
		description: metadata.description,
		url: slug.length === 0 ? "/docs" : `/docs/${slug.join("/")}`,
	});

	// Check if this is a component page and generate component schema
	const isComponentPage = slug.length === 2 && slug[0] === "components";
	let componentSchema = null;

	if (isComponentPage) {
		const componentName = slug[1];
		const registryItem = registry.items.find(
			(item) => item.name === componentName,
		);

		if (registryItem) {
			componentSchema = generateComponentSchema({
				name: registryItem.name,
				title: registryItem.title,
				description: registryItem.description,
				url: `/docs/components/${componentName}`,
				keywords: [componentName, registryItem.title],
			});
		}
	}

	// Check if this is the components index page
	const isComponentsIndex = slug.length === 1 && slug[0] === "components";
	let itemListSchema = null;

	if (isComponentsIndex) {
		itemListSchema = generateItemListSchema({
			name: "GAIA UI Components",
			description:
				"A collection of production-ready UI components designed specifically for building AI assistants and chatbots.",
			url: "/docs/components",
			items: registry.items.map((item) => ({
				name: item.title,
				url: `/docs/components/${item.name}`,
				description: item.description,
			})),
		});
	}

	// Check if this is the installation page
	const isInstallationPage = slug.length === 1 && slug[0] === "installation";
	let howToSchema = null;

	if (isInstallationPage) {
		howToSchema = generateHowToSchema({
			name: "How to Install GAIA UI",
			description:
				"Step-by-step guide to install and configure GAIA UI in your Next.js project.",
			url: "/docs/installation",
			steps: [
				{
					name: "Initialize Your Project",
					text: "Create a new Next.js project with TypeScript and Tailwind CSS if you don't have one.",
				},
				{
					name: "Install Dependencies",
					text: "Install required dependencies including class-variance-authority, clsx, tailwind-merge, and @hugeicons/react.",
				},
				{
					name: "Configure Path Aliases",
					text: "Update tsconfig.json to configure path aliases for your project.",
				},
				{
					name: "Configure Tailwind CSS",
					text: "Update tailwind.config.ts to include the necessary content paths and theme extensions.",
				},
				{
					name: "Add Utility Functions",
					text: "Create a lib/utils.ts file with the cn utility function for class merging.",
				},
				{
					name: "Install Components",
					text: "Use the shadcn CLI or copy-paste to add components to your project.",
				},
				{
					name: "Start Using Components",
					text: "Import and use the installed components in your application.",
				},
			],
		});
	}

	return (
		<>
			{/* JSON-LD Structured Data for better SEO */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
			/>
			{componentSchema && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(componentSchema) }}
				/>
			)}
			{itemListSchema && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
				/>
			)}
			{howToSchema && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
				/>
			)}
			<DocPageLayout
				title={metadata.title}
				description={metadata.description}
				toc={toc}
				markdownContent={content}
				breadcrumbs={uiBreadcrumbs}
			>
				<Suspense
					fallback={
						<div className="w-full h-full flex items-center justify-center">
							<FaSpinner className="animate-spin" />
						</div>
					}
				>
					<MDXContent />
				</Suspense>
			</DocPageLayout>
		</>
	);
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
	const { slug = [] } = await params;
	const docData = getMdxFile(slug.length === 0 ? ["index"] : slug);

	if (!docData) {
		return {
			title: "Not Found",
		};
	}

	const { metadata } = docData;
	const url = slug.length === 0 ? "/docs" : `/docs/${slug.join("/")}`;

	// Check if this is a component page
	const isComponentPage = slug.length === 2 && slug[0] === "components";

	if (isComponentPage) {
		const componentName = slug[1];
		const registryItem = registry.items.find(
			(item) => item.name === componentName,
		);

		if (registryItem) {
			return generateComponentSEO({
				name: registryItem.name,
				title: registryItem.title,
				description: registryItem.description,
				dependencies: registryItem.dependencies || [],
				url,
			});
		}
	}

	return generateSEO({
		title: metadata.title,
		description: metadata.description,
		url,
		type: "article",
		keywords: [
			...((metadata.keywords as string[]) || []),
			"documentation",
			"guide",
			"tutorial",
			metadata.title,
		],
	});
}
