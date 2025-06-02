"use client";

import { useEditorStore } from "@/store/use-editor-store";
import LinkButton from "@/components/toolbar/link-button";
import ImageButton from "@/components/toolbar/image-button";
import AlignButton from "@/components/toolbar/align-button";
import ListButton from "@/components/toolbar/list-button";
import TextColorButton from "@/components/toolbar/text-color-button";
import FontFamilyButton from "@/components/toolbar/font-family-button";
import HeadingLevelButton from "@/components/toolbar/heading-level-button";
import HighlightColorButton from "@/components/toolbar/highlight-color-button";
import ToolbarButton from "@/components/toolbar/toolbar-button";
import { Separator } from "@/components/ui/separator";
import {
	LucideIcon,
	MessageSquarePlusIcon,
	Undo2Icon,
	Redo2Icon,
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
	StrikethroughIcon,
	PrinterIcon,
	ListTodoIcon,
	RemoveFormattingIcon,
} from "lucide-react";

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
			<AlignButton />
			{/* TODO: Line Height */}
			<ListButton />
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
