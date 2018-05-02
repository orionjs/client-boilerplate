import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Section from 'App/components/Section'
import Button from 'orionsoft-parts/lib/components/Button'
import {Form, Field} from 'simple-react-form'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import autobind from 'autobind-decorator'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import PropTypes from 'prop-types'
import setGraphQLErrors from 'orionsoft-parts/lib/helpers/setGraphQLErrors'

const fragment = gql`
  fragment userProfileUpdate on User {
    _id
    profile {
      name
      phone
    }
  }
`

@withGraphQL(gql`
  query getMe {
    user: me {
      ...userProfileUpdate
    }
  }
${fragment}`)
@withMutation(gql`
  mutation setUserProfile($userId: ID, $profile: UserProfileInput) {
    setUserProfile(userId: $userId, profile: $profile) {
      ...userProfileUpdate
    }
  }
${fragment}`)
@withMessage
export default class Profile extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    setUserProfile: PropTypes.func,
    showMessage: PropTypes.func
  }

  state = {}

  @autobind
  async save(profile) {
    this.setState({loading: true, errorMessages: null})
    try {
      await this.props.setUserProfile({
        userId: this.props.user._id,
        profile
      })
      this.props.showMessage('Your name was changed correctly')
    } catch (error) {
      setGraphQLErrors(this, error)
    }
    this.setState({loading: false})
  }

  render() {
    return (
      <div className={styles.container}>
        <Section top title="Profile" description="Your profile">
          <Form
            ref="form"
            errorMessages={this.state.errorMessages}
            state={this.props.user.profile}
            onSubmit={this.save}>
            <div className="label">Name</div>
            <Field fieldName="name" placeholder="Name" type={Text} />
            <div className="label">Phone</div>
            <Field fieldName="phone" placeholder="Phone" type={Text} />
          </Form>
          <br />
          <Button loading={this.state.loading} primary onClick={() => this.refs.form.submit()}>
            Save
          </Button>
        </Section>
      </div>
    )
  }
}
