import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import {Form} from 'simple-react-form'
import Param from './Param'
import autobind from 'autobind-decorator'
import {getValidationErrors} from '@orion-js/schema'

export default class AutoFormForm extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    schema: PropTypes.object,
    schemaToField: PropTypes.func,
    state: PropTypes.object,
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {}
  }

  state = {}

  setRef(form) {
    this.form = form
  }

  @autobind
  submit() {
    this.form.submit()
  }

  onSubmit(data) {
    alert(data)
  }

  @autobind
  async validate(doc) {
    this.setState({validationErrors: null})
    try {
      const validationErrors = await getValidationErrors(this.props.schema, doc)
      this.setState({validationErrors})
    } catch (error) {
      console.error('Error validating', error)
    }
  }

  @autobind
  onChange(doc) {
    this.props.onChange(doc)
    this.setState({doc})
    this.validate(doc)
  }

  renderFields(params) {
    if (!params) return
    if (Object.keys(params).length === 0) return

    return Object.keys(params).map(key => {
      return (
        <Param
          key={key}
          field={params[key]}
          fieldName={key}
          schemaToField={this.props.schemaToField}
        />
      )
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <pre>{JSON.stringify(this.props.schema, null, 2)}</pre>
        <pre>{JSON.stringify(this.state.doc, null, 2)}</pre>
        <Form
          ref={form => this.setRef(form)}
          state={this.props.state}
          errorMessages={this.state.validationErrors}
          onChange={this.onChange}
          onSubmit={this.onSubmit}>
          {this.renderFields(this.props.params)}
        </Form>
      </div>
    )
  }
}
