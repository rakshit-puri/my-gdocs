"use client";

import { useState } from "react";
import { useEditorStore } from "@/store/use-editor-store";
import { cn } from "@/lib/utils";
import { SketchPicker, type ColorResult } from "react-color";
import { type Level } from "@tiptap/extension-heading";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	LucideIcon,
	MessageSquarePlusIcon,
	Undo2Icon,
	Redo2Icon,
	BoldIcon,
	Link2Icon,
	ItalicIcon,
	UnderlineIcon,
	StrikethroughIcon,
	PrinterIcon,
	ListTodoIcon,
	RemoveFormattingIcon,
	ChevronDownIcon,
	HighlighterIcon,
	ImageIcon,
	UploadIcon,
	SearchIcon,
} from "lucide-react";

const ImageButton = () => {
	const { editor } = useEditorStore();

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [imageUrl, setImageUrl] = useState("");
	const onChange = (src: string) => {
		editor?.chain().focus().setImage({ src }).run();
	};

	const onUpload = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		input.onchange = (event) => {
			const file = (event.target as HTMLInputElement).files?.[0];
			if (file) {
				const imageUrl = URL.createObjectURL(file);
				onChange(imageUrl);
			}
		};
		input.click();
	};

	const handleImageUrlSubmit = () => {
		if (imageUrl) {
			onChange(imageUrl);
			setImageUrl("");
			setIsDialogOpen(false);
		}
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
						<ImageIcon className="size-4" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={onUpload}>
						<UploadIcon className="size-4 mr-2" />
						Upload
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
						<SearchIcon className="size-4 mr-2" />
						Paste Image URL
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Insert Image URL</DialogTitle>
					</DialogHeader>
					<Input
						placeholder="Paste image URL here"
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleImageUrlSubmit();
							}
						}}
					/>
					<DialogFooter>
						<Button onClick={handleImageUrlSubmit}>Insert</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

