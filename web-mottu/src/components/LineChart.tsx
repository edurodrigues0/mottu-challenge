import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  maintainAspectRatio: false,
}

interface Props {
  performance: {
    state: string;
    total: number;
    sales: number;
    rent: number;
  }[]
}

export function LineCharts(props: Props) {
  const labels = props.performance
    .map((item) => {
      return {
        state: item.state,
        total: item.total,
        sales: item.sales,
        rent: item.rent,
      }
    })

  const data = {
    labels: labels.map((item) => item.state),
    datasets: [
      {
        label: 'Vendas',
        data: labels.map((item) => item.sales),
        borderColor: "#3ce85b",
        backgroundColor: "#40bd57",
      },
      {
        label: 'Alugueis',
        data: labels.map((item) => item.rent),
        borderColor: "#fff202",
        backgroundColor: "#ded715",
      },
      {
        label: "Total",
        data: labels.map((item) => item.total),
        borderColor: "#1500ff",
        backgroundColor: "#132bc2"
      }
    ],
  }

  return <Line width="100%" height="100%" options={options} data={data} />
}