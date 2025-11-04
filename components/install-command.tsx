"use client";

import { CopyButton } from "@/components/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config/site";
import { Terminal } from "lucide-react";
import * as React from "react";
import { codeToHtml } from "shiki";

interface InstallCommandProps {
  component: string;
}

const packageManagers = [
  {
    name: "pnpm",
    command: (url: string) => `pnpm dlx shadcn@latest add ${url}`,
  },
  { name: "npm", command: (url: string) => `npx shadcn@latest add ${url}` },
  { name: "yarn", command: (url: string) => `npx shadcn@latest add ${url}` },
  { name: "bun", command: (url: string) => `bunx shadcn@latest add ${url}` },
];

export function InstallCommand({ component }: InstallCommandProps) {
  const registryUrl = `${siteConfig.url}/r/${component}.json`;
  const [highlightedCode, setHighlightedCode] = React.useState<
    Record<string, string>
  >({});

  React.useEffect(() => {
    Promise.all(
      packageManagers.map((pm) =>
        codeToHtml(pm.command(registryUrl), {
          lang: "bash",
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
        }).then((html) => ({ name: pm.name, html }))
      )
    ).then((results) => {
      const codeMap = results.reduce((acc, { name, html }) => {
        acc[name] = html;
        return acc;
      }, {} as Record<string, string>);
      setHighlightedCode(codeMap);
    });
  }, [registryUrl]);

  return (
    <div className="relative my-6 w-full rounded-lg border">
      <Tabs defaultValue="npm" className="w-full">
        <div className="flex items-center justify-start border-b bg-muted/50 px-4 py-2 gap-2">
          <Terminal className="w-5" />
          <TabsList className="h-auto bg-transparent p-0 ">
            {packageManagers.map((pm) => (
              <TabsTrigger
                key={pm.name}
                value={pm.name}
                className="shadow-none! data-[state=active]:outline-1"
                // className="rounded-none border-b-2 border-transparent bg-transparent px-3 py-1.5 text-sm font-normal shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {pm.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {packageManagers.map((pm) => (
          <TabsContent
            key={pm.name}
            value={pm.name}
            className="group relative m-0"
          >
            <div
              className="overflow-x-auto p-4 text-sm"
              dangerouslySetInnerHTML={{
                __html: highlightedCode[pm.name] || "",
              }}
            />
            <div className="absolute right-4 top-1">
              <CopyButton value={pm.command(registryUrl)} />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
