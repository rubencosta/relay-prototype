import React, {Component} from 'react'
import Relay, {createContainer, Route} from 'react-relay'

const Item = ({store: {title, score, url, by: {id: author}}}) => {
  return (
    <div>
      <h1><a href={url}>{title}</a></h1>
      <span>{score} - {author}</span>
      <hr />
    </div>
  )
}

export default createContainer(Item, {
  fragments: {
    store: () => Relay.QL`
        fragment on HackerNewsItem {
            title,
            score,
            url
            by {
                id
            }
        }
    `
  }
})
