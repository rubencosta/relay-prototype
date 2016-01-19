import React, {Component} from 'react'
import {render} from 'react-dom'
import {injectNetworkLayer, DefaultNetworkLayer} from 'react-relay'

import {App} from './app/app'

injectNetworkLayer(new DefaultNetworkLayer('http://192.168.1.69:8080/graphql'))

render(<App/>, document.getElementById('app'))