const LinkButton = () => {
	const { editor } = useEditorStore();

	const [value, setValue] = useState("");
	const onChange = (href: string) => {
		editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
		setValue("");
	};

	return (
		<DropdownMenu onOpenChange={(open) => open && setValue(editor?.getAttributes("link").href || "")}>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
					<Link2Icon className="size-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
				<Input placeholder="Paste link here" value={value} onChange={(e) => setValue(e.target.value)} />
				<Button onClick={() => onChange(value)}>Apply</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const TextColorButton = () => {
	const { editor } = useEditorStore();

	const value = editor?.getAttributes("textStyle").color || "#000000";
	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setColor(color.hex).run();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
					<span className="truncate size-4">A</span>
					<div className="h-0.5 w-full" style={{ background: value }} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-0">
				<SketchPicker color={value} onChange={onChange} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const HighlightColorButton = () => {
	const { editor } = useEditorStore();

	const value = editor?.getAttributes("highlight")?.color || "";

	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setHighlight({ color: color.hex }).run();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
					<HighlighterIcon className="size-4" />
					<div className="h-0.5 w-full" style={{ background: value }} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-0">
				<SketchPicker color={value} onChange={onChange} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const HeadingLevelButton = () => {
	const { editor } = useEditorStore();
	const headingLevels = [
		{ label: "Normal Text", value: 0, fontSize: "16px" },
		{ label: "Heading 1", value: 1, fontSize: "32px" },
		{ label: "Heading 2", value: 2, fontSize: "24px" },
		{ label: "Heading 3", value: 3, fontSize: "20px" },
		{ label: "Heading 4", value: 4, fontSize: "18px" },
		{ label: "Heading 5", value: 5, fontSize: "16px" },
	];

	const getCurrentHeading = () => {
		for (let level = 0; level <= 5; level++) {
			if (editor?.isActive("heading", { level })) {
				return `Heading ${level}`;
			}
		}

		return "Normal Text";
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
					<span className="truncate">{getCurrentHeading()}</span>
					<ChevronDownIcon className="size-4 ml-2 shrink-0" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{headingLevels.map(({ label, value, fontSize }) => (
					<button
						key={value}
						style={{ fontSize }}
						className={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
							(value == 0 && editor?.isActive("heading")) ||
								(editor?.isActive("heading", { level: value }) && "bg-neutral-200/80")
						)}
						onClick={() => {
							if (value === 0) {
								editor?.chain().focus().setParagraph().run();
							} else {
								editor
									?.chain()
									.focus()
									.toggleHeading({ level: value as Level })
									.run();
							}
						}}
					>
						{label}
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const FontFamilyButton = () => {
	const { editor } = useEditorStore();

	const fonts = [
		{ label: "Arial", value: "Arial" },
		{ label: "Courier New", value: "Courier New" },
		{ label: "Georgia", value: "Georgia" },
		{ label: "Times New Roman", value: "Times New Roman" },
		{ label: "Verdana", value: "Verdana" },
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="text-sm h-7 w-[120px] flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
					<span className="truncate">{editor?.getAttributes("textStyle").fontFamily || "Arial"}</span>
					<ChevronDownIcon className="size-4 ml-2 shrink-0" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{fonts.map(({ label, value }) => (
					<DropdownMenuItem
						key={value}
						onClick={() => editor?.chain().focus().setFontFamily(value).run()}
						className={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
							editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
						)}
						style={{ fontFamily: value }}
					>
						<span className="text-sm">{label}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

interface ToolbarButtonProps {
	onClick?: () => void;
	isActive?: boolean;
	icon: LucideIcon;
}
const ToolbarButton = ({ onClick, isActive, icon: Icon }: ToolbarButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				"text-sm h-7 min-w-7 flex items-center rounded-sm hover:bg-neutral-200/80",
				isActive && "bg-neutral-200/80"
			)}
		>
			<Icon className="size-4" />
		</button>
	);
};

export const Toolbar = () => {
	const { editor } = useEditorStore();

	const sections: {
		label: string;
		icon: LucideIcon;
		onClick: () => void;
		isActive?: boolean;
	}[][] = [
		[
			{
				label: "Undo",
				icon: Undo2Icon,
				onClick: () => editor?.chain().focus().undo().run(),
			},
			{
				label: "Redo",
				icon: Redo2Icon,
				onClick: () => editor?.chain().focus().redo().run(),
			},
			{
				label: "Print",
				icon: PrinterIcon,
				onClick: () => window.print(),
			},
		],
		[
			{
				label: "Bold",
				icon: BoldIcon,
				onClick: () => editor?.chain().focus().toggleBold().run(),
				isActive: editor?.isActive("bold"),
			},
			{
				label: "Italic",
				icon: ItalicIcon,
				onClick: () => editor?.chain().focus().toggleItalic().run(),
				isActive: editor?.isActive("italic"),
			},
			{
				label: "Underline",
				icon: UnderlineIcon,
				onClick: () => editor?.chain().focus().toggleUnderline().run(),
				isActive: editor?.isActive("underline"),
			},
			{
				label: "Strikethrough",
				icon: StrikethroughIcon,
				onClick: () => editor?.chain().focus().toggleStrike().run(),
				isActive: editor?.isActive("strike"),
			},
		],
		[
			{
				label: "Task List",
				icon: ListTodoIcon,
				onClick: () => editor?.chain().focus().toggleTaskList().run(),
				isActive: editor?.isActive("taskList"),
			},
			{
				label: "Comment",
				icon: MessageSquarePlusIcon,
				onClick: () => console.log("TODO: Comment feature not implemented yet"),
				isActive: false,
			},
			{
				label: "Remove Formatting",
				icon: RemoveFormattingIcon,
				onClick: () => editor?.chain().focus().unsetAllMarks().run(),
			},
		],
	];
	return (
		<div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-auto">
			{sections[0].map((item) => (
				<ToolbarButton key={item.label} onClick={item.onClick} isActive={item.isActive} icon={item.icon} />
			))}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<FontFamilyButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<HeadingLevelButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{/* TODO: Font Size */}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<TextColorButton />
			<HighlightColorButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<LinkButton />
			<ImageButton />
			{/* TODO: Align */}
			{/* TODO: Line Height */}
			{/* TODO: List */}
			{/* TODO: Highlight Color */}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{sections[1].map((item) => (
				<ToolbarButton key={item.label} onClick={item.onClick} isActive={item.isActive} icon={item.icon} />
			))}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{sections[2].map((item) => (
				<ToolbarButton key={item.label} onClick={item.onClick} isActive={item.isActive} icon={item.icon} />
			))}
		</div>
	);
};
