import { RecordDef } from './recordDef'
import { generateId } from './util'

export const initialData: RecordDef[] = [
  {
    id: generateId(),
    name: `Item ${generateId(8).toUpperCase()}`,
    count: 39,
    expectedCount: 39,
    delta: 0,
    status: 'Closed'
  },
  {
    id: generateId(),
    name: `Item ${generateId(8).toUpperCase()}`,
    count: 49,
    expectedCount: 60,
    delta: -11,
    status: 'Open'
  },
  {
    id: generateId(),
    name: `Item ${generateId(8).toUpperCase()}`,
    count: 20,
    expectedCount: 19,
    delta: 1,
    status: 'Closed'
  },
  {
    id: generateId(),
    name: `Item ${generateId(8).toUpperCase()}`,
    count: 43,
    expectedCount: 43,
    delta: 0,
    status: 'Closed'
  },
  {
    id: generateId(),
    name: `Item ${generateId(8).toUpperCase()}`,
    expectedCount: 14,
    status: 'Open'
  }
]
