import Image from "next/image";
import { DocumentInput } from "./document-input";
import Link from "next/link";

export const Navbar = () => {
	return (
		<nav className="flex items-center">
			<div className="flex gap-2 items-center">
				<Link href="/">
					<Image src="/icon.svg" alt="Logo" width={36} height={36} />
				</Link>
			</div>
			<div className="flex flex-col">
				<DocumentInput />
				{/* Menu Bar*/}
			</div>
		</nav>
	);
};
