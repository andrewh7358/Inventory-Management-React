import React from 'react'
import { RecordDef } from './recordDef'

export interface ColumnDef {
  title: string
  dataIndex: string
  dataType: 'text' | 'number'
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
    title: 'Count Delta',
    dataIndex: 'countDelta',
    dataType: 'number',
    formField: false
  }
]

export const formDef = columnDef.filter((column) => column.formField !== false)
