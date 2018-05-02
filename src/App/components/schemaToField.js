import ArrayComponent from 'orionsoft-parts/lib/components/fields/ArrayComponent'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import ObjectField from './fields/ObjectField'
import isArray from 'lodash/isArray'

const singleFieldMap = {
  email: Text,
  string: Text,
  array: ArrayComponent,
  plainObject: ObjectField
}

const arrayFieldMap = {}

export default function(type) {
  const fieldMap = isArray(type) ? arrayFieldMap : singleFieldMap
  const typeId = isArray(type) ? type[0] : type
  const fieldType = fieldMap[type]
  if (!fieldType) {
    const text = isArray(type) ? `[${typeId}]` : typeId
    throw new Error('No field component for type: ' + text)
  }
  return fieldType
}
