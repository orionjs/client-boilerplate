import React from 'react'
import PropTypes from 'prop-types'
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'

export default class WithSchema extends React.Component {
  static propTypes = {
    children: PropTypes.func,
    params: PropTypes.object
  }

  getSchemaField(field) {
    const {type} = field
    if (isArray(type)) {
      const fields = isPlainObject(type[0]) ? type[0].fields : type[0]
      const arrayItem = this.getSchemaField(fields)
      return [arrayItem]
    } else if (isPlainObject(type)) {
      if (Object.keys(type.fields).length === 0) return

      const fields = {}

      for (const key of Object.keys(type.fields)) {
        fields[key] = this.getSchemaField(type.fields[key])
      }

      return {
        ...field,
        type: fields
      }
    } else {
      return field
    }
  }

  getSchema() {
    const {params} = this.props
    if (!params) return
    if (Object.keys(params).length === 0) return

    const fields = {}

    for (const key of Object.keys(params)) {
      fields[key] = this.getSchemaField(params[key])
    }

    return fields
  }

  render() {
    const schema = this.getSchema()
    return this.props.children(schema)
  }
}
