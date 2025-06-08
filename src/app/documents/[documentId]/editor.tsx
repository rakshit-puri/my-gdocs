"use client";

import { Ruler } from "./ruler";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TextAlign from "@tiptap/extension-text-align";
import ImageResize from "tiptap-extension-resize-image";
import { Link } from "@tiptap/extension-link";
import { FontFamily } from "@tiptap/extension-font-family";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Underline } from "@tiptap/extension-underline";
import { useEditor, EditorContent } from "@tiptap/react";
import { useEditorStore } from "@/store/use-editor-store";
import { ResizableTable } from "@/components/resizable-table";
import { FontSize } from "@/extensions/font-size";
import { LineHeight } from "@/extensions/line-height";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { Threads } from "./threads";
import { useStorage, ClientSideSuspense } from "@liveblocks/react/suspense";
import { DEFAULT_MARGIN } from "@/constants/margin";

interface EditorProps {
	showRuler: boolean;
	initialContent: string | undefined;
}

export const Editor = ({ showRuler, initialContent }: EditorProps) => {
	const { setEditor } = useEditorStore();
	const leftMargin = useStorage((root) => root.leftMargin);
	const rightMargin = useStorage((root) => root.rightMargin);

	const liveblocks = useLiveblocksExtension({
		initialContent,
		offlineSupport_experimental: true,
	});

	const editor = useEditor({
		onCreate({ editor }) {
			setEditor(editor);
		},
		onDestroy() {
			setEditor(null);
		},
		onUpdate({ editor }) {
			setEditor(editor);
		},
		onSelectionUpdate({ editor }) {
			setEditor(editor);
		},
		onTransaction({ editor }) {
			setEditor(editor);
		},
		onFocus({ editor }) {
			setEditor(editor);
		},
		onBlur({ editor }) {
			setEditor(editor);
		},
		immediatelyRender: false,
		editorProps: {
			attributes: {
				style: `padding-left: ${leftMargin ?? DEFAULT_MARGIN}px; padding-right: ${rightMargin ?? DEFAULT_MARGIN}px`,
				class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
				spellCheck: "true",
			},
		},
		extensions: [
			liveblocks,
			StarterKit.configure({
				bulletList: {
					keepMarks: true,
					keepAttributes: false,
				},
				orderedList: {
					keepMarks: true,
					keepAttributes: false,
				},
				history: false,
			}),
			ImageResize,
			TextStyle,
			Color,
			Underline,
			FontFamily,
			TableRow,
			TableCell,
			TableHeader,
			FontSize,
			TaskList,

			TaskItem.configure({
				nested: true,
			}),
			ResizableTable.configure({
				resizable: true,
			}),
			Highlight.configure({
				multicolor: true,
			}),
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: "https",
			}),
			LineHeight,
		],
	});
	return (
		<div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
			{showRuler && <Ruler />}
			<div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
				<EditorContent editor={editor} />
				<ClientSideSuspense fallback={null}>
					<Threads editor={editor} />
				</ClientSideSuspense>
			</div>
		</div>
	);
};
