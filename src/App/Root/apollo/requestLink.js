import {ApolloLink} from 'apollo-link'
import {getLoginToken} from 'meteor-apollo-accounts'
import {Observable} from 'rxjs/Observable'

const request = async operation => {
  const currentUserToken = await getLoginToken()
  operation.setContext({
    headers: {
      authorization: currentUserToken
    }
  })
}

const obs = (operation, forward) => async observer => {
  try {
    await request(operation)
    const handle = forward(operation).subscribe({
      next: observer.next.bind(observer),
      error: observer.error.bind(observer),
      complete: observer.complete.bind(observer)
    })
    return () => {
      if (handle) {
        handle.unsubscribe()
      }
    }
  } catch (error) {
    observer.error(error)
  }
}

const func = (operation, forward) => new Observable(obs(operation, forward))

export default new ApolloLink(func)
