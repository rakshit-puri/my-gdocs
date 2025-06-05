import Image from "next/image";
import { DocumentInput } from "./document-input";
import Link from "next/link";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSurContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { FileIcon } from "lucide-react";

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
				<div className="flex">
					<Menubar className="border-none bg-transparent shadow-none h-auto p-0">
						<MenubarMenu>
							<MenubarTrigger>File</MenubarTrigger>
							<MenubarContent>
								<MenubarItem>
									<FileIcon />
									Save
								</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
					</Menubar>
				</div>
			</div>
		</nav>
	);
};
