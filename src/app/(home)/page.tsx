"use client";

import { Navbar } from "./navbar";
import { TemplateGallery } from "./template-gallery";
import { FullScreenLoader } from "@/components/full-screen-loader";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DocumentsTable } from "./documents-table";
import { useSearchParam } from "@/hooks/use-search-param";
import { useState } from "react";

const PAGE_SIZE = 5;

const Home = () => {
	const [search] = useSearchParam("search");
	const [loading, setLoading] = useState(false);
	const {
		results = [],
		status,
		loadMore,
	} = usePaginatedQuery(api.documents.getDocuments, { search }, { initialNumItems: PAGE_SIZE });

	if (loading) {
		return <FullScreenLoader label="Loading Document..." />;
	}

	return (
		<div className="flex flex-col min-h-screen">
			<div className="fixed top-0 left-0 right-0 z-10 h-16 p-4 bg-white">
				<Navbar />
			</div>
			<div className="mt-16">
				<TemplateGallery setLoading={setLoading} />
				<DocumentsTable documents={results} status={status} loadMore={loadMore} setLoading={setLoading} />
			</div>
		</div>
	);
};

export default Home;
