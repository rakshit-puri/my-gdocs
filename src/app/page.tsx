import Link from 'next/link';
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      Click <Link href="/documents/1512" className="text-blue-500 hover:underline">here</Link> to go to document id.
    </div>
  );
}

export default Home;