import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as Sentry from '@sentry/react'

Sentry.init({
	dsn: 'https://534366c7cbb145b6a078617778401236@o252569.ingest.sentry.io/5566300',
	environment: process.env.NODE_ENV,
	release: `huely@${process.env.REACT_APP_VERSION}`,
})

ReactDOM.render(<App />, document.getElementById('root'))
