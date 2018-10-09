import { init } from '@rematch/core'

import { Dashboard } from './models/Dashboard'
import { Doctor } from './models/Doctor'
import { Home } from './models/Home'
import { Login } from './models/Login'
import { MedialRecord } from './models/MedialRecord'
import { Patient } from './models/Patient'
import { Schedule } from './models/Schedule'

export const store = init({
  models: {
    Dashboard, Doctor, Home, Login, MedialRecord, Patient, Schedule
  }
})
