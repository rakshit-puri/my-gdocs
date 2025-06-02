"use client";
import { useState } from "react";
import { useEditorStore } from "@/store/use-editor-store";
import { PlusIcon, MinusIcon } from "lucide-react";

const FontSizeButton = () => {
	const { editor } = useEditorStore();
	const currentFontSizePx = editor?.getAttributes("textStyle").fontSize || "16px";
	const currentFontSize = currentFontSizePx.replace("px", "");

	const [fontSize, setFontSize] = useState(currentFontSize);
	const [inputValue, setInputValue] = useState(fontSize);
	const [isEditing, setIsEditing] = useState(false);

	const updateFontSize = (newSize: string) => {
		const size = parseInt(newSize);
		if (!isNaN(size) && size > 0) {
			editor?.chain().focus().setFontSize(`${size}px`).run();
			setFontSize(newSize);
			setInputValue(newSize);
			setIsEditing(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleInputBlur = () => {
		updateFontSize(inputValue);
	};

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			updateFontSize(inputValue);
			editor?.commands.focus();
		}
	};

	const incrementFontSize = () => {
		const newSize = parseInt(fontSize) + 1;
		updateFontSize(newSize.toString());
	};

	const decrementFontSize = () => {
		const newSize = parseInt(fontSize) - 1;
		if (newSize > 0) {
			updateFontSize(newSize.toString());
		}
	};
	return (
		<div className="flex items-center gap-x-0.5">
			<button
				className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
				onClick={decrementFontSize}
			>
				<MinusIcon className="size-4" />
			</button>
			{isEditing ? (
				<input
					className="h-7 w-7 text-sm text-center border border-neutral-400 rounded-sm cursor-text bg-transparent focus:outline-none focus:ring-0"
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
					onKeyDown={handleInputKeyDown}
				/>
			) : (
				<button
					className="h-7 w-7 text-sm text-center border border-neutral-400 rounded-sm cursor-text hover:bg-neutral-200/80"
					onClick={() => {
						setInputValue(currentFontSize);
						setIsEditing(true);
					}}
				>
					{currentFontSize}
				</button>
			)}
			<button
				className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
				onClick={incrementFontSize}
			>
				<PlusIcon className="size-4" />
			</button>
		</div>
	);
};

export default FontSizeButton;
