"use client";

import { Button } from "@heroui/react";
import { Chip } from "@heroui/react";
import { Input, Textarea } from "@heroui/react";
import { Modal, ModalBody, ModalContent } from "@heroui/react";
import { ScrollShadow } from "@heroui/react";
import {
	PencilEdit01Icon,
	Cancel01Icon,
	PlusSignIcon,
	Mail01Icon,
	Loading03Icon,
	Tick02Icon,
	HugeiconsIcon,
} from "@/components/icons";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";

// Email validation schema
const emailComposeSchema = z.object({
	to: z
		.array(z.string().email("Invalid email address"))
		.min(1, "At least one recipient is required"),
	subject: z
		.string()
		.min(1, "Subject is required")
		.max(200, "Subject must be under 200 characters"),
	body: z
		.string()
		.min(1, "Email body is required")
		.max(10000, "Email body must be under 10,000 characters"),
});

const emailValidationSchema = z.string().email("Invalid email address");

export interface EmailData {
	to: string[];
	subject: string;
	body: string;
	draft_id?: string;
	thread_id?: string;
	bcc?: string[];
	cc?: string[];
	is_html?: boolean;
}

export interface EmailComposeCardProps {
	emailData: EmailData;
	onSend?: (data: EmailData) => void;
	className?: string;
}

function RecipientSelectionModal({
	isOpen,
	onClose,
	onConfirm,
	suggestions,
	selectedEmails,
	setSelectedEmails,
	customEmailInput,
	setCustomEmailInput,
	customEmailError,
	setCustomEmailError,
	handleAddCustomEmail,
}: {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	suggestions: string[];
	selectedEmails: string[];
	setSelectedEmails: React.Dispatch<React.SetStateAction<string[]>>;
	customEmailInput: string;
	setCustomEmailInput: React.Dispatch<React.SetStateAction<string>>;
	customEmailError: string;
	setCustomEmailError: React.Dispatch<React.SetStateAction<string>>;
	handleAddCustomEmail: () => void;
}) {
	const handleSuggestionToggle = (email: string) => {
		setSelectedEmails((prev) => {
			if (prev.includes(email)) {
				// Remove from selected
				return prev.filter((e) => e !== email);
			} else {
				// Add to selected
				return [...prev, email];
			}
		});
	};

	const handleCustomEmailKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAddCustomEmail();
		}
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onClose} size="sm">
			<ModalContent>
				<ModalBody>
					<div className="pt-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
						Email Suggestions
					</div>

					{/* Suggestions */}
					<div className="flex flex-wrap gap-2">
						{suggestions.map((email) => (
							<Chip
								key={email}
								size="sm"
								variant="flat"
								color={selectedEmails.includes(email) ? "primary" : "default"}
								className="cursor-pointer text-xs"
								onClick={() => handleSuggestionToggle(email)}
								endContent={
									selectedEmails.includes(email) ? (
										<HugeiconsIcon icon={Cancel01Icon} size={12} />
									) : null
								}
							>
								{email}
							</Chip>
						))}
					</div>

					<hr className="my-2 border-zinc-200 dark:border-zinc-700" />

					<div className="flex gap-2">
						<Input
							placeholder="Add email..."
							value={customEmailInput}
							onChange={(e) => {
								setCustomEmailInput(e.target.value);
								setCustomEmailError("");
							}}
							onKeyDown={handleCustomEmailKeyPress}
							size="sm"
							isInvalid={!!customEmailError}
							errorMessage={customEmailError}
						/>
						<Button
							size="sm"
							color="primary"
							onPress={handleAddCustomEmail}
							isIconOnly
						>
							<HugeiconsIcon icon={PlusSignIcon} size={16} />
						</Button>
					</div>

					{/* Action Buttons */}
					<div className="mt-4 flex justify-end gap-2">
						<Button variant="light" size="sm" onPress={onClose}>
							Cancel
						</Button>
						<Button
							color="primary"
							size="sm"
							onPress={onConfirm}
							isDisabled={selectedEmails.length === 0}
						>
							Done ({selectedEmails.length})
						</Button>
					</div>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

