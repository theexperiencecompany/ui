import fs from "node:fs";
import path from "node:path";
import registryData from "@/registry.json";

export interface ComponentMetadata {
	name: string;
	title: string;
	description: string;
	firstPreview: string; // Path format: "component-name/preview-name"
}

/**
 * Get metadata for all components from registry
 * Finds the first preview file for each component
 */
export function getComponentsMetadata(): ComponentMetadata[] {
	const components: ComponentMetadata[] = [];
	const previewsDir = path.join(process.cwd(), "components/previews");

	for (const item of registryData.items) {
		const componentName = item.name;
		const componentDir = path.join(previewsDir, componentName);

		// Check if preview directory exists
		if (!fs.existsSync(componentDir)) {
			continue;
		}

		// Get all .tsx files in the component preview directory
		const previewFiles = fs
			.readdirSync(componentDir)
			.filter((file) => file.endsWith(".tsx"))
			.sort(); // Sort alphabetically

		// Skip if no preview files
		if (previewFiles.length === 0) {
			continue;
		}

		// Prefer 'default.tsx' if it exists, otherwise use first alphabetically
		const defaultPreview = previewFiles.find((file) => file === "default.tsx");
		const firstPreviewFile = defaultPreview || previewFiles[0];
		const previewName = firstPreviewFile.replace(".tsx", "");

		components.push({
			name: componentName,
			title: item.title,
			description: item.description,
			firstPreview: `${componentName}/${previewName}`,
		});
	}

	// Sort by title for consistent display
	return components.sort((a, b) => a.title.localeCompare(b.title));
}
