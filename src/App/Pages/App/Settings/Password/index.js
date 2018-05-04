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
            onSuccess={this.onSuccess}
            schema={this.schema}>
            <Field
              fieldName="oldPassword"
              fieldType="password"
              placeholder="Current Password"
              type={Text}
            />
            <div className={styles.divider} />
            <Field
              fieldName="newPassword"
              fieldType="password"
              placeholder="New Password"
              type={Text}
            />
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
