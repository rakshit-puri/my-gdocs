"use client";

import { useState } from "react";
import { Editor } from "./editor";
import { Toolbar } from "./toolbar";
import { Navbar } from "./navbar";
import { Room } from "./room";
import { api } from "../../../../convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";

interface DocumentIdClientProps {
	preloadedDocument: Preloaded<typeof api.documents.getDocumentById>;
}

export const Document = ({ preloadedDocument }: DocumentIdClientProps) => {
	const document = usePreloadedQuery(preloadedDocument);
	const [showRuler, setShowRuler] = useState(true);

	return (
		<Room>
			<div className="min-h-screen bg-[#FAFBFD]">
				<div className="flex flex-col px-4 pt-2 fixed top-0 gap-y-2 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
					<Navbar showRuler={showRuler} toggleRuler={() => setShowRuler((v) => !v)} data={document} />
					<Toolbar />
				</div>
				<div className="pt-[114px] print:pt-0">
					<Editor showRuler={showRuler} />
				</div>
			</div>
		</Room>
	);
};