export function EmailComposeCard({
	emailData,
	onSend,
	className,
}: EmailComposeCardProps) {
	const [isRecipientModalOpen, setIsRecipientModalOpen] = useState(false);
	const [isSending, setIsSending] = useState(false);

	// Inline editing states
	const [isEditingSubject, setIsEditingSubject] = useState(false);
	const [isEditingBody, setIsEditingBody] = useState(false);

	const [editData, setEditData] = useState<EmailData>(emailData);
	const [errors, setErrors] = useState<Record<string, string>>({});

	// Suggestions come from emailData.to - these are resolved email addresses from the agent
	const [suggestions, setSuggestions] = useState<string[]>(emailData.to || []);

	// Selected emails state
	const [selectedEmails, setSelectedEmails] = useState<string[]>(
		emailData.to || [],
	);

	// Custom email input state
	const [customEmailInput, setCustomEmailInput] = useState("");
	const [customEmailError, setCustomEmailError] = useState("");

	// Input refs for auto-focus
	const subjectInputRef = useRef<HTMLInputElement>(null);
	const bodyInputRef = useRef<HTMLTextAreaElement>(null);

	// Initialize with empty emails array - user must select recipients
	// If there's only one email, select it by default
	useEffect(() => {
		const suggestions = emailData.to || [];
		setEditData((prev) => ({ ...prev, to: [] }));
		setSuggestions(suggestions);

		// If there's exactly one email suggestion, select it by default
		if (suggestions.length === 1) setSelectedEmails([suggestions[0]]);
		else setSelectedEmails([]);
	}, [emailData.to]);

	// Auto-focus logic
	useEffect(() => {
		if (isEditingSubject && subjectInputRef.current) {
			subjectInputRef.current.focus();
		}
	}, [isEditingSubject]);

	useEffect(() => {
		if (isEditingBody && bodyInputRef.current) {
			bodyInputRef.current.focus();
		}
	}, [isEditingBody]);

	const validateForm = () => {
		try {
			emailComposeSchema.parse({
				to: selectedEmails,
				subject: editData.subject,
				body: editData.body,
			});

			setErrors({});
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const newErrors: Record<string, string> = {};
				error.errors.forEach((err) => {
					if (err.path[0]) {
						newErrors[err.path[0].toString()] = err.message;
					}
				});
				setErrors(newErrors);
			}
			return false;
		}
	};

	const validateCustomEmail = (email: string): boolean => {
		try {
			emailValidationSchema.parse(email);
			setCustomEmailError("");
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				setCustomEmailError(error.errors[0]?.message || "Invalid email");
			}
			return false;
		}
	};

	const handleSend = async () => {
		if (selectedEmails.length === 0) {
			console.error("Please select at least one recipient");
			return;
		}

		if (!validateForm()) {
			console.error("Please fix the validation errors");
			return;
		}

		setIsSending(true);
		try {
			if (onSend) {
				await onSend({ ...editData, to: selectedEmails });
			}
		} catch (error) {
			console.error("Error sending email:", error);
		} finally {
			setIsSending(false);
		}
	};

	// Handle custom email addition
	const handleAddCustomEmail = () => {
		const trimmedEmail = customEmailInput.trim();

		if (!trimmedEmail) {
			setCustomEmailError("Please enter an email address");
			return;
		}

		if (!validateCustomEmail(trimmedEmail)) {
			return;
		}

		if (selectedEmails.includes(trimmedEmail)) {
			setCustomEmailError("Email already selected");
			return;
		}

		// Add to selected emails
		setSelectedEmails((prev) => [...prev, trimmedEmail]);

		// Add to suggestions if not already there
		if (!suggestions.includes(trimmedEmail)) {
			setSuggestions((prev) => [...prev, trimmedEmail]);
		}

		// Clear input
		setCustomEmailInput("");
		setCustomEmailError("");
	};

	const handleConfirmRecipients = () => {
		setEditData((prev) => ({ ...prev, to: selectedEmails }));
		setIsRecipientModalOpen(false);
	};

	return (
		<>
			{/* Main Email Card - Zinc Colors, Flat & Rounded, Light/Dark Mode */}
			<div
				className={cn(
					"w-full max-w-xl overflow-hidden rounded-3xl",
					"bg-zinc-100 dark:bg-zinc-900",
					className,
				)}
			>
				{/* Header with status chip */}
				<div className="flex items-center justify-between px-6 py-1">
					<div className="flex flex-row items-center gap-2 pt-3 pb-2 text-zinc-900 dark:text-zinc-100">
						<HugeiconsIcon icon={Mail01Icon} size={18} />
						<span className="text-sm font-medium">
							{emailData.draft_id ? "Email Draft" : "Compose Email"}
						</span>
						{emailData.thread_id && (
							<Chip size="sm" variant="flat" color="primary">
								Reply
							</Chip>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-1 px-6">
					<div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
						<span>To:</span>
						<span className="flex w-full items-center justify-between font-medium text-zinc-900 dark:text-zinc-200">
							{selectedEmails.join(", ") || ""}
							<Button
								size="sm"
								onPress={() => setIsRecipientModalOpen(true)}
								variant={selectedEmails.length === 0 ? "flat" : "light"}
								isIconOnly={selectedEmails.length === 0 ? false : true}
								className={cn(
									selectedEmails.length === 0
										? ""
										: "text-zinc-500 dark:text-zinc-400",
								)}
								endContent={
									selectedEmails.length === 0 ? (
										""
									) : (
										<HugeiconsIcon icon={PencilEdit01Icon} size={20} />
									)
								}
							>
								{selectedEmails.length === 0 ? "Add Recipients" : ``}
							</Button>
						</span>
					</div>
					<div className="my-1.5 h-px bg-zinc-200 dark:bg-zinc-800" />
					<div className="flex w-full items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
						<div className="flex items-center gap-2 w-full">
							<span className="flex-shrink-0">Subject:</span>
							{isEditingSubject ? (
								<Input
									ref={subjectInputRef}
									value={editData.subject}
									onChange={(e) =>
										setEditData({ ...editData, subject: e.target.value })
									}
									onBlur={() => setIsEditingSubject(false)}
									onKeyDown={(e) => {
										if (e.key === "Enter") setIsEditingSubject(false);
									}}
									size="sm"
									classNames={{
										input:
											"text-base font-medium text-zinc-900 dark:text-zinc-200",
										inputWrapper:
											"h-7 min-h-7 bg-transparent shadow-none border-none px-0",
									}}
								/>
							) : (
								<span className="font-medium text-zinc-900 dark:text-zinc-200 truncate flex-1">
									{editData.subject}
								</span>
							)}
						</div>

						<Button
							variant="light"
							size="sm"
							isIconOnly
							onPress={() => setIsEditingSubject(!isEditingSubject)}
							className="text-zinc-500 dark:text-zinc-400"
						>
							{isEditingSubject ? (
								<HugeiconsIcon icon={Tick02Icon} size={20} />
							) : (
								<HugeiconsIcon icon={PencilEdit01Icon} size={20} />
							)}
						</Button>
					</div>
					<div className="my-1.5 h-px bg-zinc-200 dark:bg-zinc-800" />

					<ScrollShadow className="relative z-[1] max-h-46 min-h-[150px] overflow-y-auto pb-5 text-sm leading-relaxed whitespace-pre-line text-zinc-800 dark:text-zinc-200">
						<div className="absolute top-0 right-0 z-[2] flex w-full justify-end">
							<Button
								variant="light"
								size="sm"
								isIconOnly
								onPress={() => setIsEditingBody(!isEditingBody)}
								className="text-zinc-500 dark:text-zinc-400"
							>
								{isEditingBody ? (
									<HugeiconsIcon icon={Tick02Icon} size={20} />
								) : (
									<HugeiconsIcon icon={PencilEdit01Icon} size={20} />
								)}
							</Button>
						</div>

						{isEditingBody ? (
							<Textarea
								ref={bodyInputRef}
								value={editData.body}
								onChange={(e) =>
									setEditData({ ...editData, body: e.target.value })
								}
								onBlur={() => setIsEditingBody(false)}
								minRows={6}
								classNames={{
									input:
										"text-sm text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
									inputWrapper: "bg-transparent shadow-none border-none p-0",
								}}
							/>
						) : (
							editData.body
						)}
					</ScrollShadow>
				</div>
				<div className="flex justify-end px-6 pb-5">
					<Button
						color="primary"
						onPress={handleSend}
						isLoading={isSending}
						isDisabled={selectedEmails.length === 0}
						radius="full"
						className="font-medium"
					>
						{isSending ? (
							<>
								<HugeiconsIcon
									icon={Loading03Icon}
									size={16}
									className="animate-spin"
								/>
								Sending...
							</>
						) : emailData.draft_id ? (
							"Send Draft"
						) : (
							"Send"
						)}
					</Button>
				</div>
			</div>

			<RecipientSelectionModal
				isOpen={isRecipientModalOpen}
				onClose={() => setIsRecipientModalOpen(false)}
				onConfirm={handleConfirmRecipients}
				suggestions={suggestions}
				selectedEmails={selectedEmails}
				setSelectedEmails={setSelectedEmails}
				customEmailInput={customEmailInput}
				setCustomEmailInput={setCustomEmailInput}
				customEmailError={customEmailError}
				setCustomEmailError={setCustomEmailError}
				handleAddCustomEmail={handleAddCustomEmail}
			/>
		</>
	);
}
