import { RecordDef } from './recordDef'
import { generateId } from './util'

export const initialData: RecordDef[] = [
  {
    id: generateId(),
    name: `Item ${generateId(8).toUpperCase()}`,
    count: 39,
    expectedCount: 39,
    countDelta: 0
  },
  {
    id: generateId(),
    name: `Item ${generateId(8).toUpperCase()}`,
    count: 49,
    expectedCount: 60,
    countDelta: -11
  },
  {
    id: generateId(),
    name: `Item ${generateId(8).toUpperCase()}`,
    count: 20,
    expectedCount: 19,
    countDelta: 1
  },
  {
    id: generateId(),
    name: `Item ${generateId(8).toUpperCase()}`,
    count: 43,
    expectedCount: 43,
    countDelta: 0
  },
  {
    id: generateId(),
    name: `Item ${generateId(8).toUpperCase()}`,
    expectedCount: 14
  }
]
