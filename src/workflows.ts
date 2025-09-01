import { notificationType } from './GlobalContext'
import { RecordDef } from './recordDef'

export const DELTA_MAX = 5

const calculateDelta = (record: Partial<RecordDef>) => {
  if (record.count && !record.expectedCount) {
    record['delta'] = undefined
    return 'Count was provided but Expected Count is missing'
  }

  if (!record.count && record.expectedCount) {
    record['delta'] = undefined
    return 'Expected Count was provided but Count is missing'
  }

  if (record.count && record.expectedCount) {
    const count = Number(record.count)
    const expectedCount = Number(record.expectedCount)
    const delta = count - expectedCount
    record['delta'] = delta

    if (Math.abs(delta) > DELTA_MAX) {
      return 'Count exceeds the acceptable delta'
    }
  } else {
    record['delta'] = undefined
  }
}

const workflows = [calculateDelta]

export const handleWorkflows = (record: Partial<RecordDef>, openNotification: (type: notificationType, description: string) => void) => {
  for (const workflow of workflows) {
    const description = workflow(record)

    if (description) {
      openNotification('warning', description)
    }
  }
}
