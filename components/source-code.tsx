import { getSourceCode } from "@/lib/source";
import { SourceCodeClient } from "./source-code-client";

interface SourceCodeProps {
  filePath: string;
  title?: string;
  language?: string;
}

/**
 * Server component to display source code from a file
 * Automatically reads the file and displays it with syntax highlighting
 */
export function SourceCode({ filePath, title, language }: SourceCodeProps) {
  const code = getSourceCode(filePath);

  // Infer language from file extension if not provided
  const lang = language || filePath.split(".").pop() || "tsx";

  return <SourceCodeClient code={code} title={title} language={lang} />;
}
