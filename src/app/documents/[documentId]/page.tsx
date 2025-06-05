import { DocumentIdClient } from "./document-id-client";

interface DocumentPageProps {
	params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumentPageProps) => {
	const { documentId } = await params;
	return <DocumentIdClient documentId={documentId} />;
};

export default DocumentIdPage;
