import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
	secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
	throw new Error("Missing NEXT_PUBLIC_CONVEX_URL in your .env file");
}

export async function POST(req: Request) {
	const { sessionClaims } = await auth();
	if (!sessionClaims) {
		return new Response("Unauthorized", { status: 401 });
	}

	const user = await currentUser();
	if (!user) {
		return new Response("Unauthorized", { status: 401 });
	}

	const { room } = await req.json();
	const document = await convex.query(api.documents.getDocumentById, { id: room });

	if (!document) {
		return new Response("Document not found", { status: 404 });
	}

	const isOwner = document.ownerId === user.id;
	const isOrganisationMember = !!(
		document.organizationId && document.organizationId === (sessionClaims.o as { id: string })?.id
	);

	if (!isOwner && !isOrganisationMember) {
		return new Response("Forbidden", { status: 403 });
	}

	const session = liveblocks.prepareSession(user.id, {
		userInfo: {
			name: user.fullName ?? "Anonymous",
			avatar: user.imageUrl,
		},
	});

	session.allow(room, session.FULL_ACCESS);
	const { body, status } = await session.authorize();

	return new Response(body, { status });
}
