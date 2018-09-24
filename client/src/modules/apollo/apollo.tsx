import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'

import { GRAPH_QL_URL } from '../../config/config'

export const Client = (token?: string): any => {
  const httpLink = new HttpLink({
    uri: `http://${GRAPH_QL_URL}`
  })
  const wsLink = new WebSocketLink({
    uri: `ws://${GRAPH_QL_URL}`,
    options: {
      reconnect: true
    }
  })
  const authLink = setContext((_, { headers } : { headers: any }): any => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ``
      }
    }
  })
  const link = split(
    ({ query }: { query: any }) => {
      const { kind, operation }: { kind: any, operation: any } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    }, wsLink, httpLink
  )
  return new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache()
  })
}
