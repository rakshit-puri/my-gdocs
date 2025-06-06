import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import ConvexClientProvider from "@/components/convex-client-provider";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "MyDocs",
	description: "A collaborative Document Editor",
	icons: {
		icon: "/icon.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NuqsAdapter>
					<ConvexClientProvider>{children}</ConvexClientProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
