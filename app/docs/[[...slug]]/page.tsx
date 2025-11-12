import { DocPageLayout } from "@/components/core/doc-page-layout";
import { getMdxFile, getAllDocSlugs } from "@/lib/mdx";
import {
  generateSEO,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateComponentSchema,
  generateComponentSEO,
} from "@/lib/seo";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FaSpinner } from "react-icons/fa";
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
  let MDXContent;
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
      (item) => item.name === componentName
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
      (item) => item.name === componentName
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
