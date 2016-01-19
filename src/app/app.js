import React, {Component} from 'react'
import Relay, {createContainer, Route} from 'react-relay'
import Item from './item'

export class AppRoute extends Route {
  static routeName = 'HackerNewsRoute';
  static queries = {
    store: (Component) => Relay.QL`
        query root {
            hn {
                ${Component.getFragment('store')}
            }
        }`
  };
}

const AppClass = ({store, relay:{setVariables}}) => {
  var onClick = (storyType) => (event) => setVariables({storyType});
  return (
    <div>
      <nav>
        <a href="#top" onClick={onClick('top')}>TOP </a>
        &nbsp;|&nbsp;
        <a href="#new" onClick={onClick('new')}>NEW </a>
        &nbsp;|&nbsp;
        <a href="#ask" onClick={onClick('ask')}>ASK HN </a>
        &nbsp;|&nbsp;
        <a href="#show" onClick={onClick('show')}>SHOW HN </a>
      </nav>
      {store.stories.map((storie) => (
        <Item store={storie} key={storie.id} />
      ))}
    </div>
  )
}

export const App = createContainer(AppClass, {
  initialVariables: {
    storyType: window.location.hash.slice(1) || 'top'
  },
  fragments: {
    store: () => Relay.QL`
        fragment on HackerNewsAPI{
            stories (limit: 10, storyType: $storyType) {
                id
                ${Item.getFragment('store')}
            }
        }`
  }
})