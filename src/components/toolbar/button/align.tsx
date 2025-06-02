"use client";
import { useEditorStore } from "@/store/use-editor-store";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon } from "lucide-react";

const AlignButton = () => {
	const { editor } = useEditorStore();

	const alignments = [
		{
			label: "Align Left",
			value: "left",
			icon: AlignLeftIcon,
			isActive: () => editor?.isActive({ textAlign: "left" }),
		},
		{
			label: "Align Center",
			value: "center",
			icon: AlignCenterIcon,
			isActive: () => editor?.isActive({ textAlign: "center" }),
		},
		{
			label: "Align Right",
			value: "right",
			icon: AlignRightIcon,
			isActive: () => editor?.isActive({ textAlign: "right" }),
		},
		{
			label: "Justify Content",
			value: "justify",
			icon: AlignJustifyIcon,
			isActive: () => editor?.isActive({ textAlign: "justify" }),
		},
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
					{/* TODO: Change this icon when testAlign updates */}
					<AlignLeftIcon className="size-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{alignments.map(({ label, value, icon: Icon, isActive }) => (
					<DropdownMenuItem
						key={value}
						onClick={() => editor?.chain().focus().setTextAlign?.(value).run()}
						className={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
							isActive() && "bg-neutral-200/80"
						)}
					>
						<Icon className="size-4" />
						<span className="text-sm">{label}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AlignButton;
