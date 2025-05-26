import { Editor } from './editor';
 
interface DocumentPageProps {
  params: Promise<{ documentId: string }>
};

const DocumentIdPage = async ({ params }: DocumentPageProps) => {
    const { documentId } = await params;
    
    return (
        <div className='min-h-screen bg-[#FAFBFD]'>
        <Editor />
        </div>
    );
}

export default DocumentIdPage;