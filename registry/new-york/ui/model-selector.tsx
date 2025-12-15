"use client";

import type { FC } from "react";
import { useState } from "react";
import {
	Tick02Icon,
	ArrowDown01Icon,
	AiMagicIcon,
	HugeiconsIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

export interface AIModel {
	id: string;
	name: string;
	provider: string;
	icon?: string;
	isPro?: boolean;
	description?: string;
}

export interface ModelSelectorProps {
	models: AIModel[];
	selectedModel: AIModel;
	onSelect: (model: AIModel) => void;
	disabled?: boolean;
	className?: string;
}

export const ModelSelector: FC<ModelSelectorProps> = ({
	models,
	selectedModel,
	onSelect,
	disabled = false,
	className,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = (model: AIModel) => {
		onSelect(model);
		setIsOpen(false);
	};

	return (
		<div className={cn("relative font-sans", className)}>
			{/* Trigger button */}
			<button
				type="button"
				onClick={() => !disabled && setIsOpen(!isOpen)}
				disabled={disabled}
				className={cn(
					"group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 w-full text-left",
					"bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800",
					"ring-1 ring-inset ring-zinc-200 dark:ring-zinc-800",
					"hover:ring-zinc-300 dark:hover:ring-zinc-700",
					"focus:outline-none focus:ring-2 focus:ring-blue-500/20",
					disabled && "opacity-50 cursor-not-allowed",
					isOpen &&
						"ring-zinc-300 dark:ring-zinc-700 bg-zinc-100 dark:bg-zinc-800",
				)}
			>
				<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700 text-zinc-900 dark:text-zinc-100 overflow-hidden">
					{selectedModel.icon ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={selectedModel.icon}
							alt={selectedModel.name}
							className="h-full w-full object-cover"
						/>
					) : (
						<HugeiconsIcon icon={AiMagicIcon} size={20} />
					)}
				</div>

				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2">
						<span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
							{selectedModel.name}
						</span>
						{selectedModel.isPro && (
							<span className="flex-shrink-0 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm shadow-blue-500/20 tracking-wide">
								PRO
							</span>
						)}
					</div>
					<div className="flex items-center gap-1.5 mt-0.5">
						<span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
						<span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
							{selectedModel.provider}
						</span>
					</div>
				</div>
				<HugeiconsIcon
					icon={ArrowDown01Icon}
					size={18}
					className={cn(
						"text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-transform duration-200",
						isOpen && "rotate-180",
					)}
				/>
			</button>

			{/* Dropdown */}
			{isOpen && (
				<>
					{/* Backdrop */}
					<button
						type="button"
						className="fixed inset-0 z-40 cursor-default"
						onClick={() => setIsOpen(false)}
						onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
						aria-label="Close dropdown"
					/>

					{/* Dropdown menu */}
					<div
						className={cn(
							"absolute top-[calc(100%+8px)] left-0 right-0 z-50 overflow-hidden rounded-2xl shadow-xl shadow-zinc-900/5 ring-1 ring-zinc-200 dark:ring-zinc-800",
							"bg-white dark:bg-zinc-900 p-1.5 animate-in fade-in zoom-in-95 duration-100",
						)}
					>
						<div className="max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 pr-1">
							{models.map((model) => {
								const isSelected = selectedModel.id === model.id;
								return (
									<button
										key={model.id}
										type="button"
										onClick={() => handleSelect(model)}
										className={cn(
											"flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200",
											"hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
											isSelected &&
												"bg-zinc-50 hover:bg-zinc-50 dark:bg-zinc-800/50",
										)}
									>
										<div
											className={cn(
												"flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ring-1 ring-inset overflow-hidden",
												isSelected
													? "bg-white ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700"
													: "bg-zinc-50 ring-zinc-100 dark:bg-zinc-800/50 dark:ring-zinc-800 text-zinc-400 dark:text-zinc-500",
											)}
										>
											{model.icon ? (
												// eslint-disable-next-line @next/next/no-img-element
												<img
													src={model.icon}
													alt={model.name}
													className="h-full w-full object-cover"
												/>
											) : (
												<HugeiconsIcon icon={AiMagicIcon} size={18} />
											)}
										</div>

										<div className="flex-1 min-w-0 pt-0.5">
											<div className="flex items-center justify-between gap-2">
												<span
													className={cn(
														"text-sm font-semibold truncate",
														isSelected
															? "text-zinc-900 dark:text-zinc-100"
															: "text-zinc-700 dark:text-zinc-300",
													)}
												>
													{model.name}
												</span>
												{model.isPro && (
													<span className="rounded-full bg-blue-500/10 dark:bg-blue-500/20 px-1.5 py-0.5 text-[9px] font-bold text-blue-600 dark:text-blue-400">
														PRO
													</span>
												)}
											</div>
											<div className="flex items-center gap-1.5">
												<span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
													{model.provider}
												</span>
												{isSelected && (
													<HugeiconsIcon
														icon={Tick02Icon}
														size={14}
														className="text-blue-500 ml-auto"
													/>
												)}
											</div>
											{model.description && (
												<p className="mt-1 text-xs text-zinc-400 line-clamp-1">
													{model.description}
												</p>
											)}
										</div>
									</button>
								);
							})}
						</div>
					</div>
				</>
			)}
		</div>
	);
};
