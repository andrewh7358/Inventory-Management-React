import { Table } from 'antd'
import React, { useState } from 'react'
import { Chart } from './Chart'
import { ActionsColumn, ColumnDef, columnDef } from './columnDef'
import { useGlobalContext } from './GlobalContext'
import { initialData } from './initailData'
import { RecordDef } from './recordDef'
import { Mode, RecordModal } from './RecordModal'
import { generateId } from './util'
import { handleWorkflows } from './workflows'

export const App = () => {
  const [dataStore, setDataStore] = useState(initialData)
  const [mode, setMode] = useState<Mode>('Create')
  const [showModal, setShowModal] = useState(false)
  const [initData, setInitData] = useState({} as RecordDef)
  const [editId, setEditId] = useState('')
  const { openNotification } = useGlobalContext()

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const onCreate = () => {
    setMode('Create')
    setInitData({} as RecordDef)
    openModal()
  }

  const onEdit = (id: string) => {
    const index = dataStore.findIndex((item) => item.id === id)
    setMode('Edit')
    setInitData(dataStore[index])
    setEditId(id)
    openModal()
  }

  const submitCreate = (record: Omit<RecordDef, 'id'>) => {
    const id = generateId()
    const newRecord = { ...record, id }
    openNotification('success', `${newRecord.name} created`)
    handleWorkflows(newRecord, openNotification)
    setDataStore((prev) => prev.concat(newRecord))
    closeModal()
  }

  const submitEdit = (editRecord: Omit<RecordDef, 'id'>) => {
    const index = dataStore.findIndex((item) => item.id === editId)
    const newRecord = {
      ...dataStore[index],
      ...editRecord
    }
    openNotification('success', `${editRecord.name} edited`)
    handleWorkflows(newRecord, openNotification)
    setDataStore((prev) => {
      prev[index] = {
        ...prev[index],
        ...newRecord
      }
      return prev
    })
    setInitData({} as RecordDef)
    setEditId('')
    closeModal()
  }

  const onSubmit = (record: Omit<RecordDef, 'id'>) => {
    if (mode === 'Create') {
      submitCreate(record)
    } else {
      submitEdit(record)
    }
  }

  const onDelete = (id: string) => {
    const index = dataStore.findIndex((item) => item.id === id)
    const { name } = dataStore[index]
    openNotification('success', `${name} deleted`)
    setDataStore((prev) => prev.slice(0, index).concat(prev.slice(index + 1)))
  }

  const actions =  {
    render: (_: any, { id }: RecordDef) => (
      <>
        <button className='editButton' type='button' onClick={() => onEdit(id)}>Edit</button>
        <button type='button' onClick={() => onDelete(id)}>Delete</button>
      </>
    )
  }
  const columns = (columnDef as (ColumnDef | ActionsColumn)[]).concat(actions)

  return (
    <>
      <div className='header'>
        <div className='title'>Inventory</div>
        <button type='button' onClick={onCreate}>Create</button>
      </div>
      <Table className='table' rowClassName='tableRow' dataSource={dataStore} columns={columns} />
      <Chart dataStore={dataStore} />
      <RecordModal mode={mode} showModal={showModal} initData={initData} onSubmit={onSubmit} onCancel={closeModal} />
    </>
  )
}
