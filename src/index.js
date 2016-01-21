import React, {Component} from 'react'
import {render} from 'react-dom'
import {injectNetworkLayer, DefaultNetworkLayer} from 'react-relay'

import {App} from './app/app'

injectNetworkLayer(new DefaultNetworkLayer('http://192.168.1.69:5000/graphql'))

render(<App/>, document.getElementById('app'))
