"use client";

import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel";
import { DocumentRow } from "./document-row";

const PAGE_SIZE = 5;

interface DocumentsTableProps {
	documents: Doc<"documents">[] | undefined;
	status: PaginationStatus;
	loadMore: (numItems: number) => void;
	setLoading: (value: boolean) => void;
}

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DocumentsTable = ({ documents, status, loadMore, setLoading }: DocumentsTableProps) => {
	return (
		<div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
			{documents === undefined ? (
				<div className="h-24 flex items-center justify-center">
					<LoaderIcon className="size-5 text-muted-foreground animate-spin" />
				</div>
			) : (
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent border-none">
							<TableHead>Name</TableHead>
							<TableHead>&nbsp;</TableHead>
							<TableHead className="hidden md:table-cell">Shared</TableHead>
							<TableHead className="hidden md:table-cell">Created At</TableHead>
						</TableRow>
					</TableHeader>
					{documents.length === 0 ? (
						<TableBody>
							<TableRow className="hover:bg-transparent">
								<TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
									No documents found
								</TableCell>
							</TableRow>
						</TableBody>
					) : (
						<TableBody>
							{documents.map((document) => (
								<DocumentRow key={document._id} document={document} setLoading={setLoading} />
							))}
						</TableBody>
					)}
				</Table>
			)}
			<div className="flex items-center justify-center">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => loadMore(PAGE_SIZE)}
					disabled={status !== "CanLoadMore"}
				>
					{status === "CanLoadMore" ? "Load more" : "End of results"}
				</Button>
			</div>
		</div>
	);
};
