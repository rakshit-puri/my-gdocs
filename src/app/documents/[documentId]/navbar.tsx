"use client";

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
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@/components/ui/menubar";
import {
	FileIcon,
	FileJsonIcon,
	FilePenIcon,
	FilePlusIcon,
	FileTextIcon,
	GlobeIcon,
	PrinterIcon,
	Trash,
	Undo2Icon,
	Redo2Icon,
	TextIcon,
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
	StrikethroughIcon,
	CheckIcon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import TableGridPicker from "@/components/table-grid-picker";

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
							<MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
								File
							</MenubarTrigger>
							<MenubarContent className="print:hidden">
								<MenubarSub>
									<MenubarSubTrigger>
										<FileIcon className="size-4 mr-2" />
										Save
									</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem>
											<FileJsonIcon className="size-4 mr-2" />
											JSON
										</MenubarItem>
										<MenubarItem>
											<GlobeIcon className="size-4 mr-2" />
											HTML
										</MenubarItem>
										<MenubarItem>
											<BsFilePdf className="size-4 mr-2" />
											PDF
										</MenubarItem>
										<MenubarItem>
											<FileTextIcon className="size-4 mr-2" />
											TEXT
										</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
								<MenubarItem>
									<FilePlusIcon className="size-4 mr-2" />
									New Document
								</MenubarItem>
								<MenubarSeparator />
								<MenubarItem>
									<FilePenIcon className="size-4 mr-2" />
									Rename
								</MenubarItem>
								<MenubarItem>
									<Trash className="size-4 mr-2" />
									Remove
								</MenubarItem>
								<MenubarSeparator />
								<MenubarItem onClick={() => window.print()}>
									<PrinterIcon className="size-4 mr-2" />
									Print <MenubarShortcut>Ctrl+P</MenubarShortcut>
								</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
						<MenubarMenu>
							<MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
								Edit
							</MenubarTrigger>
							<MenubarContent>
								<MenubarItem>
									<Undo2Icon className="size-4 mr-2" />
									Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut>
								</MenubarItem>
								<MenubarItem>
									<Redo2Icon className="size-4 mr-2" />
									Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut>
								</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
						<MenubarMenu>
							<MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
								View
							</MenubarTrigger>
							<MenubarContent>
								<MenubarItem className="flex items-center justify-between gap-x-4 px-2 py-1 rounded-sm hover:bg-neutral-100">
									<span className="flex items-center gap-x-2">
										{true ? (
											<CheckIcon className="size-4" />
										) : (
											<span style={{ width: 16, height: 16, display: "inline-block" }} />
										)}
										Show Ruler
									</span>
								</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
						<MenubarMenu>
							<MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
								Insert
							</MenubarTrigger>
							<MenubarContent>
								<MenubarSub>
									<MenubarSubTrigger>
										<FileIcon className="size-4 mr-2" />
										Table
									</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem>
											<TableGridPicker
												onSelect={(rows, cols) => {
													// Handle table insert here
													console.log(`Insert table: ${rows} x ${cols}`);
												}}
											/>
										</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
							</MenubarContent>
						</MenubarMenu>
						<MenubarMenu>
							<MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
								Format
							</MenubarTrigger>
							<MenubarContent className="print:hidden">
								<MenubarSub>
									<MenubarSubTrigger>
										<TextIcon className="size-4 mr-2" />
										Text
									</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem className="flex items-center justify-between gap-x-4 px-2 py-1 rounded-sm hover:bg-neutral-100">
											<span className="flex items-center gap-x-2">
												<BoldIcon className="size-4" />
												Bold
											</span>
											<MenubarShortcut>Ctrl+B</MenubarShortcut>
										</MenubarItem>
										<MenubarItem className="flex items-center justify-between gap-x-4 px-2 py-1 rounded-sm hover:bg-neutral-100">
											<span className="flex items-center gap-x-2">
												<ItalicIcon className="size-4" />
												Italic
											</span>
											<MenubarShortcut>Ctrl+I</MenubarShortcut>
										</MenubarItem>
										<MenubarItem className="flex items-center justify-between gap-x-4 px-2 py-1 rounded-sm hover:bg-neutral-100">
											<span className="flex items-center gap-x-2">
												<UnderlineIcon className="size-4" />
												Underline
											</span>
											<MenubarShortcut>Ctrl+U</MenubarShortcut>
										</MenubarItem>
										<MenubarItem className="flex items-center justify-between gap-x-4 px-2 py-1 rounded-sm hover:bg-neutral-100">
											<span className="flex items-center gap-x-2">
												<StrikethroughIcon className="size-4" />
												Strikethrough
											</span>
											<MenubarShortcut>Alt+Shift+5</MenubarShortcut>
										</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
							</MenubarContent>
						</MenubarMenu>
					</Menubar>
				</div>
			</div>
		</nav>
	);
};
