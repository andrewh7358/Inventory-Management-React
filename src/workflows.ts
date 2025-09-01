import { notificationType } from './GlobalContext'
import { RecordDef } from './recordDef'

export const DELTA_MAX = 5

const calculateCountDelta = (record: Partial<RecordDef>) => {
  if (record.count && !record.expectedCount) {
    record['countDelta'] = undefined
    return 'Count was provided but Expected Count is missing'
  }

  if (!record.count && record.expectedCount) {
    record['countDelta'] = undefined
    return 'Expected Count was provided but Count is missing'
  }

  if (record.count && record.expectedCount) {
    const count = Number(record.count)
    const expectedCount = Number(record.expectedCount)
    const delta = count - expectedCount
    record['countDelta'] = delta

    if (Math.abs(delta) > DELTA_MAX) {
      return 'Count exceeds the acceptable delta'
    }
  } else {
    record['countDelta'] = undefined
  }
}

const workflows = [calculateCountDelta]

export const handleWorkflows = (record: Partial<RecordDef>, openNotification: (type: notificationType, description: string) => void) => {
  for (const workflow of workflows) {
    const description = workflow(record)

    if (description) {
      openNotification('warning', description)
    }
  }
}
