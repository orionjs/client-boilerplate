import React from 'react'
import Translate from 'App/i18n'
import translate from 'App/i18n/translate'
import {Form, Field} from 'simple-react-form'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import Button from 'orionsoft-parts/lib/components/Button'
import styles from '../styles.css'
import autobind from 'autobind-decorator'
import {resetPassword} from 'meteor-apollo-accounts'
import {withApollo} from 'react-apollo'
import PropTypes from 'prop-types'

@withApollo
export default class Reset extends React.Component {
  state = {}

  static propTypes = {
    setLoading: PropTypes.func,
    setError: PropTypes.func,
    onSuccess: PropTypes.func,
    token: PropTypes.string,
    client: PropTypes.object
  }

  @autobind
  async reset() {
    if (this.state.newPassword !== this.state.confirm) {
      return this.props.setError(<Translate tr="auth.reset.doesntMatch" />)
    }
    this.props.setLoading(true)
    this.props.setError(null)
    try {
      await resetPassword(
        {
          newPassword: this.state.newPassword,
          token: this.props.token
        },
        this.props.client
      )
      this.props.onSuccess()
    } catch (e) {
      this.props.setError(e.message)
      this.props.setLoading(false)
    }
  }

  renderButtons() {
    return (
      <div className={styles.buttonsContainer}>
        <Button disabled={!this.state.newPassword} onClick={this.reset}>
          <Translate tr="auth.reset.setPassword" />
        </Button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <Field
            fieldName="newPassword"
            type={Text}
            fieldType="password"
            placeholder={translate('auth.reset.newPassword')}
          />
          <br />
          <br />
          <Field
            fieldName="confirm"
            type={Text}
            fieldType="password"
            placeholder={translate('auth.reset.confirm')}
          />
        </Form>
        {this.renderButtons()}
      </div>
    )
  }
}
