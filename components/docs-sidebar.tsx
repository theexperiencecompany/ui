"use client";

import { docsConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-14 hidden md:block w-full md:w-[220px] lg:w-[240px] shrink-0 h-[calc(100vh-3.5rem)]">
      <div className="py-10  lg:py-8 overflow-auto h-full">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {docsConfig.sidebarNav.map((section, index) => (
            <div key={index} className="pb-4">
              <h4 className="mb-1 rounded-md px-2 py-1 text-xs text-muted-foreground">
                {section.title}
              </h4>
              {section.items && (
                <div className="grid grid-flow-row auto-rows-max gap-1">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      className={cn(
                        "group flex w-fit items-center text-sm rounded-md border border-transparent px-2 py-1 hover:bg-accent hover:text-accent-foreground font-medium text-foreground",
                        pathname === item.href ? "bg-accent" : ""
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
