import {ApolloClient} from 'apollo-client'
import {ApolloLink} from 'apollo-link'
import {onError} from 'apollo-link-error'
import {withClientState} from 'apollo-link-state'
import requestLink from './requestLink'
import cache from './cache'
import {BatchHttpLink} from 'apollo-link-batch-http'
import baseURL from '../url'

export default new ApolloClient({
  link: ApolloLink.from([
    onError(({graphQLErrors, networkError}) => {
      console.error('on error')
      if (graphQLErrors) {
        console.error(graphQLErrors)
      }
      if (networkError) {
        console.error(networkError)
      }
    }),
    requestLink,
    withClientState({
      defaults: {
        isConnected: true
      },
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_, {isConnected}, {cache}) => {
            cache.writeData({data: {isConnected}})
            return null
          }
        }
      },
      cache
    }),
    new BatchHttpLink({
      uri: baseURL + '/graphql'
    })
  ]),
  cache
})
