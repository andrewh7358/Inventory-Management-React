import { Modal } from 'antd'
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { formDef } from './columnDef'
import { useGlobalContext } from './GlobalContext'
import { RecordDef } from './recordDef'
import { validateForm } from './util'

interface RecordModalProps {
  mode: Mode
  showModal: boolean
  initData: RecordDef
  onSubmit: (record: Omit<RecordDef, 'id'>) => void
  onCancel: () => void
}

export type Mode = 'Create' | 'Edit'

export const RecordModal = ({ mode, showModal, initData, onSubmit, onCancel }: RecordModalProps) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({})
  const { openNotification } = useGlobalContext()

  useEffect(() => {
    if (showModal) {
      setFormData(initData as unknown as { [key: string]: string })
    }
  }, [showModal])

  const _onSubmit = () => {
    try { 
      const record = validateForm(formData, mode)
      onSubmit(record)
    } catch (err) {
      openNotification('error', (err as Error).message)
    }
  }

  const _onCancel = () => {
    onCancel()
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onEnterDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event
    if (key === 'Enter') {
      _onSubmit()
    }
  }

  const fields = formDef.map((column) => {
    const { title, dataIndex } = column

    return (
      <div className='formRow' key={dataIndex}>
        <label className='formLabel' htmlFor={dataIndex}>{`${title}:`}</label>
        <input className='formInput' id={dataIndex} name={dataIndex} value={formData[dataIndex] || ''} onChange={onChange} onKeyDown={onEnterDown} />
      </div>
    )
  })

  return (
    <Modal title={`${mode} Record`} open={showModal} onOk={_onSubmit} onCancel={_onCancel}>
      {fields}
    </Modal>
  )
}
