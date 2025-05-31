"use client";

import { cn } from "@/lib/utils";
import {
	CodeIcon,
	LucideIcon,
	MessageSquarePlusIcon,
	UndoIcon,
	RedoIcon,
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
	StrikethroughIcon,
	PrinterIcon,
	ListTodoIcon,
	RemoveFormattingIcon,
} from "lucide-react";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";

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
				label: "Undo",
				icon: UndoIcon,
				onClick: () => editor?.chain().focus().undo().run(),
			},
			{
				label: "Redo",
				icon: RedoIcon,
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
				label: "Code",
				icon: CodeIcon,
				onClick: () => editor?.chain().focus().toggleCodeBlock().run(),
			},
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

			{sections[1].map((item) => (
				<ToolbarButton key={item.label} onClick={item.onClick} isActive={item.isActive} icon={item.icon} />
			))}

			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{/* TODO: Font Family */}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{/* TODO: Heading */}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{/* TODO: Font Size */}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{/* TODO: Text Color */}
			{/* TODO: Highlight Color */}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{/* TODO: Link */}
			{/* TODO: Image */}
			{/* TODO: Align */}
			{/* TODO: Line Height */}
			{/* TODO: List */}
			{/* TODO: Highlight Color */}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />

			{sections[2].map((item) => (
				<ToolbarButton key={item.label} onClick={item.onClick} isActive={item.isActive} icon={item.icon} />
			))}
		</div>
	);
};
