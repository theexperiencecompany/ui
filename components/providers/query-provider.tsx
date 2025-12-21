"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// Cache data for 1 hour by default before considering it stale
						staleTime: 60 * 60 * 1000,
						// Keep cached data for 24 hours
						gcTime: 24 * 60 * 60 * 1000,
						// Retry failed requests 3 times with exponential backoff
						retry: 3,
						// Don't refetch on window focus for static data
						refetchOnWindowFocus: false,
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
