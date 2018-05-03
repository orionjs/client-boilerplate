import React from 'react'
import AutoForm from 'App/components/AutoForm'
import {Field} from 'simple-react-form'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import Button from 'orionsoft-parts/lib/components/Button'
import ObjectField from 'App/components/fields/ObjectField'
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
        <AutoForm mutation="createUser" ref="form" onSuccess={this.onSuccess}>
          <Field fieldName="profile" type={ObjectField} style={null}>
            <div className="row">
              <div className="col-xs-6">
                <div className="label">First name</div>
                <Field fieldName="firstName" type={Text} placeholder="First name" />
              </div>
              <div className="col-xs-6">
                <div className="label">Last name</div>
                <Field fieldName="lastName" type={Text} placeholder="Last name" />
              </div>
            </div>
          </Field>
          <div className="label">Email</div>
          <Field fieldName="email" type={Text} placeholder="Email" />
          <div className="label">Password</div>
          <Field fieldName="password" type={Text} fieldType="password" placeholder="Password" />
        </AutoForm>
        <br />
        <Button onClick={() => this.refs.form.submit()}>Submit</Button>
        <br />
        <br />
      </div>
    )
  }
}
