"use client";

import { useState } from "react";

interface TableGridPickerProps {
	maxRows?: number;
	maxCols?: number;
	onSelect: (rows: number, cols: number) => void;
}

const INITIAL_ROWS = 5;
const INITIAL_COLS = 11;
const MAX_ROWS = 20;
const MAX_COLS = 20;

const TableGridPicker = ({ maxRows = INITIAL_ROWS, maxCols = INITIAL_COLS, onSelect }: TableGridPickerProps) => {
	const [rows, setRows] = useState(maxRows);
	const [cols, setCols] = useState(maxCols);
	const [hovered, setHovered] = useState<{ rows: number; cols: number }>({ rows: 0, cols: 0 });

	const handleMouseEnter = (row: number, col: number) => {
		setHovered({ rows: row, cols: col });

		if (row === rows - 1 && rows < MAX_ROWS) setRows((r) => r + 1);
		else if (rows > maxRows && row < rows - 2) setRows((r) => r - 1);

		if (col === cols - 1 && cols < MAX_COLS) setCols((c) => c + 1);
		else if (cols > maxCols && col < cols - 2) setCols((c) => c - 1);
	};

	return (
		<div className="p-3">
			<div className="flex flex-col gap-1">
				{Array.from({ length: rows }).map((_, row) => (
					<div key={row} className="flex gap-1">
						{Array.from({ length: cols }).map((_, col) => {
							const isActive = row <= hovered.rows && col <= hovered.cols;
							return (
								<div
									key={col}
									className={`w-5 h-5 border border-neutral-200 rounded-sm cursor-pointer transition-colors ${
										isActive ? "bg-blue-200 border-blue-400" : "bg-white hover:bg-neutral-100"
									}`}
									onMouseEnter={() => handleMouseEnter(row, col)}
									onClick={() => onSelect(row + 1, col + 1)}
								/>
							);
						})}
					</div>
				))}
			</div>
			<div className="mt-2 text-center text-xs text-neutral-700">
				{hovered.cols + 1} x {hovered.rows + 1}
			</div>
		</div>
	);
};

export default TableGridPicker;
