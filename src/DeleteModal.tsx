import { Modal } from 'antd'
import React from 'react'

interface DeleteModalProps {
  open: boolean
  onSubmit: () => void
  onCancel: () => void
}

export const DeleteModal = ({ open, onSubmit, onCancel }: DeleteModalProps) => {
  return <Modal title='Confrm Delete' open={open} okText='Delete' onOk={onSubmit} onCancel={onCancel}>Are you sure?</Modal>
}
