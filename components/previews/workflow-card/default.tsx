"use client";

import type { SVGProps } from "react";
import {
	type ToolCategoryConfig,
	WorkflowCard,
	type WorkflowStep,
} from "@/registry/new-york/ui/workflow-card";

const Notion = (props: SVGProps<SVGSVGElement>) => (
	<svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 268">
		<title>Notion Icon</title>
		<path
			fill="#FFF"
			d="M16.092 11.538 164.09.608c18.179-1.56 22.85-.508 34.28 7.801l47.243 33.282C253.406 47.414 256 48.975 256 55.207v182.527c0 11.439-4.155 18.205-18.696 19.24L65.44 267.378c-10.913.517-16.11-1.043-21.825-8.327L8.826 213.814C2.586 205.487 0 199.254 0 191.97V29.726c0-9.352 4.155-17.153 16.092-18.188Z"
		/>
		<path d="M164.09.608 16.092 11.538C4.155 12.573 0 20.374 0 29.726v162.245c0 7.284 2.585 13.516 8.826 21.843l34.789 45.237c5.715 7.284 10.912 8.844 21.825 8.327l171.864-10.404c14.532-1.035 18.696-7.801 18.696-19.24V55.207c0-5.911-2.336-7.614-9.21-12.66l-1.185-.856L198.37 8.409C186.94.1 182.27-.952 164.09.608ZM69.327 52.22c-14.033.945-17.216 1.159-25.186-5.323L23.876 30.778c-2.06-2.086-1.026-4.69 4.163-5.207l142.274-10.395c11.947-1.043 18.17 3.12 22.842 6.758l24.401 17.68c1.043.525 3.638 3.637.517 3.637L71.146 52.095l-1.819.125Zm-16.36 183.954V81.222c0-6.767 2.077-9.887 8.3-10.413L230.02 60.93c5.724-.517 8.31 3.12 8.31 9.879v153.917c0 6.767-1.044 12.49-10.387 13.008l-161.487 9.361c-9.343.517-13.489-2.594-13.489-10.921ZM212.377 89.53c1.034 4.681 0 9.362-4.681 9.897l-7.783 1.542v114.404c-6.758 3.637-12.981 5.715-18.18 5.715-8.308 0-10.386-2.604-16.609-10.396l-50.898-80.079v77.476l16.1 3.646s0 9.362-12.989 9.362l-35.814 2.077c-1.043-2.086 0-7.284 3.63-8.318l9.351-2.595V109.823l-12.98-1.052c-1.044-4.68 1.55-11.439 8.826-11.965l38.426-2.585 52.958 81.113v-71.76l-13.498-1.552c-1.043-5.733 3.111-9.896 8.3-10.404l35.84-2.087Z" />
	</svg>
);

export { Notion };

const Linear = (props: SVGProps<SVGSVGElement>) => (
	<svg {...props} fill="none" viewBox="0 0 100 100">
		<title>Linear Icon</title>
		<path
			fill="#5E6AD2"
			d="M1.225 61.523c-.222-.949.908-1.546 1.597-.857l36.512 36.512c.69.69.092 1.82-.857 1.597-18.425-4.323-32.93-18.827-37.252-37.252ZM.002 46.889a.99.99 0 0 0 .29.76L52.35 99.71c.201.2.478.307.76.29 2.37-.149 4.695-.46 6.963-.927.765-.157 1.03-1.096.478-1.648L2.576 39.448c-.552-.551-1.491-.286-1.648.479a50.067 50.067 0 0 0-.926 6.962ZM4.21 29.705a.988.988 0 0 0 .208 1.1l64.776 64.776c.289.29.726.375 1.1.208a49.908 49.908 0 0 0 5.185-2.684.981.981 0 0 0 .183-1.54L8.436 24.336a.981.981 0 0 0-1.541.183 49.896 49.896 0 0 0-2.684 5.185Zm8.448-11.631a.986.986 0 0 1-.045-1.354C21.78 6.46 35.111 0 49.952 0 77.592 0 100 22.407 100 50.048c0 14.84-6.46 28.172-16.72 37.338a.986.986 0 0 1-1.354-.045L12.659 18.074Z"
		/>
	</svg>
);

export { Linear };

