import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import { schemas } from './schema'
import { User } from './model/User'

const adapter = new SQLiteAdapter({
    dbName: 'rentxDb',
    schema:schemas
})

export const database = new Database({
    adapter,
    modelClasses: [User],
})

