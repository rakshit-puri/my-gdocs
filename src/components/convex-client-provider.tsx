"use client";
import { ReactNode } from "react";
import { ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, SignIn, useAuth } from "@clerk/nextjs";
import { FullScreenLoader } from "./full-screen-loader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
	throw new Error("Missing NEXT_PUBLIC_CONVEX_URL in your .env file");
}

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<Authenticated>{children}</Authenticated>
				<Unauthenticated>
					<div className="flex flex-col justify-center items-center min-h-screen">
						<SignIn />
					</div>
				</Unauthenticated>
				<AuthLoading>
					<FullScreenLoader label="Auth Loading..." />
				</AuthLoading>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
