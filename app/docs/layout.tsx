import { DocsSidebar } from "@/components/docs-sidebar";
import { Navbar } from "@/components/navbar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="border-b">
        <div className="max-w-screen-2xl flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-8">
          <DocsSidebar />
          {children}
        </div>
      </div>
    </>
  );
}
