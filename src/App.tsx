import { Table } from 'antd'
import React, { useState } from 'react'
import { Chart } from './Chart'
import { ActionsColumn, ColumnDef, columnDef } from './columnDef'
import { DeleteModal } from './DeleteModal'
import { useGlobalContext } from './GlobalContext'
import { initialData } from './initailData'
import { RecordDef } from './recordDef'
import { Mode, RecordModal } from './RecordModal'
import { generateId } from './util'
import { handleWorkflows } from './workflows'

export const App = () => {
  const [dataStore, setDataStore] = useState(initialData)
  const [mode, setMode] = useState<Mode>('Create')
  const [showRecordModal, setShowRecrodModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [initData, setInitData] = useState({} as RecordDef)
  const [editId, setEditId] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const { openNotification } = useGlobalContext()

  const handleCreate = () => {
    setMode('Create')
    setShowRecrodModal(true)
  }

  const handleEdit = (id: string) => {
    const index = dataStore.findIndex((item) => item.id === id)
    setMode('Edit')
    setInitData(dataStore[index])
    setEditId(id)
    setShowRecrodModal(true)
  }

  const submitCreate = (record: Omit<RecordDef, 'id'>) => {
    const id = generateId()
    const newRecord = { ...record, id }
    openNotification('success', `Record ${newRecord.name} created`)
    handleWorkflows(newRecord, openNotification)
    setDataStore((prev) => prev.concat(newRecord))
    setShowRecrodModal(false)
  }

  const submitEdit = (editRecord: Omit<RecordDef, 'id'>) => {
    const index = dataStore.findIndex((item) => item.id === editId)
    const newRecord = {
      ...dataStore[index],
      ...editRecord
    }
    openNotification('success', `Record ${editRecord.name} edited`)
    handleWorkflows(newRecord, openNotification)
    setDataStore((prev) => {
      prev[index] = {
        ...prev[index],
        ...newRecord
      }
      return prev
    })
    setShowRecrodModal(false)
  }

  const submitRecord = (record: Omit<RecordDef, 'id'>) => {
    if (mode === 'Create') {
      submitCreate(record)
    } else {
      submitEdit(record)
    }
  }

  const handleDelete = (id: string) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const submitDelete = () => {
    const index = dataStore.findIndex((item) => item.id === deleteId)
    const { name } = dataStore[index]
    openNotification('success', `Record ${name} deleted`)
    setDataStore((prev) => prev.slice(0, index).concat(prev.slice(index + 1)))
    setShowDeleteModal(false)
  }

  const actions =  {
    render: (_: any, { id }: RecordDef) => (
      <>
        <button className='actionButton' type='button' onClick={() => handleEdit(id)}>Edit</button>
        <button type='button' onClick={() => handleDelete(id)}>Delete</button>
      </>
    )
  }
  const columns = (columnDef as (ColumnDef | ActionsColumn)[]).concat(actions)

  return (
    <>
      <div className='header'>
        <div className='title'>Inventory</div>
        <button type='button' onClick={handleCreate}>Create</button>
      </div>
      <Table className='table' rowClassName='tableRow' rowKey={(record) => record.id} dataSource={dataStore} columns={columns} />
      <Chart dataStore={dataStore} />
      <RecordModal mode={mode} open={showRecordModal} initData={initData} onSubmit={submitRecord} onCancel={() => setShowRecrodModal(false)} />
      <DeleteModal open={showDeleteModal} onSubmit={submitDelete} onCancel={() => setShowDeleteModal(false)} />
    </>
  )
}
