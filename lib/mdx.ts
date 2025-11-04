import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DOCS_PATH = path.join(process.cwd(), "content/docs");

export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

export interface DocMetadata {
  title: string;
  description: string;
  [key: string]: unknown;
}

/**
 * Extract table of contents from MDX content
 * Looks for heading patterns like ## Heading or ### Heading
 */
export function extractTocFromMdx(content: string): TocEntry[] {
  const toc: TocEntry[] = [];
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();

    // Generate ID from heading text (same way rehype-slug does it)
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    toc.push({ id, text, level });
  }

  return toc;
}

/**
 * Get MDX file metadata and content
 */
export function getMdxFile(slug: string[]) {
  const filePath = path.join(DOCS_PATH, ...slug) + ".mdx";

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    metadata: data as DocMetadata,
    content,
    toc: extractTocFromMdx(content),
  };
}

/**
 * Get all available doc slugs for static generation
 */
export function getAllDocSlugs(
  dir: string = DOCS_PATH,
  basePath: string[] = []
): string[][] {
  const slugs: string[][] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      slugs.push(...getAllDocSlugs(filePath, [...basePath, file]));
    } else if (file.endsWith(".mdx")) {
      const slug = file.replace(/\.mdx$/, "");
      if (slug === "index") {
        // index.mdx maps to the base path
        if (basePath.length > 0) {
          slugs.push(basePath);
        }
      } else {
        slugs.push([...basePath, slug]);
      }
    }
  }

  return slugs;
}
