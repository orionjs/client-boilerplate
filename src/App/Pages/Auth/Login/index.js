import React from 'react'
import AutoForm from 'App/components/AutoForm'
import {Field} from 'simple-react-form'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import Button from 'orionsoft-parts/lib/components/Button'
import autobind from 'autobind-decorator'

export default class Login extends React.Component {
  static propTypes = {}

  @autobind
  onSuccess({publicKey, secretKey}) {
    localStorage.setItem('session.publicKey', publicKey)
    localStorage.setItem('session.secretKey', secretKey)
  }

  render() {
    return (
      <div>
        <AutoForm mutation="loginWithPassword" ref="form" onSuccess={this.onSuccess}>
          <div className="label">Email</div>
          <Field fieldName="email" type={Text} placeholder="Email" />
          <div className="label">Password</div>
          <Field fieldName="password" type={Text} fieldType="password" placeholder="Password" />
        </AutoForm>
        <br />
        <Button onClick={() => this.refs.form.submit()}>Login</Button>
        <br />
        <br />
      </div>
    )
  }
}
