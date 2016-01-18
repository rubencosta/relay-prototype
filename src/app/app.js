import React, {Component} from 'react'
import Relay, {createContainer, Route} from 'react-relay'

export class AppRoute extends Route {
  static routeName = 'HackerNewsRoute';
  static queries = {
    store: (Component) => Relay.QL`
        query root {
            hn {
                ${Component.getFragment('store')}
            }
        }
    `
  };
}

const AppClass = ({store: {item: {title, score, url, by: {id: author}}}}) => {
  return (
    <div>
      <h1><a href={url}>{title}</a></h1>
      <span><b>points: </b>{score}</span>
      <p><b>by: </b>{author}</p>
    </div>
  )
}

export const App = createContainer(AppClass, {
  fragments: {
    store: () => Relay.QL`
        fragment on HackerNewsAPI {
            item (id: 8863) {
                title,
                score,
                url
                by {
                    id
                }
            }
        }
    `
  }
})