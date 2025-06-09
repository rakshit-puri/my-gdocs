import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { getCachedSession, getCachedUser } from "@/lib/auth";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
	secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
	throw new Error("Missing NEXT_PUBLIC_CONVEX_URL in your .env file");
}

export async function POST(req: Request) {
	const { sessionClaims } = await getCachedSession();
	const user = await getCachedUser();
	if (!sessionClaims || !user) {
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

	const name = user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous";
	const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
	const hue = hash % 360;
	const color = `hsl(${hue}, 70%, 60%)`;

	const session = liveblocks.prepareSession(user.id, {
		userInfo: {
			name,
			avatar: user.imageUrl,
			color,
		},
	});

	session.allow(room, session.FULL_ACCESS);
	const { body, status } = await session.authorize();

	return new Response(body, { status });
}
