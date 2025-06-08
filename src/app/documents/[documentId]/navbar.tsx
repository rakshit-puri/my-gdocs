"use client";

import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
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
import { Inbox } from "./inbox";
import { RemoveDialog } from "@/components/remove-dialog";
import { RenameDialog } from "@/components/rename-dialog";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { FullScreenLoader } from "@/components/full-screen-loader";

interface NavbarProps {
	showRuler: boolean;
	toggleRuler?: () => void;
	data: Doc<"documents"> | null;
}

export const Navbar = ({ showRuler, toggleRuler, data }: NavbarProps) => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { editor } = useEditorStore();
	const chain = () => editor?.chain().focus();

	const create = useMutation(api.documents.createDocument);
	useEffect(() => {
		if (data == null) {
			setLoading(true);
			router.push("/");
		}
	}, [data, router]);

	if (!data) {
		return null;
	}

	if (loading) {
		return <FullScreenLoader label="Loading..." />;
	}

	const onNewDocument = () => {
		create({
			title: "Untitled Document",
			initialContent: "",
		})
			.catch(() => toast.error("Something went wrong"))
			.then((id) => {
				toast.success("Document created");
				router.push(`/documents/${id}`);
			});
	};

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
		onDownload(blob, `${data.title}.json`);
	};

	const onSaveHTML = () => {
		if (!editor) return;

		const content = editor.getHTML();
		const blob = new Blob([content], {
			type: "text/html",
		});
		onDownload(blob, `${data.title}.html`);
	};

	const onSaveText = () => {
		if (!editor) return;

		const content = editor.getText();
		const blob = new Blob([content], {
			type: "text/plain",
		});
		onDownload(blob, `${data.title}.txt`);
	};

	return (
		<nav className="flex items-center justify-between h-full w-screen">
			<div className="flex gap-3 items-center">
				<button
					type="button"
					onClick={() => {
						setLoading(true);
						router.push("/");
					}}
					className="p-0 border-0 bg-transparent"
					aria-label="Go to home"
				>
					<Image src="/icon.svg" alt="Logo" width={36} height={36} />
				</button>
				<div className="flex flex-col">
					<DocumentInput title={data.title} id={data._id} />
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
									<MenubarItem onClick={onNewDocument}>
										<FilePlusIcon className="size-4 mr-2" />
										New Document
									</MenubarItem>
									<MenubarSeparator />
									<RenameDialog documentId={data._id} initialTitle={data.title}>
										<MenubarItem
											onClick={(e) => e.stopPropagation()}
											onSelect={(e) => e.preventDefault()}
										>
											<FilePenIcon className="size-4 mr-2" />
											Rename
										</MenubarItem>
									</RenameDialog>
									<RemoveDialog documentId={data._id}>
										<MenubarItem
											onClick={(e) => e.stopPropagation()}
											onSelect={(e) => e.preventDefault()}
										>
											<Trash className="size-4 mr-2" />
											Remove
										</MenubarItem>
									</RemoveDialog>
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
			<div className="flex items-center gap-3 pr-12 mr-1">
				<Avatars />
				<Inbox />
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
