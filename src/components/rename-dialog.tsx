"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

interface RenameDialogProps {
	documentId: Id<"documents">;
	initialTitle: string;
	children: React.ReactNode;
}

export const RenameDialog = ({ documentId, initialTitle, children }: RenameDialogProps) => {
	const update = useMutation(api.documents.updateDocumentById);
	const [isUpdating, setIsUpdating] = useState(false);
	const [title, setTitle] = useState(initialTitle);
	const [open, setOpen] = useState(false);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsUpdating(true);

		update({ id: documentId, title: title.trim() || "Untitles Document" })
			.catch(() => toast.error("Something went wrong"))
			.then(() => {
				setOpen(false);
				toast.success("Document renamed");
			})
			.finally(() => {
				setIsUpdating(false);
			});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent onClick={(e) => e.stopPropagation()}>
				<form onSubmit={onSubmit}>
					<DialogHeader>
						<DialogTitle>Rename document</DialogTitle>
						<DialogDescription>Enter a new name for your document</DialogDescription>
					</DialogHeader>
					<div className="my-4">
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							onClick={(e) => e.stopPropagation()}
							placeholder="Document name"
						/>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="ghost"
							disabled={isUpdating}
							onClick={(e) => {
								e.stopPropagation();
								setOpen(false);
							}}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={isUpdating}
							onClick={(e) => {
								e.stopPropagation();
							}}
						>
							Save
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
