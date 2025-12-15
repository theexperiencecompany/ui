"use client";

import React, { useMemo, useState } from "react";
import {
	Location01Icon,
	SunriseIcon,
	SunsetIcon,
	ThermometerIcon,
	HugeiconsIcon,
} from "@/components/icons";

import {
	CloudAngledZapIcon,
	CloudAngledRainIcon,
	CloudLittleRainIcon,
	CloudSnowIcon,
	CloudFogIcon,
	CloudIcon,
	DropletIcon,
	FastWindIcon,
	Moon02Icon,
	Sun03Icon,
	Tornado02Icon,
	VisionIcon,
} from "@/registry/new-york/ui/weather-icons";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { WeatherDetailItem } from "@/registry/new-york/ui/weather-detail-item";
import { cn } from "@/lib/utils";

export interface WeatherLocation {
	city: string;
	country: string | null;
	region: string | null;
}

export interface WeatherMain {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
}

export interface WeatherWind {
	speed: number;
	deg: number;
}

export interface WeatherCondition {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface WeatherSys {
	country: string;
	sunrise: number;
	sunset: number;
}

export interface ForecastDay {
	date: string;
	timestamp: number;
	temp_min: number;
	temp_max: number;
	humidity: number;
	weather: {
		main: string;
		description: string;
		icon: string;
	};
}

export interface WeatherData {
	coord?: {
		lon: number;
		lat: number;
	};
	weather: WeatherCondition[];
	main: WeatherMain;
	visibility?: number;
	wind: WeatherWind;
	dt: number;
	sys: WeatherSys;
	timezone: number;
	name: string;
	location: WeatherLocation;
	forecast?: ForecastDay[];
}

export interface WeatherCardProps {
	weatherData: WeatherData;
	className?: string;
	showForecast?: boolean;
	showDetails?: boolean;
	defaultUnit?: "celsius" | "fahrenheit";
}

// Helper function to convert timestamp to readable time
const formatTime = (timestamp: number, timezone: number): string => {
	const date = new Date((timestamp + timezone) * 1000);
	return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Helper function to convert celsius to fahrenheit
const celsiusToFahrenheit = (celsius: number): number => {
	return (celsius * 9) / 5 + 32;
};

// Helper function to get day of week from date string
const getDayOfWeek = (dateStr: string): string => {
	const date = new Date(dateStr);
	return date.toLocaleDateString("en-US", { weekday: "long" });
};

// Helper function to get weather icon component
const getWeatherIcon = (main: string, className: string = "", fill = "") => {
	switch (main.toLowerCase()) {
		case "thunderstorm":
			return <CloudAngledZapIcon className={className} color={fill} />;
		case "drizzle":
			return <CloudLittleRainIcon className={className} color={fill} />;
		case "rain":
			return <CloudAngledRainIcon className={className} color={fill} />;
		case "snow":
			return <CloudSnowIcon className={className} color={fill} />;
		case "haze":
			return <Sun03Icon className={className} color={fill} />;
		case "mist":
		case "smoke":
		case "dust":
		case "sand":
		case "ash":
		case "squall":
			return <CloudFogIcon className={className} color={fill} />;
		case "fog":
			return <CloudFogIcon className={className} color={fill} />;
		case "tornado":
			return <Tornado02Icon className={className} color={fill} />;
		case "clear":
			return <Sun03Icon className={className} fill={fill} color={fill} />;
		case "clouds":
			return <CloudIcon className={className} color={"#E5E7EB"} />;
		default:
			return <CloudIcon className={className} color={"#E5E7EB"} />;
	}
};

export const WeatherCard: React.FC<WeatherCardProps> = ({
	weatherData,
	className,
	showForecast = true,
	showDetails = true,
	defaultUnit = "celsius",
}) => {
	const [useFahrenheit, setUseFahrenheit] = useState(
		defaultUnit === "fahrenheit",
	);
	const [forecastExpanded, setForecastExpanded] = useState(true);
	const [detailsExpanded, setDetailsExpanded] = useState(false);

	const temp = weatherData.main.temp;
	const feelsLike = weatherData.main.feels_like;
	const weatherId = weatherData.weather[0].id;
	const sunriseTime = formatTime(weatherData.sys.sunrise, weatherData.timezone);
	const sunsetTime = formatTime(weatherData.sys.sunset, weatherData.timezone);

	// Convert temperature based on selected unit
	const displayTemp = useFahrenheit
		? Math.round(celsiusToFahrenheit(temp))
		: Math.round(temp);

	const displayFeelsLike = useFahrenheit
		? Math.round(celsiusToFahrenheit(feelsLike))
		: Math.round(feelsLike);

	// Determine the weather theme based on weather conditions
	const weatherTheme = useMemo(() => {
		// weather condition codes: https://openweathermap.org/weather-conditions
		if (weatherId >= 200 && weatherId < 300) {
			return {
				name: "Thunderstorm",
				icon: <CloudAngledZapIcon className="h-16 w-16" color="#FCD34D" />,
				gradient: "bg-gradient-to-br from-slate-800/80 to-purple-900/80",
				colorCode: "#FCD34D",
			};
		} else if (weatherId >= 300 && weatherId < 400) {
			return {
				name: "Drizzle",
				icon: <CloudLittleRainIcon className="h-16 w-16" color="#93C5FD" />,
				gradient: "bg-gradient-to-br from-slate-700/80 to-blue-800/80",
				colorCode: "#93C5FD",
			};
		} else if (weatherId >= 500 && weatherId < 600) {
			return {
				name: "Rain",
				icon: <CloudAngledRainIcon className="h-16 w-16" color="#60A5FA" />,
				gradient: "bg-gradient-to-br from-slate-800/80 to-blue-900/80",
				colorCode: "#60A5FA",
			};
		} else if (weatherId >= 600 && weatherId < 700) {
			return {
				name: "Snow",
				icon: <CloudSnowIcon className="h-16 w-16" color="#E0F2FE" />,
				gradient: "bg-gradient-to-br from-blue-100/80 to-indigo-300/80",
				colorCode: "#E0F2FE",
			};
		} else if (weatherId >= 700 && weatherId < 800) {
			// Atmospheric conditions
			if (weatherId === 701) {
				return {
					name: "Mist",
					icon: <CloudFogIcon className="h-16 w-16" color="#D1D5DB" />,
					gradient: "bg-gradient-to-br from-slate-400/80 to-slate-500/80",
					colorCode: "#D1D5DB",
				};
			} else if (weatherId === 711) {
				return {
					name: "Smoke",
					icon: <CloudFogIcon className="h-16 w-16" color="#9CA3AF" />,
					gradient: "bg-gradient-to-br from-gray-500/80 to-gray-700/80",
					colorCode: "#9CA3AF",
				};
			} else if (weatherId === 721) {
				return {
					name: "Haze",
					icon: <Sun03Icon className="h-16 w-16" color="#FDE68A" />,
					gradient: "bg-gradient-to-br from-amber-300/80 to-amber-500/80",
					colorCode: "#FDE68A",
				};
			} else if (weatherId === 731 || weatherId === 761) {
				return {
					name: "Dust",
					icon: <CloudFogIcon className="h-16 w-16" color="#FEF08A" />,
					gradient: "bg-gradient-to-br from-yellow-400/80 to-yellow-600/80",
					colorCode: "#FEF08A",
				};
			} else if (weatherId === 741) {
				return {
					name: "Fog",
					icon: <CloudFogIcon className="h-16 w-16" color="#D1D5DB" />,
					gradient: "bg-gradient-to-br from-gray-400/80 to-gray-600/80",
					colorCode: "#D1D5DB",
				};
			} else if (weatherId === 751) {
				return {
					name: "Sand",
					icon: <CloudFogIcon className="h-16 w-16" color="#FDBA74" />,
					gradient: "bg-gradient-to-br from-orange-300/80 to-orange-500/80",
					colorCode: "#FDBA74",
				};
			} else if (weatherId === 762) {
				return {
					name: "Volcanic Ash",
					icon: <CloudFogIcon className="h-16 w-16" color="#D4D4D8" />,
					gradient: "bg-gradient-to-br from-zinc-600/80 to-zinc-800/80",
					colorCode: "#D4D4D8",
				};
			} else if (weatherId === 771) {
				return {
					name: "Squall",
					icon: <FastWindIcon className="h-16 w-16" color="#93C5FD" />,
					gradient: "bg-gradient-to-br from-blue-500/80 to-blue-700/80",
					colorCode: "#93C5FD",
				};
			} else if (weatherId === 781) {
				return {
					name: "Tornado",
					icon: <Tornado02Icon className="h-16 w-16" color="#CBD5E1" />,
					gradient: "bg-gradient-to-br from-slate-600/80 to-slate-900/80",
					colorCode: "#CBD5E1",
				};
			} else {
				return {
					name: "Atmosphere",
					icon: <CloudFogIcon className="h-16 w-16" color="#D1D5DB" />,
					gradient: "bg-gradient-to-br from-slate-400/80 to-slate-600/80",
					colorCode: "#D1D5DB",
				};
			}
		} else if (weatherId === 800) {
			return {
				name: "Clear",
				icon: <Sun03Icon className="h-16 w-16" color="#FBBF24" />,
				gradient: "bg-gradient-to-br from-yellow-500/80 to-orange-500/80",
				colorCode: "#FBBF24",
			};
		} else if (weatherId >= 801 && weatherId <= 802) {
			return {
				name: "Partly Cloudy",
				icon: <CloudIcon className="h-16 w-16" color="#E5E7EB" />,
				gradient: "bg-gradient-to-br from-blue-400/80 to-blue-600/80",
				colorCode: "#E5E7EB",
			};
		} else if (weatherId >= 803 && weatherId <= 804) {
			return {
				name: "Cloudy",
				icon: <CloudIcon className="h-16 w-16" color="#E5E7EB" />,
				gradient: "bg-gradient-to-br from-slate-500/80 to-slate-700/80",
				colorCode: "#E5E7EB",
			};
		} else {
			return {
				name: "Unknown",
				icon: <CloudIcon className="h-16 w-16" color="#E5E7EB" />,
				gradient: "bg-gradient-to-br from-slate-500/80 to-slate-700/80",
				colorCode: "#E5E7EB",
			};
		}
	}, [weatherId]);

	return (
		<div
			className={cn(
				"relative w-full overflow-hidden rounded-3xl p-6 shadow-lg backdrop-blur-sm sm:max-w-md",
				weatherTheme.gradient,
				className,
			)}
		>
			{/* Location Info */}
			<div className="mb-3 flex items-start justify-between gap-10">
				<div className="flex items-start">
					<HugeiconsIcon
						icon={Location01Icon}
						size={20}
						className="relative top-1 mr-2 text-white"
					/>
					<div>
						<h2 className="flex items-center text-xl font-bold text-white">
							{weatherData.location.city}
							{weatherData.location.region
								? `, ${weatherData.location.region}`
								: ""}
						</h2>
						<p className="text-xs" style={{ color: weatherTheme.colorCode }}>
							{weatherData.location.country}
						</p>
					</div>
				</div>

				<div className="flex items-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white"
								aria-label="Temperature settings"
							>
								<HugeiconsIcon icon={ThermometerIcon} size={20} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="w-40 border-zinc-700 bg-zinc-800 text-white"
						>
							<DropdownMenuLabel>Temperature Unit</DropdownMenuLabel>
							<DropdownMenuSeparator className="bg-zinc-700" />
							<div className="px-2 py-2">
								<div className="flex items-center justify-between gap-2">
									<Button
										variant={useFahrenheit ? "secondary" : "ghost"}
										size="sm"
										className="flex-1"
										onClick={() => setUseFahrenheit(true)}
									>
										°F
									</Button>
									<Button
										variant={!useFahrenheit ? "secondary" : "ghost"}
										size="sm"
										className="flex-1"
										onClick={() => setUseFahrenheit(false)}
									>
										°C
									</Button>
								</div>
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{/* Main Weather Display */}
			<div className="mb-2 flex items-center justify-between gap-5">
				<div className="flex items-center justify-center">
					{weatherTheme.icon}
				</div>

				<div>
					<div className="flex items-baseline">
						<span className="text-4xl font-bold text-white">
							{displayTemp}°
						</span>
						<span className="ml-1 text-sm font-medium text-white/80">
							{useFahrenheit ? "F" : "C"}
						</span>
					</div>
					<p
						className="text-xs"
						style={{
							color: weatherTheme.colorCode,
							filter: "brightness(1.3)",
						}}
					>
						Feels like: {displayFeelsLike}°
					</p>
				</div>

				<p className="capitalize font-medium text-white">
					{weatherData.weather[0].description}
				</p>
			</div>

			{/* Weather Forecast */}
			{showForecast &&
				weatherData.forecast &&
				weatherData.forecast.length > 0 && (
					<div className="mt-4">
						<button
							onClick={() => setForecastExpanded(!forecastExpanded)}
							className="mb-2 flex w-full items-center justify-between text-sm font-normal text-white"
						>
							<span>Weekly Forecast</span>
							<svg
								className={cn(
									"h-4 w-4 transition-transform",
									forecastExpanded && "rotate-180",
								)}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>
						{forecastExpanded && (
							<div className="space-y-2 pb-2">
								{weatherData.forecast.map((day, idx) => {
									const dayTemp = useFahrenheit
										? Math.round(celsiusToFahrenheit(day.temp_max))
										: Math.round(day.temp_max);
									const nightTemp = useFahrenheit
										? Math.round(celsiusToFahrenheit(day.temp_min))
										: Math.round(day.temp_min);

									return (
										<div
											key={idx}
											className="flex items-center justify-start rounded-2xl bg-black/10 px-2 py-1 text-white"
										>
											<div className="flex w-full flex-1 items-center justify-start gap-2">
												<div className="flex items-center justify-center">
													{getWeatherIcon(
														day.weather.main,
														"h-7 w-7",
														weatherTheme.colorCode,
													)}
												</div>
												<div className="w-24">
													<span className="font-semibold text-white">
														{getDayOfWeek(day.date)}
													</span>
												</div>
											</div>

											<div className="flex w-24 justify-end">
												<div className="flex flex-row items-end gap-2">
													<div className="flex items-center">
														<Sun03Icon
															className="mr-1.5 h-7 w-7"
															color="#FCD34D"
															fill="#FCD34D"
														/>
														<span className="w-8 font-medium text-white">
															{dayTemp}°
														</span>
													</div>
													<div className="mt-1 flex items-center">
														<Moon02Icon
															className="mr-1.5 h-7 w-7"
															color="#93C5FD"
															fill="#93C5FD"
														/>
														<span className="w-8 text-white/80">
															{nightTemp}°
														</span>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
				)}

			{/* Weather Details */}
			{showDetails && (
				<div className="mt-4">
					<button
						onClick={() => setDetailsExpanded(!detailsExpanded)}
						className="mb-2 flex w-full items-center justify-between text-sm font-normal text-white"
					>
						<span>Additional Information</span>
						<svg
							className={cn(
								"h-4 w-4 transition-transform",
								detailsExpanded && "rotate-180",
							)}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>
					{detailsExpanded && (
						<div className="mt-2 grid grid-cols-3 gap-2">
							{[
								{
									icon: (
										<FastWindIcon
											className="h-6 w-6"
											color={weatherTheme.colorCode}
										/>
									),
									label: "Wind",
									value: `${weatherData.wind.speed} m/s`,
									tooltipText: "Wind speed in meters per second",
								},
								{
									icon: (
										<DropletIcon
											className="h-6 w-6"
											color={weatherTheme.colorCode}
										/>
									),
									label: "Humidity",
									value: `${weatherData.main.humidity}%`,
									tooltipText: "Amount of water vapor in the air",
								},
								...(weatherData.visibility
									? [
											{
												icon: (
													<VisionIcon
														className="h-6 w-6"
														color={weatherTheme.colorCode}
													/>
												),
												label: "Visibility",
												value: `${(weatherData.visibility / 1000).toFixed(
													1,
												)} km`,
												tooltipText: "Maximum visibility distance",
											},
										]
									: []),
								{
									icon: (
										<CloudIcon
											className="h-6 w-6"
											color={weatherTheme.colorCode}
										/>
									),
									label: "Pressure",
									value: `${weatherData.main.pressure} hPa`,
									tooltipText: "Atmospheric pressure in hectopascals",
								},
								{
									icon: (
										<HugeiconsIcon
											icon={SunriseIcon}
											size={24}
											color={weatherTheme.colorCode}
										/>
									),
									label: "Sunrise",
									value: sunriseTime,
									tooltipText: "Time when the sun rises above the horizon",
								},
								{
									icon: (
										<HugeiconsIcon
											icon={SunsetIcon}
											size={24}
											color={weatherTheme.colorCode}
										/>
									),
									label: "Sunset",
									value: sunsetTime,
									tooltipText: "Time when the sun disappears below the horizon",
								},
							].map((detail, index) => (
								<WeatherDetailItem
									key={index}
									icon={detail.icon}
									label={detail.label}
									value={detail.value}
									tooltipText={detail.tooltipText}
									highlight={weatherTheme.colorCode}
								/>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};
