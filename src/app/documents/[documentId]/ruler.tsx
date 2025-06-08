import { useStorage, useMutation } from "@liveblocks/react/suspense";
import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { DEFAULT_MARGIN } from "@/constants/margin";
import { MAJOR_TICKS, SUBDIVISIONS, PAGE_WIDTH, MIN_SPACE } from "@/constants/ruler";

const TOTAL_TICKS = MAJOR_TICKS * SUBDIVISIONS + 1;

export const Ruler = () => {
	const leftMargin = useStorage((root) => root.leftMargin) ?? DEFAULT_MARGIN;
	const setLeftMargin = useMutation(({ storage }, position: number) => {
		storage.set("leftMargin", position);
	}, []);
	const rightMargin = useStorage((root) => root.rightMargin) ?? DEFAULT_MARGIN;
	const setRightMargin = useMutation(({ storage }, position: number) => {
		storage.set("rightMargin", position);
	}, []);

	const [isDraggingLeft, setIsDraggingLeft] = useState(false);
	const [isDraggingRight, setIsDraggingRight] = useState(false);

	const rulerRef = useRef<HTMLDivElement>(null);

	const handleLeftMouseDown = () => {
		setIsDraggingLeft(true);
	};

	const handleRightMouseDown = () => {
		setIsDraggingRight(true);
	};

	const handleMouseUp = () => {
		setIsDraggingLeft(false);
		setIsDraggingRight(false);
	};

	const handleLeftDoubleClick = () => {
		setLeftMargin(DEFAULT_MARGIN);
	};

	const handleRightDoubleClick = () => {
		setRightMargin(DEFAULT_MARGIN);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
			const container = rulerRef.current.querySelector("#ruler-container");
			if (container) {
				const containerRect = container.getBoundingClientRect();
				const relativeX = e.clientX - containerRect.left;
				const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

				if (isDraggingLeft) {
					const maxLeftPosition = PAGE_WIDTH - rightMargin - MIN_SPACE;
					const newPosition = Math.min(rawPosition, maxLeftPosition);
					setLeftMargin(newPosition); // TODO: make collaborative
				}

				if (isDraggingRight) {
					const maxRightPosition = PAGE_WIDTH - (leftMargin + MIN_SPACE);
					const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);
					const newPosition = Math.min(newRightPosition, maxRightPosition);
					setRightMargin(newPosition);
				}
			}
		}
	};

	return (
		<div
			ref={rulerRef}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			className={`w-[${PAGE_WIDTH}px] mx-auto h-6 border-b border-gray-300 flex items-end relative select-none print:hidden`}
		>
			<div id="ruler-container" className="w-full h-full relative">
				<Marker
					position={leftMargin}
					isLeft={true}
					isDragging={isDraggingLeft}
					onMouseDown={handleLeftMouseDown}
					onDoubleClick={handleLeftDoubleClick}
				/>
				<Marker
					position={rightMargin}
					isLeft={false}
					isDragging={isDraggingRight}
					onMouseDown={handleRightMouseDown}
					onDoubleClick={handleRightDoubleClick}
				/>
				<div className="absolute inset-0 bottom-0 h-full">
					<div className={`relative h-full w-[${PAGE_WIDTH}px]`}>
						{Array.from({ length: TOTAL_TICKS }).map((_, i) => {
							const position = Math.round((i * PAGE_WIDTH) / (TOTAL_TICKS - 1));
							return (
								<div key={i} className="absolute bottom-0" style={{ left: `${position}px` }}>
									{i % SUBDIVISIONS === 0 ? (
										<>
											<div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
											<span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
												{i / SUBDIVISIONS + 1}
											</span>
										</>
									) : i % (SUBDIVISIONS / 2) === 0 ? (
										<div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-500" />
									) : (
										<div className="absolute bottom-0 w-[1px] h-1 bg-neutral-500" />
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

interface MarkerProps {
	position: number;
	isLeft: boolean;
	isDragging: boolean;
	onMouseDown: () => void;
	onDoubleClick: () => void;
}

const Marker = ({ position, isLeft, isDragging, onMouseDown, onDoubleClick }: MarkerProps) => {
	return (
		<div
			className="absolute top-0 w-4 h-full cursor-pointer z-[5] group -ml-2"
			style={{
				[isLeft ? "left" : "right"]: `${position}px`,
			}}
			onMouseDown={onMouseDown}
			onDoubleClick={onDoubleClick}
		>
			<FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2" />
			<div
				className="absolute left-1/2 top-4 -translate-x-1/2"
				style={{
					height: "100vh",
					width: "1px",
					transform: "scaleX(0.5)",
					backgroundColor: "#3B72F6",
					display: isDragging ? "block" : "none",
				}}
			></div>
		</div>
	);
};
