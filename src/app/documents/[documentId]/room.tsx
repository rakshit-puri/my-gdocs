"use client";

import { ReactNode } from "react";
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullScreenLoader } from "@/components/full-screen-loader";

export function Room({ children }: { children: ReactNode }) {
	const params = useParams();
	return (
		<LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16}>
			<RoomProvider id={params.documentId as string}>
				<ClientSideSuspense fallback={<FullScreenLoader label="Room Loading" />}>{children}</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}
