import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'
import {Field} from 'simple-react-form'

export default class AutoFormField extends React.Component {
  static propTypes = {
    field: PropTypes.object,
    fieldName: PropTypes.string,
    schemaToField: PropTypes.func
  }

  renderObjectFields(fields) {
    return Object.keys(fields).map(key => {
      return (
        <AutoFormField
          key={key}
          field={fields[key]}
          fieldName={key}
          schemaToField={this.props.schemaToField}
        />
      )
    })
  }

  renderField(field) {
    const {type} = field
    if (isArray(type) && isPlainObject(type[0])) {
      const Component = this.props.schemaToField('array')
      return (
        <Field fieldName={this.props.fieldName} type={Component}>
          {this.renderObjectFields(type[0])}
        </Field>
      )
    } else if (isPlainObject(type)) {
      const Component = this.props.schemaToField('plainObject')
      return (
        <Field fieldName={this.props.fieldName} type={Component}>
          {this.renderObjectFields(type)}
        </Field>
      )
    } else {
      const Component = this.props.schemaToField(type)
      return <Field fieldName={this.props.fieldName} type={Component} />
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div className="label">{this.props.fieldName}</div>
        {this.renderField(this.props.field, this.props.fieldName)}
      </div>
    )
  }
}
