import { DocsSidebar } from "@/components/core/docs-sidebar";

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="border-b">
			<div className="items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10 px-8">
				<DocsSidebar />
				{children}
			</div>
		</div>
	);
}
