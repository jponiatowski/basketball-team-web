import {layoutSchemaTypes} from './layout'
import {dataSchemaTypes} from './data'
import {componentsSchemaTypes} from './components'
import {sectionSchemaTypes} from './sections'
import {pageSchemaTypes} from './pages'

export const schemaTypes = [
  ...pageSchemaTypes,
  ...layoutSchemaTypes,
  ...sectionSchemaTypes,
  ...dataSchemaTypes,
  ...componentsSchemaTypes,
]
