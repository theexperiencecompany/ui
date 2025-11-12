import { getAllDocSlugs } from "@/lib/mdx";
import { siteConfig } from "@/lib/siteConfig";
import registry from "@/registry.json";
import fs from "fs";
import { MetadataRoute } from "next";

/**
 * Generate comprehensive dynamic sitemap for all pages
 * This file is automatically crawled by search engines
 * Includes homepage, docs, and all component pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const routes: MetadataRoute.Sitemap = [];

  // Homepage - highest priority
  routes.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1.0,
  });

  // Main documentation page
  routes.push({
    url: `${baseUrl}/docs`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  // Get all doc slugs and add to sitemap
  const docSlugs = getAllDocSlugs();
  const componentPaths = new Set<string>();

  for (const slug of docSlugs) {
    if (slug.length === 0) continue; // Skip root docs (already added above)

    const path = `/docs/${slug.join("/")}`;

    // Track component paths separately for priority setting
    const isComponentPath = slug[0] === "components" && slug.length > 1;
    if (isComponentPath) {
      componentPaths.add(path);
    }

    // Try to get last modified date from file system
    let lastModified = new Date();
    try {
      const filePath = `${process.cwd()}/content/docs/${slug.join("/")}.mdx`;
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        lastModified = stats.mtime;
      }
    } catch {
      // Use current date if file not found
    }

    routes.push({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: isComponentPath ? "weekly" : "monthly",
      priority: isComponentPath ? 0.8 : 0.7,
    });
  }

  // Ensure all components from registry are included
  // This handles any components that might not have MDX docs yet
  for (const item of registry.items) {
    const componentPath = `/docs/components/${item.name}`;

    // Only add if not already in sitemap
    if (!componentPaths.has(componentPath)) {
      routes.push({
        url: `${baseUrl}${componentPath}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return routes;
}
