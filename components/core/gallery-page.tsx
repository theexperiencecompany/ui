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
		<div className="grid grid-cols-2 w-full flex-wrap items-center justify-center gap-8">
			{previews.map(
				({ name, PreviewComponent }) =>
					PreviewComponent && (
						<div key={name}>
							<PreviewComponent />
						</div>
					),
			)}
		</div>
	);
}
