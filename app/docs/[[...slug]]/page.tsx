import { DocPageLayout } from "@/components/doc-page-layout";
import { getMdxFile, getAllDocSlugs } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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

  return (
    <DocPageLayout
      title={metadata.title}
      description={metadata.description}
      toc={toc}
      markdownContent={content}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <MDXContent />
      </Suspense>
    </DocPageLayout>
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

  return {
    title: metadata.title,
    description: metadata.description,
  };
}
