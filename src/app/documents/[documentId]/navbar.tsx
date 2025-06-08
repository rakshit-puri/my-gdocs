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
import { useEditorStore } from "@/store/use-editor-store";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { Avatars } from "./avatars";

interface NavbarProps {
	showRuler: boolean;
	toggleRuler?: () => void;
}

export const Navbar = ({ showRuler, toggleRuler }: NavbarProps) => {
	const { editor } = useEditorStore();
	const chain = () => editor?.chain().focus();

	const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
		chain()?.insertTable({ rows, cols, withHeaderRow: false }).run();
	};

	const onDownload = (blob: Blob, fileName: string) => {
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = fileName;
		a.click();
	};

	const onSaveJSON = () => {
		if (!editor) return;

		const content = editor.getJSON();
		const blob = new Blob([JSON.stringify(content)], {
			type: "application/json",
		});
		onDownload(blob, "document.json"); // TODO: use doc name
	};

	const onSaveHTML = () => {
		if (!editor) return;

		const content = editor.getHTML();
		const blob = new Blob([content], {
			type: "text/html",
		});
		onDownload(blob, "document.html"); // TODO: use doc name
	};

	const onSaveText = () => {
		if (!editor) return;

		const content = editor.getText();
		const blob = new Blob([content], {
			type: "text/plain",
		});
		onDownload(blob, "document.txt"); // TODO: use doc name
	};

	return (
		<nav className="flex items-center justify-between h-full w-full">
			<div className="flex gap-3 items-center">
				<Link href="/">
					<Image src="/icon.svg" alt="Logo" width={36} height={36} />
				</Link>
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
											<MenubarItem onClick={onSaveJSON}>
												<FileJsonIcon className="size-4 mr-2" />
												JSON
											</MenubarItem>
											<MenubarItem onClick={onSaveHTML}>
												<GlobeIcon className="size-4 mr-2" />
												HTML
											</MenubarItem>
											<MenubarItem onClick={() => window.print()}>
												<BsFilePdf className="size-4 mr-2" />
												PDF
											</MenubarItem>
											<MenubarItem onClick={onSaveText}>
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
									<MenubarItem onClick={() => chain()?.undo().run()}>
										<Undo2Icon className="size-4 mr-2" />
										Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut>
									</MenubarItem>
									<MenubarItem onClick={() => chain()?.redo().run()}>
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
									<MenubarItem
										onClick={toggleRuler}
										className="flex items-center justify-between gap-x-4 px-2 py-1 rounded-sm hover:bg-neutral-100"
									>
										<span className="flex items-center gap-x-2">
											{showRuler ? (
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
														insertTable({ rows, cols });
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
											<MenubarItem
												onClick={() => chain()?.toggleBold().run()}
												className="flex items-center justify-between gap-x-4 px-2 py-1 rounded-sm hover:bg-neutral-100"
											>
												<span className="flex items-center gap-x-2">
													<BoldIcon className="size-4" />
													Bold
												</span>
												<MenubarShortcut>Ctrl+B</MenubarShortcut>
											</MenubarItem>
											<MenubarItem
												onClick={() => chain()?.toggleItalic().run()}
												className="flex items-center justify-between gap-x-4 px-2 py-1 rounded-sm hover:bg-neutral-100"
											>
												<span className="flex items-center gap-x-2">
													<ItalicIcon className="size-4" />
													Italic
												</span>
												<MenubarShortcut>Ctrl+I</MenubarShortcut>
											</MenubarItem>
											<MenubarItem
												onClick={() => chain()?.toggleUnderline().run()}
												className="flex items-center justify-between gap-x-4 px-2 py-1 rounded-sm hover:bg-neutral-100"
											>
												<span className="flex items-center gap-x-2">
													<UnderlineIcon className="size-4" />
													Underline
												</span>
												<MenubarShortcut>Ctrl+U</MenubarShortcut>
											</MenubarItem>
											<MenubarItem
												onClick={() => chain()?.toggleStrike().run()}
												className="flex items-center justify-between gap-x-4 px-2 py-1 rounded-sm hover:bg-neutral-100"
											>
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
			</div>
			<div className="flex gap-3 items-center pl-6">
				<Avatars />
				<OrganizationSwitcher
					afterCreateOrganizationUrl="/"
					afterLeaveOrganizationUrl="/"
					afterSelectOrganizationUrl="/"
					afterSelectPersonalUrl="/"
				/>
				<UserButton />
			</div>
		</nav>
	);
};
