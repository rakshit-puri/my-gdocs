"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullScreenLoader } from "@/components/full-screen-loader";
import { getUsers } from "./actions";
import { toast } from "sonner";

type User = { id: string; name: string; avatar: string };

export function Room({ children }: { children: ReactNode }) {
	const params = useParams();
	const [users, setUsers] = useState<User[]>([]);

	const fetchUsers = useMemo(
		() => async () => {
			try {
				const userList = await getUsers();
				setUsers(userList);
			} catch {
				toast.error("Failed to fetch users");
			}
		},
		[]
	);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	return (
		<LiveblocksProvider
			authEndpoint="/api/liveblocks-auth"
			throttle={16}
			resolveUsers={({ userIds }) => {
				return userIds.map((userId) => users.find((user) => user.id === userId) ?? undefined);
			}}
			resolveMentionSuggestions={({ text }) => {
				let filteredUsers = users;

				if (text) {
					filteredUsers = users.filter((user) => user.name?.toLowerCase().includes(text.toLowerCase()));
				}
				return filteredUsers.map((user) => user.id);
			}}
			resolveRoomsInfo={() => []}
		>
			<RoomProvider id={params.documentId as string}>
				<ClientSideSuspense fallback={<FullScreenLoader label="Room Loading" />}>{children}</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}
