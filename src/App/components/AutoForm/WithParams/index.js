import React from 'react'
import PropTypes from 'prop-types'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'

@withGraphQL(gql`
  query mutationParams($name: ID) {
    mutationParams(name: $name) {
      name
      result
      basicResultQuery
      params
    }
  }
`)
export default class WithSchema extends React.Component {
  static propTypes = {
    children: PropTypes.func,
    mutationParams: PropTypes.object
  }

  render() {
    return this.props.children(this.props.mutationParams)
  }
}
