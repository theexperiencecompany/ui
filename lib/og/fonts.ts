/**
 * Font utilities for OG image generation
 * Uses static Inter font files from rsms.me (official Inter source)
 */

// Static Inter font files (OTF format works with satori)
const FONT_URLS = {
	regular:
		"https://rsms.me/inter/font-files/Inter-Regular.woff",
	semibold:
		"https://rsms.me/inter/font-files/Inter-SemiBold.woff",
	bold: "https://rsms.me/inter/font-files/Inter-Bold.woff",
};

// Cache fonts in memory
let fontCache: {
	regular: ArrayBuffer | null;
	semibold: ArrayBuffer | null;
	bold: ArrayBuffer | null;
} = { regular: null, semibold: null, bold: null };

export async function getInterFont(): Promise<{
	regular: ArrayBuffer;
	semibold: ArrayBuffer;
}> {
	if (fontCache.regular && fontCache.semibold) {
		return { regular: fontCache.regular, semibold: fontCache.semibold };
	}

	const [regular, semibold] = await Promise.all([
		fetch(FONT_URLS.regular).then((res) => res.arrayBuffer()),
		fetch(FONT_URLS.semibold).then((res) => res.arrayBuffer()),
	]);

	fontCache.regular = regular;
	fontCache.semibold = semibold;

	return { regular, semibold };
}

export async function getInterBold(): Promise<ArrayBuffer> {
	if (fontCache.bold) {
		return fontCache.bold;
	}

	const bold = await fetch(FONT_URLS.bold).then((res) => res.arrayBuffer());
	fontCache.bold = bold;

	return bold;
}
