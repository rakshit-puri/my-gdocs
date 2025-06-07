"use client";

import { useState } from "react";
import { Editor } from "./editor";
import { Toolbar } from "./toolbar";
import { Navbar } from "./navbar";
import { Room } from "./room";

interface DocumentIdClientProps {
	documentId: string;
}

export const DocumentIdClient = ({ documentId }: DocumentIdClientProps) => {
	const [showRuler, setShowRuler] = useState(true);

	return (
		<div className="min-h-screen bg-[#FAFBFD]">
			<div className="flex flex-col px-4 pt-2 fixed top-0 gap-y-2 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
				<Navbar showRuler={showRuler} toggleRuler={() => setShowRuler((v) => !v)} />
				<Toolbar />
			</div>
			<div className="pt-[114px] print:pt-0">
				<Room>
					<Editor showRuler={showRuler} />
				</Room>
			</div>
		</div>
	);
};
