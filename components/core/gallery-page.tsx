import { getPreviewComponent } from "@/components/previews";
import { getComponentsMetadata } from "@/lib/utils/get-component-metadata";

export async function GalleryPage() {
	const components = getComponentsMetadata();

	const previewPromises = components.map(async (component) => {
		const PreviewComponent = await getPreviewComponent(component.firstPreview);
		return { name: component.name, PreviewComponent };
	});

	const previews = await Promise.all(previewPromises);

	return (
		<div className="flex w-full flex-wrap items-start gap-8">
			{previews.map(
				({ name, PreviewComponent }) =>
					PreviewComponent && (
						<div key={name} className="w-fit">
							<PreviewComponent />
						</div>
					),
			)}
		</div>
	);
}