const Google = (props: SVGProps<SVGSVGElement>) => (
	<svg
		{...props}
		xmlSpace="preserve"
		overflow="hidden"
		viewBox="0 0 268.152 273.883"
	>
		<title>Google Icon</title>
		<defs>
			<linearGradient id="google__a">
				<stop offset="0" stop-color="#0fbc5c" />
				<stop offset="1" stop-color="#0cba65" />
			</linearGradient>
			<linearGradient id="google__g">
				<stop offset=".231" stop-color="#0fbc5f" />
				<stop offset=".312" stop-color="#0fbc5f" />
				<stop offset=".366" stop-color="#0fbc5e" />
				<stop offset=".458" stop-color="#0fbc5d" />
				<stop offset=".54" stop-color="#12bc58" />
				<stop offset=".699" stop-color="#28bf3c" />
				<stop offset=".771" stop-color="#38c02b" />
				<stop offset=".861" stop-color="#52c218" />
				<stop offset=".915" stop-color="#67c30f" />
				<stop offset="1" stop-color="#86c504" />
			</linearGradient>
			<linearGradient id="google__h">
				<stop offset=".142" stop-color="#1abd4d" />
				<stop offset=".248" stop-color="#6ec30d" />
				<stop offset=".312" stop-color="#8ac502" />
				<stop offset=".366" stop-color="#a2c600" />
				<stop offset=".446" stop-color="#c8c903" />
				<stop offset=".54" stop-color="#ebcb03" />
				<stop offset=".616" stop-color="#f7cd07" />
				<stop offset=".699" stop-color="#fdcd04" />
				<stop offset=".771" stop-color="#fdce05" />
				<stop offset=".861" stop-color="#ffce0a" />
			</linearGradient>
			<linearGradient id="google__f">
				<stop offset=".316" stop-color="#ff4c3c" />
				<stop offset=".604" stop-color="#ff692c" />
				<stop offset=".727" stop-color="#ff7825" />
				<stop offset=".885" stop-color="#ff8d1b" />
				<stop offset="1" stop-color="#ff9f13" />
			</linearGradient>
			<linearGradient id="google__b">
				<stop offset=".231" stop-color="#ff4541" />
				<stop offset=".312" stop-color="#ff4540" />
				<stop offset=".458" stop-color="#ff4640" />
				<stop offset=".54" stop-color="#ff473f" />
				<stop offset=".699" stop-color="#ff5138" />
				<stop offset=".771" stop-color="#ff5b33" />
				<stop offset=".861" stop-color="#ff6c29" />
				<stop offset="1" stop-color="#ff8c18" />
			</linearGradient>
			<linearGradient id="google__d">
				<stop offset=".408" stop-color="#fb4e5a" />
				<stop offset="1" stop-color="#ff4540" />
			</linearGradient>
			<linearGradient id="google__c">
				<stop offset=".132" stop-color="#0cba65" />
				<stop offset=".21" stop-color="#0bb86d" />
				<stop offset=".297" stop-color="#09b479" />
				<stop offset=".396" stop-color="#08ad93" />
				<stop offset=".477" stop-color="#0aa6a9" />
				<stop offset=".568" stop-color="#0d9cc6" />
				<stop offset=".667" stop-color="#1893dd" />
				<stop offset=".769" stop-color="#258bf1" />
				<stop offset=".859" stop-color="#3086ff" />
			</linearGradient>
			<linearGradient id="google__e">
				<stop offset=".366" stop-color="#ff4e3a" />
				<stop offset=".458" stop-color="#ff8a1b" />
				<stop offset=".54" stop-color="#ffa312" />
				<stop offset=".616" stop-color="#ffb60c" />
				<stop offset=".771" stop-color="#ffcd0a" />
				<stop offset=".861" stop-color="#fecf0a" />
				<stop offset=".915" stop-color="#fecf08" />
				<stop offset="1" stop-color="#fdcd01" />
			</linearGradient>
			<linearGradient
				id="google__s"
				x1="219.7"
				x2="254.467"
				y1="329.535"
				y2="329.535"
				gradientUnits="userSpaceOnUse"
			/>
			<radialGradient
				id="google__m"
				cx="109.627"
				cy="135.862"
				r="71.46"
				fx="109.627"
				fy="135.862"
				gradientTransform="matrix(-1.93688 1.043 1.45573 2.55542 290.525 -400.634)"
				gradientUnits="userSpaceOnUse"
			/>
			<radialGradient
				id="google__n"
				cx="45.259"
				cy="279.274"
				r="71.46"
				fx="45.259"
				fy="279.274"
				gradientTransform="matrix(-3.5126 -4.45809 -1.69255 1.26062 870.8 191.554)"
				gradientUnits="userSpaceOnUse"
			/>
			<radialGradient
				id="google__l"
				cx="304.017"
				cy="118.009"
				r="47.854"
				fx="304.017"
				fy="118.009"
				gradientTransform="matrix(2.06435 0 0 2.59204 -297.679 -151.747)"
				gradientUnits="userSpaceOnUse"
			/>
			<radialGradient
				id="google__o"
				cx="181.001"
				cy="177.201"
				r="71.46"
				fx="181.001"
				fy="177.201"
				gradientTransform="matrix(-.24858 2.08314 2.96249 .33417 -255.146 -331.164)"
				gradientUnits="userSpaceOnUse"
			/>
			<radialGradient
				id="google__p"
				cx="207.673"
				cy="108.097"
				r="41.102"
				fx="207.673"
				fy="108.097"
				gradientTransform="matrix(-1.2492 1.34326 -3.89684 -3.4257 880.501 194.905)"
				gradientUnits="userSpaceOnUse"
			/>
			<radialGradient
				id="google__r"
				cx="109.627"
				cy="135.862"
				r="71.46"
				fx="109.627"
				fy="135.862"
				gradientTransform="matrix(-1.93688 -1.043 1.45573 -2.55542 290.525 838.683)"
				gradientUnits="userSpaceOnUse"
			/>
			<radialGradient
				id="google__j"
				cx="154.87"
				cy="145.969"
				r="71.46"
				fx="154.87"
				fy="145.969"
				gradientTransform="matrix(-.0814 -1.93722 2.92674 -.11625 -215.135 632.86)"
				gradientUnits="userSpaceOnUse"
			/>
			<filter
				id="google__q"
				width="1.097"
				height="1.116"
				x="-.048"
				y="-.058"
				color-interpolation-filters="sRGB"
			>
				<feGaussianBlur stdDeviation="1.701" />
			</filter>
			<filter
				id="google__k"
				width="1.033"
				height="1.02"
				x="-.017"
				y="-.01"
				color-interpolation-filters="sRGB"
			>
				<feGaussianBlur stdDeviation=".242" />
			</filter>
			<clipPath id="google__i" clipPathUnits="userSpaceOnUse">
				<path d="M371.378 193.24H237.083v53.438h77.167c-1.241 7.563-4.026 15.003-8.105 21.786-4.674 7.773-10.451 13.69-16.373 18.196-17.74 13.498-38.42 16.258-52.783 16.258-36.283 0-67.283-23.286-79.285-54.928-.484-1.149-.805-2.335-1.197-3.507a81.115 81.115 0 0 1-4.101-25.448c0-9.226 1.569-18.057 4.43-26.398 11.285-32.897 42.985-57.467 80.179-57.467 7.481 0 14.685.884 21.517 2.648a77.668 77.668 0 0 1 33.425 18.25l40.834-39.712c-24.839-22.616-57.219-36.32-95.844-36.32-30.878 0-59.386 9.553-82.748 25.7-18.945 13.093-34.483 30.625-44.97 50.985-9.753 18.879-15.094 39.8-15.094 62.294 0 22.495 5.35 43.633 15.103 62.337v.126c10.302 19.857 25.368 36.954 43.678 49.988 15.997 11.386 44.68 26.551 84.031 26.551 22.63 0 42.687-4.051 60.375-11.644 12.76-5.478 24.065-12.622 34.301-21.804 13.525-12.132 24.117-27.139 31.347-44.404 7.23-17.265 11.097-36.79 11.097-57.957 0-9.858-.998-19.87-2.689-28.968Z" />
			</clipPath>
		</defs>
		<g
			clipPath="url(#google__i)"
			transform="matrix(.95792 0 0 .98525 -90.174 -78.856)"
		>
			<path
				fill="url(#google__j)"
				d="M92.076 219.958c.148 22.14 6.501 44.983 16.117 63.424v.127c6.949 13.392 16.445 23.97 27.26 34.452l65.327-23.67c-12.36-6.235-14.246-10.055-23.105-17.026-9.054-9.066-15.802-19.473-20.004-31.677h-.17l.17-.127c-2.765-8.058-3.037-16.613-3.14-25.503Z"
				filter="url(#google__k)"
			/>
			<path
				fill="url(#google__l)"
				d="M237.083 79.025c-6.456 22.526-3.988 44.421 0 57.161 7.457.006 14.64.888 21.45 2.647a77.662 77.662 0 0 1 33.424 18.25l41.88-40.726c-24.81-22.59-54.667-37.297-96.754-37.332Z"
				filter="url(#google__k)"
			/>
			<path
				fill="url(#google__m)"
				d="M236.943 78.847c-31.67 0-60.91 9.798-84.871 26.359a145.533 145.533 0 0 0-24.332 21.15c-1.904 17.744 14.257 39.551 46.262 39.37 15.528-17.936 38.495-29.542 64.056-29.542l.07.002-1.044-57.335c-.048 0-.093-.004-.14-.004Z"
				filter="url(#google__k)"
			/>
			<path
				fill="url(#google__n)"
				d="m341.475 226.379-28.268 19.285c-1.24 7.562-4.028 15.002-8.107 21.786-4.674 7.772-10.45 13.69-16.373 18.196-17.702 13.47-38.328 16.244-52.687 16.255-14.842 25.102-17.444 37.675 1.043 57.934 22.877-.016 43.157-4.117 61.046-11.796 12.931-5.551 24.388-12.792 34.761-22.097 13.706-12.295 24.442-27.503 31.769-45 7.327-17.497 11.245-37.282 11.245-58.734Z"
				filter="url(#google__k)"
			/>
			<path
				fill="#3086ff"
				d="M234.996 191.21v57.498h136.006c1.196-7.874 5.152-18.064 5.152-26.5 0-9.858-.996-21.899-2.687-30.998Z"
				filter="url(#google__k)"
			/>
			<path
				fill="url(#google__o)"
				d="M128.39 124.327c-8.394 9.119-15.564 19.326-21.249 30.364-9.753 18.879-15.094 41.83-15.094 64.324 0 .317.026.627.029.944 4.32 8.224 59.666 6.649 62.456 0-.004-.31-.039-.613-.039-.924 0-9.226 1.57-16.026 4.43-24.367 3.53-10.289 9.056-19.763 16.123-27.926 1.602-2.031 5.875-6.397 7.121-9.016.475-.997-.862-1.557-.937-1.908-.083-.393-1.876-.077-2.277-.37-1.275-.929-3.8-1.414-5.334-1.845-3.277-.921-8.708-2.953-11.725-5.06-9.536-6.658-24.417-14.612-33.505-24.216Z"
				filter="url(#google__k)"
			/>
			<path
				fill="url(#google__p)"
				d="M162.099 155.857c22.112 13.301 28.471-6.714 43.173-12.977l-25.574-52.664a144.74 144.74 0 0 0-26.543 14.504c-12.316 8.512-23.192 18.9-32.176 30.72Z"
				filter="url(#google__q)"
			/>
			<path
				fill="url(#google__r)"
				d="M171.099 290.222c-29.683 10.641-34.33 11.023-37.062 29.29a144.806 144.806 0 0 0 16.792 13.984c15.996 11.386 46.766 26.551 86.118 26.551.046 0 .09-.004.137-.004v-59.157l-.094.002c-14.736 0-26.512-3.843-38.585-10.527-2.977-1.648-8.378 2.777-11.123.799-3.786-2.729-12.9 2.35-16.183-.938Z"
				filter="url(#google__k)"
			/>
			<path
				fill="url(#google__s)"
				d="M219.7 299.023v59.996c5.506.64 11.236 1.028 17.247 1.028 6.026 0 11.855-.307 17.52-.872v-59.748a105.119 105.119 0 0 1-17.477 1.461c-5.932 0-11.7-.686-17.29-1.865Z"
				filter="url(#google__k)"
				opacity=".5"
			/>
		</g>
	</svg>
);

