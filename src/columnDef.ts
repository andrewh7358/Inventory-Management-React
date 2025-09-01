import React from 'react'
import { RecordDef } from './recordDef'

export interface ColumnDef {
  title: string
  dataIndex: string
  dataType: 'text' | 'number' | 'options'
  options?: string[]
  required?: boolean
  formField?: boolean
}

export interface ActionsColumn {
  render: (_: any, { id }: RecordDef) => React.ReactNode
}

export const columnDef: ColumnDef[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    dataType: 'text',
    required: true
  },
  {
    title: 'Count',
    dataIndex: 'count',
    dataType: 'number'
  },
  {
    title: 'Expected Count',
    dataIndex: 'expectedCount',
    dataType: 'number'
  },
  {
    title: 'Delta',
    dataIndex: 'delta',
    dataType: 'number',
    formField: false
  },
  {
    title: 'Status',
    dataIndex: 'status',
    dataType: 'options',
    options: ['Open', 'Closed']
  }
]

export const formDef = columnDef.filter((column) => column.formField !== false)
