import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import Button from 'orionsoft-parts/lib/components/Button'
import {Field} from 'simple-react-form'
import AutoForm from 'App/components/AutoForm'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import PropTypes from 'prop-types'

@withMessage
export default class ChangePassword extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    showMessage: PropTypes.func
  }

  state = {}

  schema = {
    oldPassword: {
      type: String
    },
    newPassword: {
      type: String,
      min: 8
    },
    confirm: {
      type: String,
      custom(confirm, {doc: {newPassword}}) {
        if (confirm !== newPassword) {
          return 'passwordsDontMatch'
        }
      }
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <Section top title="Change Password" description="Change your password">
          <AutoForm
            mutation="changePassword"
            ref="form"
            onSuccess={() => this.props.showMessage('Your password was changed')}
            schema={this.schema}>
            <div className="label">Current password</div>
            <Field
              fieldName="oldPassword"
              fieldType="password"
              placeholder="Current password"
              type={Text}
            />
            <div className={styles.divider} />
            <div className="label">New password</div>
            <Field
              fieldName="newPassword"
              fieldType="password"
              placeholder="New Password"
              type={Text}
            />
            <div className="description">Your password must be at least 8 characters long</div>
            <div className="label">Confirm password</div>
            <Field fieldName="confirm" fieldType="password" placeholder="Confirm" type={Text} />
          </AutoForm>
          <br />
          <Button onClick={() => this.refs.form.submit()} primary>
            Change Password
          </Button>
        </Section>
      </div>
    )
  }
}
