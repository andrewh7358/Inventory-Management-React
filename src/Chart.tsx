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

export const Chart = ({ dataStore }: ChartProps) => {
  const labels = ['Expected Count', 'Within Delta', 'Exceeds Delta', 'Missing Data']
  const counts = [0, 0, 0, 0]

  dataStore.forEach((record) => {
    if (record.countDelta === undefined) {
      counts[3] += 1
    } else {
      const delta = Math.abs(record.countDelta)

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
        backgroundColor: ['green', 'yellow', 'red', 'gray']
      }
    ]
  }

  return <Pie width={400} height={400} options={options} data={data}></Pie>
}
