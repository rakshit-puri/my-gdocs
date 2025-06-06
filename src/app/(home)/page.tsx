import Link from "next/link";
import { Navbar } from "./navbar";
const Home = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="fixed top-0 left-0 right-0 z-10 h-16 p-4 bg-white">
				<Navbar />
			</div>
			<div className="mt-16">
				Click{" "}
				<Link href="/documents/1512">
					<span className="text-blue-500 hover:underline">&nbsp;here&nbsp;</span>
				</Link>{" "}
				to go to document id.
			</div>
		</div>
	);
};

export default Home;
