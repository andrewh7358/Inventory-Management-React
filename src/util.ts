import { formDef } from './columnDef'
import { RecordDef } from './recordDef'
import { Mode } from './RecordModal'

export const generateId = (length?: number) => {
  const str = Math.random().toString(36)
  if (length) {
    return str.substring(2, length + 2)
  }
  return str.substring(2)
}

export const validateForm = (formData: { [key: string]: any }, mode: Mode) => {
  let data = {} as Omit<RecordDef, 'id'>

  for (const column of formDef) {
    const field = formData[column.dataIndex]

    if (!field) {
      if (column.required) {
        throw new Error(`Missing required field ${column.title}`)
      }

      if (mode === 'Edit') {
        data = {
          ...data,
          [column.dataIndex]: undefined
        }
      }
    } else {
      switch (column.dataType) {
        case ('text'):
          if (typeof field !== 'string') {
            throw new Error(`Field ${column.title} should be a string`)
          }
          break
        case ('number'):
          if (isNaN(Number(field))) {
            throw new Error(`Field ${column.title} should be a number`)
          }
          break
        }

      data = {
        ...data,
        [column.dataIndex]: field
      }
    }
  }

  return data
}
