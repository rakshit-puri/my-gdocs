"use client";
import { useEditorStore } from "@/store/use-editor-store";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListIcon, ListOrderedIcon, CornerDownRight, CornerUpLeft, ChevronDownIcon } from "lucide-react";

const ListButton = () => {
	const { editor } = useEditorStore();
	if (!editor) return null;
	const nestOppositeList = (type: "bulletList" | "orderedList") => {
		const listNode = editor.schema.nodes[type];
		const listItemNode = editor.schema.nodes.listItem;

		editor
			.chain()
			.focus()
			.command(({ tr, state }) => {
				const { selection } = state;
				const { $from } = selection;

				// Find the current listItem position
				let pos = $from.before($from.depth);
				while (state.doc.nodeAt(pos)?.type !== listItemNode && pos > 0) {
					pos--;
				}

				if (pos <= 0) return false;

				const nestedList = listNode.createAndFill();
				if (!nestedList) return false;

				const listItem = state.doc.nodeAt(pos);
				if (!listItem) return false;

				// Only insert if there isn't already a nested list
				if (listItem.content && listItem.content.lastChild?.type === listNode) return false;

				// Insert nested list as a child at the end of the current list item
				tr.insert(pos + listItem.nodeSize - 1, nestedList);
				return true;
			})
			.run();
	};

	const actions = [
		{
			label: "Bullet List",
			icon: ListIcon,
			isActive: () => editor.isActive("bulletList"),
			onClick: () => editor.chain().focus().toggleBulletList().run(),
		},
		{
			label: "Ordered List",
			icon: ListOrderedIcon,
			isActive: () => editor.isActive("orderedList"),
			onClick: () => editor.chain().focus().toggleOrderedList().run(),
		},
		{
			label: "Indent",
			icon: CornerDownRight,
			onClick: () => editor.chain().focus().sinkListItem("listItem").run(),
		},
		{
			label: "Outdent",
			icon: CornerUpLeft,
			onClick: () => editor.chain().focus().liftListItem("listItem").run(),
		},
		{
			label: "Insert Bullet Inside Ordered",
			icon: ListIcon,
			onClick: () => nestOppositeList("bulletList"),
		},
		{
			label: "Insert Ordered Inside Bullet",
			icon: ListOrderedIcon,
			onClick: () => nestOppositeList("orderedList"),
		},
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
					<ListIcon className="size-4" />
					<ChevronDownIcon className="size-3 ml-2 shrink-0" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{actions.map(({ label, icon: Icon, onClick, isActive }) => (
					<DropdownMenuItem
						key={label}
						onClick={onClick}
						className={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
							isActive?.() && "bg-neutral-200/80"
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

export default ListButton;
