import { Table } from "@tiptap/extension-table";
import { columnResizing, tableEditing } from "prosemirror-tables";
import { Plugin } from "prosemirror-state";

export const ResizableTable = Table.extend({
	addOptions() {
		return {
			...this.parent?.(),
			resizable: true,
		};
	},

	addProseMirrorPlugins() {
		const plugins: Plugin[] = [];

		if (this.options.resizable) {
			plugins.push(
				columnResizing({
					handleWidth: 5,
					cellMinWidth: 40,
					lastColumnResizable: true,
				})
			);
		}

		plugins.push(tableEditing());

		return plugins;
	},
});
