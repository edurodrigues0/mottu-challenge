import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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
  revenue: {
    state: string;
    total: number;
  }[]
}

export function BarChart(props: Props) {
  const labels = props.revenue.map(item => {
    return {
      state: item.state,
      total: item.total * 100,
    }
  })

  const data = {
    labels: labels.map(item => item.state),
    datasets: [{
      label: 'Lucro em vendas e alugueis',
      data: labels.map(item => Number(item.total / 100)),
      backgroundColor: "#0fd01c"
    }],
  }

  return (
    <Bar
      width="100%"
      height="100%"
      options={options}
      data={data}
    />
  )
}