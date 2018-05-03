import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import {withApollo} from 'react-apollo'

@withApollo
export default class WithMutation extends React.Component {
  static propTypes = {
    client: PropTypes.object,
    children: PropTypes.func,
    params: PropTypes.object,
    mutation: PropTypes.string,
    fragment: PropTypes.any
  }

  getArguments() {
    const keys = Object.keys(this.props.params)
    return keys
      .map(key => {
        const field = this.props.params[key]
        return `$${key}: ${field.__graphQLType}`
      })
      .join(', ')
  }

  getParams() {
    const keys = Object.keys(this.props.params)
    return keys
      .map(key => {
        return `${key}: $${key}`
      })
      .join(', ')
  }

  getMutationText() {
    const fragment = this.props.fragment
    const fragmentName = fragment.definitions[0].name.value
    return `
      mutation ${this.props.mutation} (${this.getArguments()}) {
        result: ${this.props.mutation}  (${this.getParams()}) {
          ...${fragmentName}
        }
      }
    `
  }

  getMutation() {
    const text = this.getMutationText()
    const mutation = gql([text, ''], this.props.fragment)
    return async variables => {
      const {data} = await this.props.client.mutate({
        mutation,
        variables
      })
      return data.result
    }
  }

  render() {
    const mutate = this.getMutation()
    return this.props.children(mutate)
  }
}
