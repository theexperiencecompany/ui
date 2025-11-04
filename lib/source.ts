import fs from "fs";
import path from "path";

/**
 * Read source code from a file in the project
 * @param filePath - Path relative to project root (e.g., "registry/new-york/ui/raised-button.tsx")
 * @returns The file contents as a string
 */
export function getSourceCode(filePath: string): string {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.warn(`Source file not found: ${filePath}`);
    return `// File not found: ${filePath}`;
  }

  try {
    return fs.readFileSync(fullPath, "utf8");
  } catch (error) {
    console.error(`Error reading source file: ${filePath}`, error);
    return `// Error reading file: ${filePath}`;
  }
}
