"use client"

import React from "react"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

interface LineChartProps {
	labels: string[]
	dataValues: number[]
	title: string
	label?: string
}

const LineChart: React.FC<LineChartProps> = ({
	labels,
	dataValues,
	label = "",
	title = "",
}) => {
	const data = {
		labels,
		datasets: [
			{
				label: label,
				data: dataValues,
				borderColor: "rgba(75, 192, 192, 1)",
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				borderWidth: 2,
				pointBackgroundColor: "rgba(75, 192, 192, 1)",
				pointBorderColor: "#fff",
				pointRadius: 5,
			},
		],
	}

	const options: any = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: title,
			},
		},
		animations: {
			tension: {
				duration: 1000,
				easing: "easeOutQuad",
				from: 1,
				to: 0,
			},
		},
	}

	return <Line data={data} options={options} />
}

export default LineChart
