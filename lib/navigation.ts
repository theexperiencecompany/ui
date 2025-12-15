import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NavItem, NavSection } from "@/types/nav-item";

const DOCS_PATH = path.join(process.cwd(), "content/docs");

/**
 * Get navigation items by scanning the docs directory and reading frontmatter
 */
export function getNavigation(): NavSection[] {
  const sections: NavSection[] = [];

  // Getting Started section - always first
  const gettingStartedItems: NavItem[] = [];

  // Add index (Introduction)
  const indexPath = path.join(DOCS_PATH, "index.mdx");
  if (fs.existsSync(indexPath)) {
    const fileContent = fs.readFileSync(indexPath, "utf8");
    const { data } = matter(fileContent);
    gettingStartedItems.push({
      title: data.title || "Introduction",
      href: "/docs",
    });
  }

  // Add other root-level docs
  const rootFiles = fs
    .readdirSync(DOCS_PATH)
    .filter((file) => file.endsWith(".mdx") && file !== "index.mdx");

  for (const file of rootFiles) {
    const filePath = path.join(DOCS_PATH, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    const slug = file.replace(/\.mdx$/, "");

    gettingStartedItems.push({
      title: data.title || slug,
      href: `/docs/${slug}`,
    });
  }

  if (gettingStartedItems.length > 0) {
    sections.push({
      title: "",
      items: gettingStartedItems,
    });
  }

  // Scan for subdirectories (e.g., components/)
  const dirs = fs.readdirSync(DOCS_PATH).filter((file) => {
    const fullPath = path.join(DOCS_PATH, file);
    return fs.statSync(fullPath).isDirectory();
  });

  for (const dir of dirs) {
    const dirPath = path.join(DOCS_PATH, dir);
    const items: NavItem[] = [];

    // Read all MDX files in the directory
    const files = fs
      .readdirSync(dirPath)
      .filter((file) => file.endsWith(".mdx"));

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);
      const slug = file.replace(/\.mdx$/, "");

      items.push({
        title: data.title || slug,
        href: `/docs/${dir}/${slug}`,
      });
    }

    if (items.length > 0) {
      // Capitalize directory name for section title
      const sectionTitle = dir
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      sections.push({
        title: sectionTitle,
        items,
      });
    }
  }

  return sections;
}

/**
 * Main navigation items (for navbar)
 */
export const mainNav = [
  {
    title: "Documentation",
    href: "/docs",
  },
  {
    title: "Components",
    href: "/docs/components",
  },
];
