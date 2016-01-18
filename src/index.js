import React, {Component} from 'react'
import {render} from 'react-dom'
import {RootContainer, injectNetworkLayer, DefaultNetworkLayer} from 'react-relay'

import {App, AppRoute} from './app/app'

injectNetworkLayer(new DefaultNetworkLayer('http://www.GraphQLHub.com/graphql'))

render(<RootContainer Component={App} route={new AppRoute()}/>, document.getElementById('app'))