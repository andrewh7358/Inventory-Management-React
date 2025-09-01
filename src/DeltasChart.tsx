import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import React from 'react'
import { Pie } from 'react-chartjs-2'
import { RecordDef } from './recordDef'
import { DELTA_MAX } from './workflows'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

interface ChartProps {
  dataStore: RecordDef[]
}

export const DeltasChart = ({ dataStore }: ChartProps) => {
  const labels = ['Expected Count', 'Within Delta', 'Exceeds Delta', 'Missing Data']
  const counts = [0, 0, 0, 0]

  dataStore.forEach((record) => {
    if (record.delta === undefined) {
      counts[3] += 1
    } else {
      const delta = Math.abs(record.delta)

      if (delta === 0) {
        counts[0] += 1
      } else if (delta <= DELTA_MAX) {
        counts[1] += 1
      } else {
        counts[2] += 1
      }
    }
  })

  const options = {
    responsive: false,
    plugins: {
      title: {
        display: true,
        text: 'Item Counts',
        font: {
          size: 18,
          weight: 'bold' as 'bold',
        }
      }
    }
  }
  const data = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: ['#28a745', '#fd7e14', '#dc3545', '#6c757d']
      }
    ]
  }

  return <Pie width={400} height={400} options={options} data={data}></Pie>
}
