import { Modal } from 'antd'
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { formDef } from './columnDef'
import { useGlobalContext } from './GlobalContext'
import { RecordDef } from './recordDef'
import { validateForm } from './util'

interface RecordModalProps {
  mode: Mode
  open: boolean
  initData: RecordDef
  onSubmit: (record: Omit<RecordDef, 'id'>) => void
  onCancel: () => void
}

export type Mode = 'Create' | 'Edit'

export const RecordModal = ({ mode, open, initData, onSubmit, onCancel }: RecordModalProps) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({})
  const { openNotification } = useGlobalContext()

  useEffect(() => {
    if (open) {
      if (mode === 'Create') {
        setFormData({})
      } else { // 'Edit'
        setFormData(initData as unknown as { [key: string]: string })
      }
    }
  }, [open])

  const handleSubmit = () => {
    try { 
      const record = validateForm(formData, mode)
      onSubmit(record)
    } catch (err) {
      openNotification('error', (err as Error).message)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    console.log(name, value)
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { key } = event
    if (key === 'Enter') {
      handleSubmit()
    }
  }

  const fields = formDef.map((column) => {
    const { title, dataIndex, dataType } = column

    let field
    if (dataType === 'options') {
      const blank = [<option key={'undefined'} value={''} />]
      const options = column.options!.map((option) => <option key={option} value={option}>{option}</option>)
      field = (
        <select className='formInput' id={dataIndex} name={dataIndex} value={formData[dataIndex] || ''} onChange={handleChange} onKeyDown={handleKeyDown}>
          {blank.concat(options)}
        </select>
      )
    } else {
      field = <input className='formInput' id={dataIndex} name={dataIndex} value={formData[dataIndex] || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
    }

    return (
      <div className='formRow' key={dataIndex}>
        <label className='formLabel' htmlFor={dataIndex}>{`${title}:`}</label>
        {field}
      </div>
    )
  })

  return (
    <Modal title={`${mode} Record`} open={open} okText={mode} onOk={handleSubmit} onCancel={onCancel}>
      {fields}
    </Modal>
  )
}
