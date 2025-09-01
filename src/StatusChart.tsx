import {
  Chart as ChartJS,
  Title,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { RecordDef } from './recordDef'

ChartJS.register(Title, Tooltip, CategoryScale, LinearScale, BarElement)

interface ChartProps {
  dataStore: RecordDef[]
}

export const StatusChart = ({ dataStore }: ChartProps) => {
  const labels = ['Open', 'Closed']
  const counts = [0, 0]

  dataStore.forEach((record) => {
    if (record.status === 'Open') {
      counts[0] += 1
    } else if (record.status === 'Closed') {
      counts[1] += 1
    }
  })

  const options = {
    responsive: false,
    plugins: {
      title: {
        display: true,
        text: 'Status',
        font: {
          size: 18,
          weight: 'bold' as 'bold',
        }
      },
      legend: {
        display: false
      }
    }
  }
  const data = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: ['#007bff', '#6c757d']
      }
    ]
  }

  return <Bar width={400} height={400} options={options} data={data}></Bar>
}