export { Google };

const customConfig: Record<string, ToolCategoryConfig> = {
	notion: {
		icon: Notion,
		bgColor: "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
		iconColor: "text-zinc-900 dark:text-zinc-100",
	},
	linear: {
		icon: Linear,
		bgColor: "bg-indigo-500/10",
		iconColor: "text-indigo-600 dark:text-indigo-400",
	},
	google: {
		icon: Google,
		bgColor: "bg-sky-500/10",
		iconColor: "text-blue-600 dark:text-blue-400",
	},
	slack: {
		imageUrl:
			"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
		bgColor: "bg-white dark:bg-zinc-800",
		iconColor: "text-zinc-900",
	},
};

const steps: WorkflowStep[] = [
	{
		id: "1",
		title: "Fetch Linear Issues",
		description: "Get high priority bugs",
		toolCategory: "linear",
	},
	{
		id: "2",
		title: "Summarize in Notion",
		description: "Create daily report",
		toolCategory: "notion",
	},
	{
		id: "3",
		title: "Send to Slack",
		description: "Notify engineering team",
		toolCategory: "slack",
	},
];

export default function WorkflowCardDefault() {
	return (
		<div className="w-full max-w-sm">
			<WorkflowCard
				title="Daily Engineering Report"
				description="Automated summary of high-priority Linear issues posted to Notion and Slack."
				steps={steps}
				totalExecutions={1234}
				isActivated={true}
				triggerLabel="9:00 AM Daily"
				categoryConfig={customConfig}
				onClick={() => console.log("Card clicked")}
				onAction={() => console.log("Run workflow")}
			/>
		</div>
	);
}
