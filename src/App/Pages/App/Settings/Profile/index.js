import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import Button from 'orionsoft-parts/lib/components/Button'
import AutoForm from 'App/components/AutoForm'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import PropTypes from 'prop-types'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'

@withGraphQL(gql`
  query getMyProfile {
    me {
      _id
      profile {
        firstName
        lastName
      }
    }
  }
`)
@withMessage
export default class Profile extends React.Component {
  static propTypes = {
    me: PropTypes.object,
    showMessage: PropTypes.func
  }

  state = {}

  render() {
    return (
      <div className={styles.container}>
        <Section top title="Profile" description="Edit your personal settings">
          <AutoForm
            mutation="setUserProfile"
            ref="form"
            doc={{userId: this.props.me._id, profile: this.props.me.profile}}
            onSuccess={() => this.props.showMessage('Your profile was saved')}
            omit={['userId']}
          />
          <br />
          <Button onClick={() => this.refs.form.submit()} primary>
            Save
          </Button>
        </Section>
      </div>
    )
  }
}
