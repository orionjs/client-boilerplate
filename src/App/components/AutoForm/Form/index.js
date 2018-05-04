import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import {Form} from 'simple-react-form'
import autobind from 'autobind-decorator'

export default class AutoFormForm extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    children: PropTypes.node,
    doc: PropTypes.object,
    onChange: PropTypes.func,
    setRef: PropTypes.func,
    mutate: PropTypes.func,
    onSuccess: PropTypes.func,
    schema: PropTypes.object,
    clean: PropTypes.func,
    validate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onSuccess: () => {}
  }

  state = {}

  @autobind
  submit() {
    return this.form.submit()
  }

  handleError(error) {
    if (error.graphQLErrors) {
      for (const graphQLError of error.graphQLErrors) {
        if (graphQLError.validationErrors) {
          console.log('Validation errors', graphQLError.validationErrors)
          this.setState({validationErrors: graphQLError.validationErrors})
        } else {
          console.log(graphQLError)
          alert(error.message)
        }
      }
    } else {
      console.error(error)
      alert(error.message)
    }
  }

  @autobind
  async onSubmit(data) {
    this.setState({loading: true, validationErrors: null})
    try {
      const errors = await this.validate(data)
      if (!errors) {
        const cleaned = await this.props.clean(this.props.params, data)
        const result = await this.props.mutate(cleaned)
        await this.props.onSuccess(result)
      }
    } catch (error) {
      this.handleError(error)
    }
    this.setState({loading: false})
  }

  @autobind
  async validate(doc) {
    this.setState({validationErrors: null})
    try {
      const cleaned = await this.props.clean(this.props.schema, doc)
      const validationErrors = await this.props.validate(this.props.schema, cleaned)
      this.setState({validationErrors})
      if (validationErrors) {
        console.log('validationErrors:', validationErrors)
      }
      return validationErrors
    } catch (error) {
      console.error('Error validating', error)
    }
  }

  @autobind
  onChange(doc) {
    this.props.onChange(doc)
    this.setState({doc})
  }

  render() {
    return (
      <div className={styles.container}>
        <Form
          ref={this.props.setRef}
          state={this.props.doc}
          errorMessages={this.state.validationErrors}
          onChange={this.onChange}
          onSubmit={this.onSubmit}>
          {this.props.children}
        </Form>
      </div>
    )
  }
}
