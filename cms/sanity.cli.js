import { defineCliConfig } from 'sanity/cli'
import { schemaTypes } from './schemaTypes'

export default defineCliConfig({
  api: {
    projectId: 'yr351s4p',
    dataset: 'production',
    schema: {
      types: schemaTypes
    }
  }
})
