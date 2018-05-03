import gql from 'graphql-tag'
import uniqueId from 'lodash/uniqueId'

export default function({name, result, basicResultQuery, params}) {
  const fragmentName = `${name}_${uniqueId()}`
  const text = `fragment ${fragmentName} on ${result} ${basicResultQuery}`
  return gql([text])
}
