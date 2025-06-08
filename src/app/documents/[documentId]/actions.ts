"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getDocuments(ids: Id<"documents">[]) {
    return await convex.query(api.documents.getByIds, {ids: ids});
}

export async function getUsers() {
    const { sessionClaims } = await auth();
    const clerk = await clerkClient();

    const orgId = (sessionClaims?.o as { id: string })?.id;

    const response = await clerk.users.getUserList({
        organizationId: [orgId]
    });

    const users = response.data.map((user) => {
        const name = user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous";
        const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const hue = hash % 360;
        const color = `hsl(${hue}, 70%, 60%)`;
        return {
            id: user.id,
            name: name,
            avatar: user.imageUrl,
            color: color
        };
    })

    return users;
}