import { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "./document";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { getCachedSession } from "../../../lib/auth";

interface DocumentIdPageProps {
	params: Promise<{ documentId: Id<"documents"> }>;
}
const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
	const { documentId } = await params;
	const { token } = await getCachedSession();

	if (!token) {
		throw new Error("Unauthorized");
	}

	const preloadedDocument = await preloadQuery(
		api.documents.getDocumentById,
		{
			id: documentId,
		},
		{ token }
	);

	if (!preloadedDocument) {
		throw new Error("Document not found");
	}

	return <Document preloadedDocument={preloadedDocument} />;
};

export default DocumentIdPage;
