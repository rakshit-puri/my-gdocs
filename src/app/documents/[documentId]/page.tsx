interface DocumentPageProps {
  params: Promise<{ documentId: string }>
};

const DocumentIdPage = async ({ params }: DocumentPageProps) => {
    const awaitedParams = await params;
    const documentId = awaitedParams.documentId;
    
    return (
        <div>
        <h1>Document ID: {documentId}</h1>
        </div>
    );
}

export default DocumentIdPage;