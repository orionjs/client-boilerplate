import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import WithParams from './WithParams'
import WithSchema from './WithSchema'
import Form from './Form'
import schemaToField from '../schemaToField'
import autobind from 'autobind-decorator'

export default class AutoForm extends React.Component {
  static propTypes = {
    mutation: PropTypes.string,
    state: PropTypes.object,
    onChange: PropTypes.func
  }

  @autobind
  submit() {
    this.refs.form.submit()
  }

  render() {
    return (
      <div className={styles.container}>
        <WithParams name={this.props.mutation}>
          {params => (
            <WithSchema params={params}>
              {schema => (
                <Form
                  ref="form"
                  state={this.state}
                  onChange={this.onChange}
                  schemaToField={schemaToField}
                  params={params}
                  schema={schema}
                />
              )}
            </WithSchema>
          )}
        </WithParams>
      </div>
    )
  }
}
